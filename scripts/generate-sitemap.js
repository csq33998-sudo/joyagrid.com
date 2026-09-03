const fs = require("fs");
const path = require("path");
const { htmlPages } = require("./page-list");

const root = path.resolve(__dirname, "..");
const urls = [];

for (const relativeFile of htmlPages()) {
  const html = fs.readFileSync(path.join(root, relativeFile), "utf8");
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1].toLowerCase() || "";
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] || "";
  if (!robots.includes("noindex") && canonical.startsWith("https://joyagrid.com")) urls.push(canonical);
}

const uniqueUrls = [...new Set(urls)];
const today = new Date().toISOString().slice(0, 10);
const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map((url) => `  <url><loc>${escapeXml(url)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap.xml with ${uniqueUrls.length} canonical URLs.`);
