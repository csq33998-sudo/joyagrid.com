const fs = require("fs");
const path = require("path");

const files = ["index.html", "guides.html", ...fs.readdirSync("articles").filter((file) => file.endsWith(".html")).map((file) => path.join("articles", file))];
const failures = [];
const warnings = [];

function textBetween(html, regex) {
  const match = html.match(regex);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function contentAttr(html, nameOrProperty) {
  const escaped = nameOrProperty.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return textBetween(html, new RegExp(`<meta\\s+(?:name|property)=["']${escaped}["']\\s+content=["']([^"']+)["']`, "i"));
}

function tokens(value) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 3 && !["with", "from", "guide", "guides", "streetwear"].includes(token))
  );
}

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const title = textBetween(html, /<title>(.*?)<\/title>/i);
  const description = contentAttr(html, "description");
  const h1 = textBetween(html, /<h1[^>]*>(.*?)<\/h1>/i);
  const robots = contentAttr(html, "robots");
  const ogTitle = contentAttr(html, "og:title");
  const ogDescription = contentAttr(html, "og:description");
  const ogType = contentAttr(html, "og:type");
  const canonical = textBetween(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

  if (!title) failures.push(`${file} missing title`);
  if (!description) failures.push(`${file} missing meta description`);
  if (!h1) failures.push(`${file} missing h1`);
  if (!robots) failures.push(`${file} missing robots meta`);
  if (!ogTitle) failures.push(`${file} missing OG title`);
  if (!ogDescription) failures.push(`${file} missing OG description`);
  if (!ogType) failures.push(`${file} missing OG type`);
  if (!canonical) failures.push(`${file} missing canonical URL`);
  if (title.length > 70) warnings.push(`${file} title is long (${title.length})`);
  if (description.length < 80 || description.length > 180) warnings.push(`${file} description length is ${description.length}`);
  if (!/JoyaGoo|Joya Grid/i.test(title + " " + description)) warnings.push(`${file} missing brand in title/description`);
  if (ogTitle && ogTitle !== title) warnings.push(`${file} OG title differs from title`);
  if (ogDescription && ogDescription !== description) warnings.push(`${file} OG description differs from meta description`);

  const titleTokens = tokens(title);
  const h1Tokens = tokens(h1);
  const shared = [...h1Tokens].filter((token) => titleTokens.has(token));
  if (h1Tokens.size && shared.length === 0 && !/JoyaGoo Spreadsheet Guide/i.test(title)) {
    warnings.push(`${file} title and h1 may be misaligned: title="${title}" h1="${h1}"`);
  }

  if (file === "index.html") {
    if (!/JoyaGoo Spreadsheet/i.test(title)) failures.push("index title should target JoyaGoo Spreadsheet");
    if (!/JoyaGoo spreadsheet/i.test(description)) failures.push("index description should target JoyaGoo spreadsheet");
    if (!/JoyaGoo Spreadsheet/i.test(h1)) warnings.push("index h1 should match JoyaGoo Spreadsheet positioning");
    if (ogType !== "website") failures.push("index OG type should be website");
  }

  if (file === "guides.html") {
    if (!/JoyaGoo Spreadsheet Guides/i.test(title)) failures.push("guides index title should target JoyaGoo Spreadsheet Guides");
    if (!/guides/i.test(h1)) warnings.push("guides index h1 should mention guides");
  }

  if (file.startsWith(`articles${path.sep}`)) {
    if (!/JoyaGoo Spreadsheet Guide/i.test(title)) failures.push(`${file} title should include JoyaGoo Spreadsheet Guide`);
    if (!/JoyaGoo spreadsheet guide:/i.test(description)) failures.push(`${file} description should start with JoyaGoo spreadsheet guide`);
    if (ogType !== "article") failures.push(`${file} OG type should be article`);
  }
}

for (const warning of warnings) console.warn(`WARN ${warning}`);
if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK seo consistency pages=${files.length} warnings=${warnings.length}`);
}
