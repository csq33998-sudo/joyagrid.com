const fs = require("fs");
const path = require("path");

const baseUrl = "https://joyagrid.com";
const htmlFiles = ["index.html", "guides.html", ...fs.readdirSync("articles").filter((file) => file.endsWith(".html")).map((file) => path.join("articles", file))];
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
    const route = file === "guides.html" ? "guides" : file.replace(/\\/g, "/");
    const url = file === "index.html" ? `${baseUrl}/` : `${baseUrl}/${route}`;
    check(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml missing ${url}`);
  }
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const title = textBetween(html, /<title>(.*?)<\/title>/i);
  const h1 = textBetween(html, /<h1[^>]*>(.*?)<\/h1>/i);
  const canonical = textBetween(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
  const joyagooCount = (text.match(/joyagoo/g) || []).length;
  const spreadsheetCount = (text.match(/spreadsheet/g) || []).length;
  const schemas = jsonLdBlocks(html);

  check(canonical.startsWith(baseUrl), `${file} canonical should use ${baseUrl}`);
  check(schemas.length > 0, `${file} missing JSON-LD structured data`);
  check(joyagooCount >= 1, `${file} should mention JoyaGoo in visible text`);
  check(spreadsheetCount >= 1, `${file} should mention spreadsheet in visible text`);
  warn(title.length <= 65, `${file} title is long for search result display (${title.length})`);

  if (file === "index.html") {
    check(/JoyaGoo Spreadsheet/i.test(title), "index title should lead with JoyaGoo Spreadsheet");
    check(/JoyaGoo Spreadsheet/i.test(h1), "index h1 should be JoyaGoo Spreadsheet");
    check(JSON.stringify(schemas).includes('"WebSite"'), "index should include WebSite schema");
  } else if (file === "guides.html") {
    check(JSON.stringify(schemas).includes('"CollectionPage"'), "guides index should include CollectionPage schema");
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
