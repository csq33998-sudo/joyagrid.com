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
  "T-Shirts": "t shirts"
};

function searchUrl(query) {
  const url = new URL("https://maisonlooks.com/en/search");
  url.searchParams.set("q", query || "");
  return url.toString();
}

const generatedUrls = products.flatMap((product) => [
  searchUrl(categoryQueries[product.category] || product.category),
  searchUrl(product.name)
]);
const urls = Array.from(new Set([...staticUrls, ...generatedUrls]));

(async () => {
  let failed = false;
  for (const url of urls) {
    try {
      const response = await fetchWithRetry(url);
      const ok = response.status >= 200 && response.status < 400;
      console.log(`${ok ? "OK" : "FAIL"} ${response.status} ${url} final=${response.url}`);
      if (!ok) failed = true;
    } catch (error) {
      failed = true;
      console.log(`ERR ${url} ${error.message}`);
    }
  }
  if (failed) process.exitCode = 1;
})();

async function fetchWithRetry(url) {
  try {
    return await fetch(url, { redirect: "follow" });
  } catch (error) {
    return await fetch(url, { redirect: "follow" });
  }
}
