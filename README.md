# Joya Grid

Static MVP for a street-style discovery site that promotes Maison Looks Streetstyle.

## Run locally

Use the bundled Node runtime available in this Codex environment:

```powershell
& "C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" serve.js
```

Then open:

```text
http://localhost:4173
```

## Verify

```powershell
$base="C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules"
$env:NODE_PATH="$base;$base\.pnpm\playwright-core@1.60.0\node_modules;$base\.pnpm\playwright@1.60.0\node_modules"
& "C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\verify.js
```

The verifier uses Playwright when the browser binary is installed. In the current environment it falls back to HTTP and content checks.

Audit clickable external links across all HTML pages:

```powershell
& "C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\audit-links.js
```

Audit Google search readiness signals:

```powershell
& "C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\audit-google-seo.js
```

Audit the evidence boundary and the freeze on new query-targeted articles:

```powershell
& "C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\audit-content-integrity.js
```

## Current MVP

- SEO-friendly homepage.
- Searchable interface demo with clearly labeled illustrative style cards.
- Category tabs for outfit discovery.
- Audited outbound links to `streetstyle.maisonlooks.com/en/search`.
- Twenty dated MaisonLooks product records in `js/products.js`, with matching buyer-QC preview metadata in `js/qc-data.js` and direct links back to the current source galleries.
- Native language selector powered by `js/i18n.js` with English, German, French, Spanish, Italian, Dutch, and Portuguese content switching.

## Next Stack Upgrade

Do not resume product or article publishing until each record has a source URL, capture date, exact variant, price provenance, original or licensed evidence images, a stated verification method, and an accountable author. If that evidence-backed scope later requires a larger data layer, consider:

- Next.js App Router for static and incremental category/product pages.
- Supabase Postgres for products, categories, click logs, and admin access.
- Cloudflare R2 or Supabase Storage for product images.
- Meilisearch or Typesense once search needs typo tolerance and fast faceting.
