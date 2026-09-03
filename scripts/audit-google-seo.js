const fs = require("fs");
const path = require("path");
const { htmlPages } = require("./page-list");

const baseUrl = "https://joyagrid.com";
const htmlFiles = htmlPages();
const failures = [];
const warnings = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

function textBetween(html, regex) {
  const match = html.match(regex);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function jsonLdBlocks(html) {
  return Array.from(html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi), (match) => JSON.parse(match[1]));
}

check(fs.existsSync("robots.txt"), "robots.txt is missing");
check(fs.existsSync("sitemap.xml"), "sitemap.xml is missing");

if (fs.existsSync("robots.txt")) {
  const robots = fs.readFileSync("robots.txt", "utf8");
  check(/Sitemap:\s*https:\/\/joyagrid\.com\/sitemap\.xml/i.test(robots), "robots.txt should reference the canonical sitemap URL");
}

if (fs.existsSync("sitemap.xml")) {
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const robots = textBetween(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i).toLowerCase();
    const route = file.replace(/\\/g, "/").replace(/\.html$/, "");
    const url = file === "index.html" ? `${baseUrl}/` : `${baseUrl}/${route}`;
    if (robots.includes("noindex")) {
      check(!sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml should exclude noindex URL ${url}`);
    } else {
      check(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml missing indexable URL ${url}`);
    }
  }
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const title = textBetween(html, /<title>(.*?)<\/title>/i);
  const h1 = textBetween(html, /<h1[^>]*>(.*?)<\/h1>/i);
  const canonical = textBetween(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const schemas = jsonLdBlocks(html);

  check(canonical.startsWith(baseUrl), `${file} canonical should use ${baseUrl}`);
  check(schemas.length > 0, `${file} missing JSON-LD structured data`);
  warn(title.length <= 65, `${file} title is long for search result display (${title.length})`);

  if (file === "index.html") {
    check(JSON.stringify(schemas).includes('"WebSite"'), "index should include WebSite schema");
  } else if (["finds.html", "categories.html", "guides.html", "joyagoo-spreadsheet-news.html", "qc.html"].includes(file)) {
    check(JSON.stringify(schemas).includes('"CollectionPage"'), `${file} should include CollectionPage schema`);
  } else if (file === "blog.html") {
    check(JSON.stringify(schemas).includes('"Blog"'), "blog.html should include Blog schema");
  } else if (file === "about.html") {
    check(JSON.stringify(schemas).includes('"AboutPage"'), "about.html should include AboutPage schema");
  } else if (file === "agent-shopping-cost-calculator.html") {
    check(JSON.stringify(schemas).includes('"WebApplication"'), "agent-shopping-cost-calculator.html should include WebApplication schema");
    check(JSON.stringify(schemas).includes('"BreadcrumbList"'), "agent-shopping-cost-calculator.html should include BreadcrumbList schema");
  } else if (file.startsWith(`qc${path.sep}`)) {
    check(JSON.stringify(schemas).includes('"ImageGallery"'), `${file} should include ImageGallery schema`);
    check(JSON.stringify(schemas).includes('"BreadcrumbList"'), `${file} should include BreadcrumbList schema`);
  } else {
    check(JSON.stringify(schemas).includes('"Article"'), `${file} should include Article schema`);
    check(JSON.stringify(schemas).includes('"BreadcrumbList"'), `${file} should include BreadcrumbList schema`);
  }
}

for (const warning of warnings) console.warn(`WARN ${warning}`);
if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK google seo pages=${htmlFiles.length} warnings=${warnings.length}`);
}
