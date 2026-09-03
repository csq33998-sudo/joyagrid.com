const fs = require("fs");
const path = require("path");
const vm = require("vm");

const productSource = fs.readFileSync("js/products.js", "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(productSource, context);

const products = context.window.JOYA_PRODUCTS || [];
function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

const staticUrls = htmlFiles(process.cwd()).flatMap((file) => {
  const html = fs.readFileSync(file, "utf8");
  return Array.from(html.matchAll(/<a\b[^>]*href="(https:\/\/[^"]+)"/g), (match) => match[1]);
});
const categoryQueries = {
  Accessories: "accessories",
  Bags: "bags",
  Hoodies: "hoodies",
  Outerwear: "jackets",
  Pants: "pants",
  Skirts: "skirts",
  Sneakers: "shoes",
  Tech: "electronics",
  "T-Shirts": "t shirts"
};

function searchUrl(query) {
  const url = new URL("https://streetstyle.maisonlooks.com/en/search");
  url.searchParams.set("q", query || "");
  return url.toString();
}

const generatedUrls = products.flatMap((product) => [
  searchUrl(categoryQueries[product.category] || product.category),
  product.sourceUrl
]);
// QC media URLs are image assets and are validated through the product/QC data
// audit. This network check focuses on navigational page links.
const urls = Array.from(new Set([...staticUrls, ...generatedUrls])).filter(
  (url) => !url.startsWith("https://cdn.maisonlooks.com/")
);

(async () => {
  let failed = false;
  for (const url of urls) {
    try {
      const response = await fetchWithRetry(url);
      const ok = response.status >= 200 && response.status < 400;
      const protectedExternal = isProtectedExternal(url, response.status);
      console.log(`${ok ? "OK" : protectedExternal ? "WARN" : "FAIL"} ${response.status} ${url} final=${response.url}`);
      if (!ok && !protectedExternal) failed = true;
    } catch (error) {
      const protectedExternal = isProtectedExternal(url);
      if (!protectedExternal) failed = true;
      console.log(`${protectedExternal ? "WARN" : "ERR"} ${url} ${error.message}`);
    }
  }
  if (failed) process.exitCode = 1;
})();

function isProtectedExternal(rawUrl, status) {
  const { hostname, pathname } = new URL(rawUrl);
  if ((hostname === "maisonlooks.com" || hostname.endsWith(".maisonlooks.com")) && (!status || status === 403 || status === 429)) return true;
  if (hostname === "www.google.com" && pathname === "/search" && (!status || status === 403 || status === 429)) return true;
  return false;
}

async function fetchWithRetry(url) {
  try {
    return await fetch(url, { redirect: "follow" });
  } catch (error) {
    return await fetch(url, { redirect: "follow" });
  }
}
