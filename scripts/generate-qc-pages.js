const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "qc");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "js", "products.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(root, "js", "qc-data.js"), "utf8"), context);
const products = context.window.JOYA_PRODUCTS || [];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[character]);

const titleText = (name) => {
  const suffix = " QC Photos | JoyaGrid";
  const cleanName = name
    .replace(/[&]/g, "and")
    .replace(/[\u2018\u2019\u201c\u201d'\"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const limit = 65 - suffix.length;
  if (cleanName.length <= limit) return `${cleanName}${suffix}`;
  const shortened = cleanName
    .slice(0, limit + 1)
    .replace(/\s+\S*$/, "")
    .replace(/\s+(?:and|with|the|of)$/i, "")
    .trim();
  return `${shortened}${suffix}`;
};

const stockText = (stock) => {
  if (!stock || stock === "Not listed on the source page when checked.") return "Availability not listed";
  return stock
    .replace(/; source said checked about \d+ days? earlier$/i, "")
    .replace(/; source said checked on the inspection day$/i, "")
    .replace(/^([\d,]+) shown across all sizes$/i, "$1 listed across all sizes")
    .replace(/^([\d,]+) shown in stock$/i, "$1 listed in stock");
};

function galleryMarkup(product) {
  if (!product.qcImages.length) {
    return `<div class="qc-empty-media" role="status">
              <strong>No QC photos available yet</strong>
              <p>MaisonLooks did not show buyer photos or videos for this product when checked. Open the source page below to look for updates.</p>
            </div>`;
  }

  return `<section class="qc-gallery-section" aria-label="${escapeHtml(product.name)} buyer QC previews">
            <div class="qc-gallery-heading">
              <div><p class="eyebrow">Buyer QC photos</p><h2>${product.qcImages.length} QC ${product.qcImages.length === 1 ? "preview" : "previews"} shown here</h2></div>
              <span>${escapeHtml(product.qcLabel)}</span>
            </div>
            <div class="qc-gallery">
              ${product.qcImages.map((image, index) => `<a class="qc-gallery-item" href="${escapeHtml(image)}" target="_blank" rel="noopener noreferrer" data-qc-image>
                <img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)} buyer QC preview ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" width="640" height="640" />
                <span>QC ${index + 1}</span>
              </a>`).join("\n              ")}
            </div>
          </section>`;
}

