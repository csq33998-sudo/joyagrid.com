const fs = require("fs");
const path = require("path");

const routePages = ["finds.html", "categories.html", "guides.html", "blog.html", "about.html"];
const htmlFiles = ["index.html", ...routePages, ...fs.readdirSync("articles").filter((file) => file.endsWith(".html")).map((file) => path.join("articles", file))];
const assetFiles = [
  "assets/joyagoo-spreadsheet-og.png",
  "assets/joyagoo-spreadsheet-logo.png",
  "assets/joyagoo-icon-512.png",
  "assets/joyagoo-icon-192.png",
  "assets/joyagoo-icon-64.png",
  "assets/apple-touch-icon.png",
  "assets/favicon-32x32.png",
  "assets/favicon-16x16.png",
  "site.webmanifest"
];
const failures = [];

for (const asset of assetFiles) {
  if (!fs.existsSync(asset)) failures.push(`Missing asset ${asset}`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("favicon-32x32.png")) failures.push(`${file} missing favicon`);
  if (!html.includes("apple-touch-icon.png")) failures.push(`${file} missing apple touch icon`);
  if (!html.includes("site.webmanifest")) failures.push(`${file} missing manifest`);
  if (!html.includes("joyagoo-spreadsheet-og.png")) failures.push(`${file} missing og image`);
  if (!html.includes('og:image:alt" content="JoyaGoo spreadsheet')) failures.push(`${file} missing og image alt`);
  if (!html.includes('alt="JoyaGoo spreadsheet"')) failures.push(`${file} missing logo alt`);
  if (!/JoyaGoo spreadsheet/i.test(html)) failures.push(`${file} missing JoyaGoo spreadsheet text`);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK seo assets html=${htmlFiles.length} assets=${assetFiles.length}`);
}
