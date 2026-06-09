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
  const header = document.querySelector(".site-header");

  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

  function searchUrl(query) {
    const url = new URL(destination);
    url.searchParams.set("q", query || "");
    return url.toString();
  }

  function categoryUrl(category) {
    return searchUrl(categoryQueries[category] || category);
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
    categoryTabs.innerHTML = categories
      .map(
        (category) => `
          <button class="category-tab" type="button" role="tab" aria-selected="${category === state.category}" data-category="${escapeHtml(category)}">
            ${escapeHtml(category)}
          </button>
        `
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
    const visible = getVisibleProducts();
    resultCount.textContent = `${visible.length} ${visible.length === 1 ? "find" : "finds"}`;
    emptyState.hidden = visible.length > 0;

    productGrid.innerHTML = visible
      .map((product) => {
        const category = escapeHtml(product.category);
        const categoryHref = escapeHtml(categoryUrl(product.category));
        const image = escapeHtml(product.image);
        const mood = escapeHtml(product.mood);
        const name = escapeHtml(product.name);
        const price = escapeHtml(product.price);

        return `
          <article class="product-card">
            <a class="product-media" href="${categoryHref}" target="_blank" rel="noopener noreferrer" aria-label="Search ${category} on Maison Looks">
              <img src="${image}" alt="${name}" loading="lazy" width="720" height="900" />
              <span class="badge">${mood}</span>
            </a>
            <div class="product-body">
              <div>
                <h3>${name}</h3>
                <div class="product-meta">
                  <span class="muted">${category}</span>
                  <span class="price">$${price}</span>
                </div>
              </div>
              <div class="tags">
                ${product.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
              <a class="card-link" href="${categoryHref}" target="_blank" rel="noopener noreferrer">Search ${category}</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    renderCategories();
    renderProducts();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    openMaisonSearch();
  });

  searchButton.addEventListener("click", openMaisonSearch);

  function openMaisonSearch() {
    window.open(searchUrl(searchInput.value.trim()), "_blank", "noopener,noreferrer");
  }

  window.addEventListener("scroll", () => {
    header.dataset.elevated = String(window.scrollY > 8);
  });

  renderCategories();
  renderProducts();
})();