function structuredData(product, canonical, description) {
  const media = product.qcImages.slice(0, 10).map((contentUrl, index) => ({
    "@type": "ImageObject",
    contentUrl,
    caption: `${product.name} buyer QC preview ${index + 1}`
  }));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${canonical}?schema=gallery`,
        url: canonical,
        name: `${product.name} QC Photos`,
        description,
        image: media,
        isPartOf: { "@id": "https://joyagrid.com/qc?schema=collection" },
        inLanguage: "en"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}?schema=breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://joyagrid.com/" },
          { "@type": "ListItem", position: 2, name: "QC Galleries", item: "https://joyagrid.com/qc" },
          { "@type": "ListItem", position: 3, name: product.name, item: canonical }
        ]
      }
    ]
  }, null, 2).replace(/</g, "\\u003c");
}

function renderPage(product) {
  const canonical = `https://joyagrid.com/qc/${encodeURIComponent(product.id)}`;
  const count = product.buyerPhotoCount === null ? "QC availability" : `${product.buyerPhotoCount} buyer photos and videos`;
  const description = `View ${count} for ${product.name}, including size and availability notes with the matching MaisonLooks source.`;
  const title = titleText(product.name);
  const status = product.qcImages.length ? product.qcLabel : "No buyer QC photos published";
  const previewSummary = product.qcImages.length
    ? `${product.qcImages.length} saved QC previews; ${product.buyerPhotoCount} media items were listed on MaisonLooks when checked.`
    : "No buyer QC previews were available when this source was checked.";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://joyagrid.com${escapeHtml(product.image)}" />
    <meta property="og:image:alt" content="${escapeHtml(product.name)} product reference photo" />
    <link rel="stylesheet" href="/styles.css?v=7" />
    <script type="application/ld+json">
${structuredData(product, canonical, description)}
    </script>
  </head>
  <body class="qc-page">
    <a class="skip-link" id="qcSkipLink" href="/qc/${encodeURIComponent(product.id)}?section=qc-records">Skip to QC photos</a>
    <header class="site-header" data-elevated="false">
      <a class="brand" href="/" aria-label="joyagoo spreadsheet home"><span class="brand-lockup"><img class="brand-wordmark" src="/assets/joyagoo-wordmark.png" alt="joyagoo spreadsheet" width="294" height="70" /><small class="brand-tagline">Product finds and QC photos</small></span></a>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a><a href="/joyagoo-spreadsheet">Spreadsheet</a><a href="/joyagoo-spreadsheet-news">Updates</a><a href="/joyagoo-buying-guide">Buying Guide</a><a href="/finds">Finds</a><a href="/categories">Categories</a><a href="/guides">Guides</a><a href="/blog">Blog</a><a href="/agent-shopping-cost-calculator">Calculator</a>
      </nav>
      <a class="header-cta" href="https://streetstyle.maisonlooks.com/" target="_blank" rel="noopener noreferrer">Visit Streetstyle</a>
    </header>
    <main class="qc-page-main" data-qc-page>
      <section class="section qc-page-section" id="qc-records">
        <div class="section-heading">
          <p class="eyebrow">QC photo gallery</p>
          <h1 id="qcPageTitle">${escapeHtml(product.name)}</h1>
          <p id="qcPageSummary">Buyer QC previews, size options, availability, and the matching MaisonLooks page for ${escapeHtml(product.name)}.</p>
        </div>
        <aside class="article-cta"><strong>About these photos:</strong> previews come from the matching MaisonLooks buyer QC gallery. Open MaisonLooks for the complete, current photo and video set.</aside>
        <div id="qcRecordGrid" class="qc-record-grid" aria-live="polite">
          <article class="qc-record" id="qc-${escapeHtml(product.id)}" data-active="true">
            <div class="qc-record-body">
              <div class="qc-record-heading"><div><p class="eyebrow">QC photo gallery</p><h2>${escapeHtml(product.name)}</h2></div><span class="qc-status qc-status-${escapeHtml(product.qcStatus)}">${escapeHtml(status)}</span></div>
              <p class="qc-disclosure"><strong>QC status:</strong> ${escapeHtml(previewSummary)}</p>
              ${galleryMarkup(product)}
              <dl class="qc-facts">
                <div><dt>Source</dt><dd><a href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.sourceName)}</a></dd></div>
                <div><dt>Source checked</dt><dd><time datetime="${escapeHtml(product.checkedAt)}">${escapeHtml(product.checkedAt)}</time></dd></div>
                <div><dt>QC status</dt><dd>${escapeHtml(status)}</dd></div>
                <div><dt>Sizes / variant</dt><dd>${escapeHtml(product.sizes.join(" · "))}</dd></div>
                <div><dt>Stock</dt><dd>${escapeHtml(stockText(product.stock))}</dd></div>
              </dl>
              <div class="qc-record-actions"><a class="button primary" href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">Check the current MaisonLooks gallery</a><a class="text-link" href="/qc">All QC galleries</a></div>
            </div>
          </article>
        </div>
      </section>
    </main>
    <footer class="site-footer"><p>JoyaGrid is independent. Confirm the current product, option, availability, and QC gallery before buying.</p><a href="/joyagoo-spreadsheet?section=top-finds">Back to products</a></footer>
    <script src="/js/products.js?v=4"></script>
    <script src="/js/qc-data.js?v=1"></script>
    <script src="/js/main.js?v=5"></script>
    <script src="/js/i18n.js?v=2"></script>
  </body>
</html>
`;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const product of products) {
  fs.writeFileSync(path.join(outputDir, `${product.id}.html`), renderPage(product), "utf8");
}

const qcIndexPath = path.join(root, "qc.html");
const qcIndex = fs.readFileSync(qcIndexPath, "utf8");
const links = `<nav class="category-tabs" aria-label="Product QC gallery links">
          ${products.map((product) => `<a href="/qc/${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a>`).join("\n          ")}
        </nav>`;
const updatedIndex = qcIndex.replace(
  /<!-- QC_LINKS_START -->[\s\S]*?<!-- QC_LINKS_END -->/,
  `<!-- QC_LINKS_START -->\n        ${links}\n        <!-- QC_LINKS_END -->`
);
fs.writeFileSync(qcIndexPath, updatedIndex, "utf8");

console.log(`Generated ${products.length} product QC pages.`);
