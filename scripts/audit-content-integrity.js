const fs = require("fs");
const vm = require("vm");
const { articlePages, htmlPages } = require("./page-list");

// This inventory is intentionally frozen. A new article must not be added merely
// to cover another query. Replace this list only after the page has attributable
// sources, original evidence, and a distinct user need.
const frozenArticles = [
  "agent-shopping-workflow.html",
  "bags-accessories-guide.html",
  "best-items-on-joyagoo-spreadsheet.html",
  "category-search-guide.html",
  "common-finds-mistakes.html",
  "curated-finds-board.html",
  "fabric-texture-photo-guide.html",
  "frequently-asked-questions.html",
  "haul-planning-guide.html",
  "how-to-use-joyagoo-spreadsheet.html",
  "joyagoo-spreadsheet-reddit.html",
  "joyagoo-spreadsheet-vs-pandabuy.html",
  "measurement-sizing-guide.html",
  "outerwear-jacket-search-guide.html",
  "pants-silhouette-guide.html",
  "qc-photo-checklist.html",
  "seasonal-capsule-guide.html",
  "shipping-cost-guide.html",
  "sneaker-search-guide.html",
  "streetwear-color-palette-guide.html"
].sort();

const pausedIndexes = [
  "articles.html",
  "blog.html",
  "guides.html",
  "joyagoo-buying-guide.html",
  "joyagoo-spreadsheet-news.html"
];
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const robots = (html) =>
  html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1].toLowerCase() || "";

const actualArticles = articlePages().map((file) => file.replace(/^articles[\\/]/, "")).sort();
check(
  JSON.stringify(actualArticles) === JSON.stringify(frozenArticles),
  `article inventory changed; expected frozen set of ${frozenArticles.length}, found ${actualArticles.length}`
);

for (const file of [...articlePages(), ...pausedIndexes]) {
  const html = fs.readFileSync(file, "utf8");
  check(robots(html).includes("noindex"), `${file} must remain noindex until it has independent evidence`);
  check(html.includes("data-evidence-archive"), `${file} must display the evidence archive notice`);
  check(html.includes("<strong>Guide note:</strong>"), `${file} must show the visitor-facing guide note`);
  check(!html.includes("Archived editorial draft:"), `${file} must not expose internal archive wording`);
}

const sitemap = fs.readFileSync("sitemap.xml", "utf8");
for (const file of [...articlePages(), ...pausedIndexes]) {
  const route = file.replace(/\\/g, "/").replace(/\.html$/, "");
  check(!sitemap.includes(`https://joyagrid.com/${route}`), `sitemap must not include paused page ${route}`);
}

const publicCore = ["index.html", "finds.html", "categories.html", "joyagoo-spreadsheet.html"];
const internalCopyLeaks = [
  "Archived editorial draft:",
  "excluded from search indexing",
  "Evidence boundary:",
  "Illustrative research tools",
  "Source-checked research tools",
  "Not displayed on the inspected source page"
];
for (const file of htmlPages()) {
  const html = fs.readFileSync(file, "utf8");
  for (const phrase of internalCopyLeaks) {
    check(!html.includes(phrase), `${file} exposes internal or outdated copy: ${phrase}`);
  }
}
const dynamicCopy = fs.readFileSync("js/main.js", "utf8");
for (const phrase of internalCopyLeaks) {
  check(!dynamicCopy.includes(phrase), `js/main.js exposes internal or outdated copy: ${phrase}`);
}
const unsupportedClaims = [
  /10,?000\+?/i,
  /community[- ]verified/i,
  /updated daily/i,
  /top 50/i,
  /most popular finds/i,
  /most saved/i,
  /qc ready/i,
  /direct buy links/i
];
for (const file of publicCore) {
  const html = fs.readFileSync(file, "utf8");
  for (const pattern of unsupportedClaims) {
    check(!pattern.test(html), `${file} contains unsupported public claim ${pattern}`);
  }
}

