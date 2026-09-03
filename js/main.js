(function () {
  const products = window.JOYA_PRODUCTS || [];
  const destination = "https://streetstyle.maisonlooks.com/en/search";
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
  const state = {
    category: "All"
  };

  const productGrid = document.querySelector("#productGrid");
  const categoryTabs = document.querySelector("#categoryTabs");
  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector("#searchButton");
  const resultCount = document.querySelector("#resultCount");
  const emptyState = document.querySelector("#emptyState");
  const qcRecordGrid = document.querySelector("#qcRecordGrid");
  const qcPage = document.querySelector("[data-qc-page]");
  const header = document.querySelector(".site-header");
  const qcPathMatch = window.location.pathname.match(/^\/qc\/([^/?#]+)\/?$/);
  const requestedProductId = new URLSearchParams(window.location.search).get("product")
    || (qcPathMatch ? decodeURIComponent(qcPathMatch[1]) : null);

  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

  function searchUrl(query) {
    const url = new URL(destination);
    url.searchParams.set("q", query || "");
    return url.toString();
  }

  function categoryUrl(category) {
    return searchUrl(categoryQueries[category] || category);
  }

  function productUrl(product) {
    return product.sourceUrl || searchUrl(product.name);
  }

  function qcUrl(product) {
    return `/qc/${encodeURIComponent(product.id)}`;
  }

  function qcImages(product) {
    return Array.isArray(product.qcImages) ? product.qcImages.filter(Boolean) : [];
  }

  function formatStock(stock) {
    if (!stock || stock === "Not listed on the source page when checked.") return "Availability not listed";
    return stock
      .replace(/; source said checked about \d+ days? earlier$/i, "")
      .replace(/; source said checked on the inspection day$/i, "")
      .replace(/^([\d,]+) shown across all sizes$/i, "$1 listed across all sizes")
      .replace(/^([\d,]+) shown in stock$/i, "$1 listed in stock");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function renderCategories() {
    if (!categoryTabs) return;
    categoryTabs.innerHTML = categories
      .map(
        (category) => {
          const href = category === "All" ? "https://streetstyle.maisonlooks.com/" : categoryUrl(category);
          return `
          <a class="category-tab" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" data-category="${escapeHtml(category)}">
            ${escapeHtml(category)}
          </a>
        `;
        }
      )
      .join("");
  }

  function getVisibleProducts() {
    const filtered = products.filter((product) => {
      const inCategory = state.category === "All" || product.category === state.category;
      return inCategory;
    });

    return filtered;
  }

  function renderProducts() {
    if (!productGrid || !resultCount || !emptyState) return;
    const visible = getVisibleProducts();
    resultCount.textContent = `${visible.length} ${visible.length === 1 ? "product" : "products"}`;
    emptyState.hidden = visible.length > 0;

    productGrid.innerHTML = visible
      .map((product) => {
        const category = escapeHtml(product.category);
        const productHref = escapeHtml(productUrl(product));
        const qcHref = escapeHtml(qcUrl(product));
        const image = escapeHtml(product.image);
        const badge = escapeHtml(product.sourcePageVerified ? "Link checked" : "Check source");
        const name = escapeHtml(product.name);
        const price = escapeHtml(product.priceCny ? `¥${product.priceCny}` : "Price not captured");
        const alt = escapeHtml(`${product.name} product photo from ${product.sourceName}`);
        const qcAction = qcImages(product).length ? "View QC photos" : "QC availability";
        const stockSummary = formatStock(product.stock) === "Availability not listed"
          ? ""
          : ` · ${escapeHtml(formatStock(product.stock))}`;

        return `
          <article class="product-card">
            <a class="product-media" href="${qcHref}" aria-label="View QC photos for ${name}">
              <img src="${image}" alt="${alt}" loading="lazy" width="720" height="900" />
              <span class="badge">${badge}</span>
            </a>
            <div class="product-body">
              <div>
                <h3><a href="${productHref}" target="_blank" rel="noopener noreferrer">${name}</a></h3>
                <div class="product-meta">
                  <span class="muted">${category}</span>
                  <span class="price">${price}</span>
                </div>
              </div>
              <div class="tags">
                ${product.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
              <small class="muted">QC: ${escapeHtml(product.qcLabel)} · source checked ${escapeHtml(product.checkedAt)}${stockSummary}</small>
              <div class="card-actions">
                <a href="${qcHref}" data-link-kind="qc">${qcAction}</a>
                <a href="${productHref}" target="_blank" rel="noopener noreferrer" data-link-kind="source">Open source</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderQcRecords() {
    if (!qcRecordGrid) return;

    const requestedProduct = requestedProductId
      ? products.find((product) => product.id === requestedProductId)
      : null;
    const visibleRecords = requestedProductId ? (requestedProduct ? [requestedProduct] : []) : products;

    if (qcPage) {
      const title = document.querySelector("#qcPageTitle");
      const summary = document.querySelector("#qcPageSummary");
      if (requestedProduct) {
        // Clean product QC routes ship with complete, product-specific metadata.
        // Keep that server-visible title instead of replacing it after render.
        if (!qcPathMatch) document.title = `${requestedProduct.name} QC Photos | JoyaGrid`;
        if (title) title.textContent = requestedProduct.name;
        if (summary) summary.textContent = `Buyer QC previews, size options, availability, and the matching MaisonLooks page for ${requestedProduct.name}.`;
        const skipLink = document.querySelector("#qcSkipLink");
        if (skipLink) skipLink.href = `${qcUrl(requestedProduct)}?section=qc-records`;
      } else if (requestedProductId) {
        document.title = "QC Gallery Not Found | JoyaGrid";
        if (title) title.textContent = "QC gallery not found";
        if (summary) summary.textContent = "This product is unavailable. Return to the product list to choose another item.";
      } else {
        document.title = "Product QC Galleries | JoyaGrid";
        if (title) title.textContent = "Product QC galleries";
        if (summary) summary.textContent = "Choose a product to view its buyer QC previews and matching MaisonLooks page.";
      }
    }

    qcRecordGrid.innerHTML = visibleRecords
      .map((product) => {
        const id = escapeHtml(`qc-${product.id}`);
        const name = escapeHtml(product.name);
        const sourceUrl = escapeHtml(product.sourceUrl);
        const sourceName = escapeHtml(product.sourceName);
        const sizes = escapeHtml(product.sizes.join(" · "));
        const stock = escapeHtml(formatStock(product.stock));
        const checkedAt = escapeHtml(product.checkedAt);
        const status = escapeHtml(product.qcLabel);
        const allQcImages = qcImages(product);
        const hasQc = product.qcStatus === "available" && allQcImages.length > 0;
        const isDedicated = Boolean(qcPage && requestedProductId === product.id);
        const visibleQcImages = isDedicated ? allQcImages : allQcImages.slice(0, 1);
        const buyerPhotos = product.buyerPhotoCount === null
          ? "Count not listed"
          : `${product.buyerPhotoCount} photos and videos on MaisonLooks`;
        const previewSummary = hasQc
          ? `${allQcImages.length} QC ${allQcImages.length === 1 ? "preview" : "previews"} shown here`
          : "No buyer QC previews available yet";
        const galleryMarkup = hasQc
          ? `
              <section class="qc-gallery-section" aria-label="${name} buyer QC previews">
                <div class="qc-gallery-heading">
                  <div><p class="eyebrow">Buyer QC photos</p><h4>${escapeHtml(previewSummary)}</h4></div>
                  ${isDedicated ? `<span>${escapeHtml(String(product.buyerPhotoCount))} media items on MaisonLooks</span>` : `<a class="text-link" href="${escapeHtml(qcUrl(product))}">View QC photos</a>`}
                </div>
                <div class="qc-gallery${isDedicated ? "" : " qc-gallery-compact"}">
                  ${visibleQcImages.map((imageUrl, index) => {
                    const image = escapeHtml(imageUrl);
                    const href = isDedicated ? image : escapeHtml(qcUrl(product));
                    const target = isDedicated ? ' target="_blank" rel="noopener noreferrer"' : "";
                    return `
                      <a class="qc-gallery-item" href="${href}"${target} data-qc-image>
                        <img src="${image}" alt="${name} buyer QC preview ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" width="640" height="640" />
                        <span>QC ${index + 1}</span>
                      </a>
                    `;
                  }).join("")}
                </div>
              </section>
            `
          : `
              <div class="qc-empty-media" role="status">
                <strong>No QC photos available yet</strong>
                <p>MaisonLooks did not show buyer photos or videos for this product when we checked. Open the product page below to look for updates.</p>
              </div>
            `;
        const primaryAction = hasQc ? "View complete QC gallery on MaisonLooks" : "Check MaisonLooks for QC updates";
        const secondaryAction = isDedicated
          ? '<a class="text-link" href="/joyagoo-spreadsheet?section=top-finds">Back to product cards</a>'
          : `<a class="text-link" href="${escapeHtml(qcUrl(product))}">Open QC gallery</a>`;

        return `
          <article class="qc-record" id="${id}"${requestedProductId ? ' data-active="true"' : ""} tabindex="-1">
            <div class="qc-record-body">
              <div class="qc-record-heading">
                <div><p class="eyebrow">QC photo gallery</p><h3>${name}</h3></div>
                <span class="qc-status qc-status-${escapeHtml(product.qcStatus)}">${status}</span>
              </div>
              <p class="qc-disclosure"><strong>About these photos:</strong> ${hasQc ? "these buyer QC previews come from the matching MaisonLooks product page. Open MaisonLooks for the complete current photo and video set." : "MaisonLooks did not show buyer QC media for this product when we checked. The product photo is not used as a substitute."}</p>
              ${galleryMarkup}
              <dl class="qc-facts">
                <div><dt>Source</dt><dd><a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a></dd></div>
                <div><dt>Source checked</dt><dd><time datetime="${checkedAt}">${checkedAt}</time></dd></div>
                <div><dt>QC status</dt><dd>${status}</dd></div>
                <div><dt>Buyer photos</dt><dd>${escapeHtml(buyerPhotos)}</dd></div>
                <div><dt>Shown here</dt><dd>${escapeHtml(previewSummary)}</dd></div>
                <div><dt>Sizes / variant</dt><dd>${sizes}</dd></div>
                <div><dt>Stock</dt><dd>${stock}</dd></div>
              </dl>
              <div class="qc-record-actions">
                <a class="button primary" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${primaryAction}</a>
                ${secondaryAction}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    if (requestedProductId && !requestedProduct) {
      qcRecordGrid.innerHTML = '<div class="empty-state"><p>No matching QC gallery was found.</p><a class="button primary" href="/joyagoo-spreadsheet?section=top-finds">Browse products</a></div>';
    }
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      openMaisonSearch();
    });
  }

  if (searchButton) searchButton.addEventListener("click", openMaisonSearch);

  function openMaisonSearch() {
    window.open(searchUrl(searchInput ? searchInput.value.trim() : ""), "_blank", "noopener,noreferrer");
  }

  if (header) {
    window.addEventListener("scroll", () => {
      header.dataset.elevated = String(window.scrollY > 8);
    });
  }

  renderCategories();
  renderProducts();
  renderQcRecords();
})();
