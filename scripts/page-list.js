const fs = require("fs");
const path = require("path");

const routePages = [
  "finds.html",
  "categories.html",
  "guides.html",
  "blog.html",
  "about.html",
  "joyagoo-spreadsheet.html",
  "joyagoo-spreadsheet-news.html",
  "joyagoo-buying-guide.html",
  "agent-shopping-cost-calculator.html",
  "qc.html"
];

function articlePages() {
  return fs
    .readdirSync("articles")
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join("articles", file));
}

function qcPages() {
  if (!fs.existsSync("qc")) return [];
  return fs
    .readdirSync("qc")
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join("qc", file));
}

function htmlPages() {
  return ["index.html", ...routePages, ...articlePages(), ...qcPages()];
}

module.exports = {
  articlePages,
  htmlPages,
  qcPages,
  routePages
};
