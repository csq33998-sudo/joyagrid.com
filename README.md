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

## Current MVP

- SEO-friendly homepage.
- Searchable streetwear product board.
- Category tabs for outfit discovery.
- Audited outbound links to `maisonlooks.com/en/search`.
- Lightweight local data in `js/products.js`.
- Native language selector powered by `js/i18n.js` with English, German, French, Spanish, Italian, Dutch, and Portuguese content switching.

## Next Stack Upgrade

When the site is ready for real inventory and daily publishing, migrate the data layer to:

- Next.js App Router for static and incremental category/product pages.
- Supabase Postgres for products, categories, click logs, and admin access.
- Cloudflare R2 or Supabase Storage for product images.
- Meilisearch or Typesense once search needs typo tolerance and fast faceting.
