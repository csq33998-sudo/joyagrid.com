const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { articlePages, routePages } = require("./page-list");

const source = fs.readFileSync("js/i18n.js", "utf8");
const sandbox = {
  console,
  localStorage: { getItem: () => "en", setItem: () => {} },
  document: { addEventListener: () => {}, querySelector: () => null, querySelectorAll: () => [] },
  location: { pathname: "/" },
  MutationObserver: class {
    observe() {}
  },
  setTimeout
};

vm.createContext(sandbox);
const auditSource = source.replace(/\}\)\(\);\s*$/, "globalThis.__audit = { supported, articles, copy, navLabels };\n})();");
vm.runInContext(
  auditSource,
  sandbox
);

const { supported, articles, copy, navLabels } = sandbox.__audit;
const languages = Object.keys(supported);
const articleFiles = articlePages();
const articleSlugs = articleFiles.map((file) => path.basename(file, ".html"));
const articleBySlug = new Map(articles.map((article) => [article.slug, article]));
const failures = [];
const mojibakePattern = /\uFFFD/;
const expectedNavPaths = [
  "/",
  "/joyagoo-spreadsheet",
  "/joyagoo-spreadsheet-news",
  "/joyagoo-buying-guide",
  "/finds",
  "/categories",
  "/guides",
  "/blog",
  "/about",
  "/agent-shopping-cost-calculator"
];

function check(condition, message) {
  if (!condition) failures.push(message);
}

check(languages.join(",") === "en,zh,pl,de,fr,it,pt,es,nl,da,sv,ar,cs", `Unexpected language order: ${languages.join(",")}`);
check(!mojibakePattern.test(source), "js/i18n.js contains replacement characters");

for (const file of ["index.html", ...routePages, ...articleFiles]) {
  const html = fs.readFileSync(file, "utf8");
  check(/js\/i18n\.js/.test(html), `${file} is missing i18n script`);
}

for (const slug of articleSlugs) {
  check(articleBySlug.has(slug), `Article file has no i18n entry: ${slug}`);
}

for (const article of articles) {
  check(articleSlugs.includes(article.slug), `i18n article has no HTML file: ${article.slug}`);
  for (const lang of languages) {
    check(Boolean(article.title[lang]), `${article.slug} missing ${lang} title`);
    check(Boolean(article.summary[lang]), `${article.slug} missing ${lang} summary`);
    check(Boolean(article.meta[lang]), `${article.slug} missing ${lang} meta`);
    check(Boolean(article.body[lang] || article.body.en), `${article.slug} missing ${lang} body fallback`);
  }
}

for (const lang of languages) {
  check(Boolean(copy[lang]), `${lang} missing global copy`);
  check(Boolean(navLabels[lang]), `${lang} missing nav labels`);
  for (const navPath of expectedNavPaths) {
    check(Boolean(navLabels[lang] && navLabels[lang][navPath]), `${lang} missing nav label for ${navPath}`);
  }
  check(Boolean(copy[lang].home), `${lang} missing home copy`);
  check(Boolean(copy[lang].list), `${lang} missing article list copy`);
  check(Boolean(copy[lang].readGuide), `${lang} missing readGuide copy`);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK languages=${languages.join(",")} articles=${articles.length} htmlArticles=${articleFiles.length}`);
}