const spreadsheet = fs.readFileSync("joyagoo-spreadsheet.html", "utf8");
for (const disclosure of [
  "product cards show MaisonLooks product photos",
  "QC buttons open buyer photos and videos",
  "does not test or sell the products"
]) {
  check(spreadsheet.includes(disclosure), `joyagoo-spreadsheet.html missing scope disclosure: ${disclosure}`);
}

const productContext = { window: {} };
vm.createContext(productContext);
vm.runInContext(fs.readFileSync("js/products.js", "utf8"), productContext);
vm.runInContext(fs.readFileSync("js/qc-data.js", "utf8"), productContext);
const products = productContext.window.JOYA_PRODUCTS || [];
check(products.length === 20, `expected exactly 20 source-checked product records, found ${products.length}`);
const productIds = new Set();
let productsWithQc = 0;
let productsWithoutQc = 0;
for (const product of products) {
  check(!productIds.has(product.id), `${product.id} is duplicated`);
  productIds.add(product.id);
  check(product.evidenceStatus === "source-checked", `${product.id} must be labeled source-checked`);
  check(/^https:\/\/(?:streetstyle\.|official\.)?maisonlooks\.com\//.test(product.sourceUrl), `${product.id} needs an exact MaisonLooks source URL`);
  check(/^https:\/\/cdn\.maisonlooks\.com\//.test(product.imageSourceUrl), `${product.id} needs MaisonLooks image provenance`);
  check(/^\d{4}-\d{2}-\d{2}$/.test(product.checkedAt), `${product.id} needs an ISO check date`);
  check(["available", "empty", "not-published"].includes(product.qcStatus), `${product.id} needs an explicit QC evidence state`);
  check(product.buyerPhotoCount === null || Number.isInteger(product.buyerPhotoCount), `${product.id} buyer photo count must be an integer or null`);
  check(Array.isArray(product.qcImages), `${product.id} needs a QC image array`);
  if (product.qcStatus === "available") {
    productsWithQc += 1;
    check(product.buyerPhotoCount > 0, `${product.id} available QC needs a positive source count`);
    check(product.qcImages.length > 0, `${product.id} available QC needs at least one captured preview`);
    for (const image of product.qcImages) {
      check(/^https:\/\/cdn\.maisonlooks\.com\//.test(image), `${product.id} has an invalid QC preview URL`);
    }
  } else if (product.qcStatus === "empty") {
    productsWithoutQc += 1;
    check(product.buyerPhotoCount === 0, `${product.id} empty QC needs a zero source count`);
    check(product.qcImages.length === 0, `${product.id} empty QC must not substitute listing images`);
  }
  check(product.sourcePageVerified === true, `${product.id} source page must be verified`);
  check(Number.isFinite(product.priceCny) && product.priceCny > 0, `${product.id} needs a dated CNY price snapshot`);
  check(Array.isArray(product.sizes) && product.sizes.length > 0, `${product.id} needs size or variant information`);
  check(typeof product.stock === "string" && product.stock.length > 0, `${product.id} needs a stock note`);
  check(/^\/assets\/qc\//.test(product.image), `${product.id} must use a locally preserved QC-source image`);
  check(fs.existsSync(product.image.replace(/^\//, "")), `${product.id} local image is missing: ${product.image}`);
}
check(productsWithQc === 19, `expected 19 products with buyer QC, found ${productsWithQc}`);
check(productsWithoutQc === 1, `expected one product without buyer QC, found ${productsWithoutQc}`);
check(spreadsheet.includes(`<div><dt>Products</dt><dd>${products.length}</dd></div>`), "spreadsheet page product count must match products.js");
check(spreadsheet.includes('id="qcRecordGrid"'), "spreadsheet page must render product-level QC records");
check(spreadsheet.includes('id="productGrid"'), "spreadsheet page must render product cards");

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK content integrity frozenArticles=${frozenArticles.length} pausedIndexes=${pausedIndexes.length} sourceCheckedProducts=${products.length} productsWithQc=${productsWithQc}`);
}
