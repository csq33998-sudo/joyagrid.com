const { spawn } = require("child_process");
const http = require("http");
const net = require("net");

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  chromium = null;
}

let server;
let port;

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      probe.close(() => resolve(address.port));
    });
    probe.on("error", reject);
  });
}

function waitForServer() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Server did not start in time")), 5000);
    server.stdout.on("data", (chunk) => {
      if (chunk.toString().includes(`http://localhost:${port}`)) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.stderr.on("data", (chunk) => reject(new Error(chunk.toString())));
  });
}

function request(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}${pathname}`, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => resolve({ statusCode: response.statusCode, body }));
    });
    req.on("error", reject);
  });
}

async function verifyHttpOnly(note) {
  const [home, finds, categories, blog, about, guides, spreadsheet, qc, updates, buyingGuide, calculator, css, js, products, qcData] = await Promise.all([
    request("/"),
    request("/finds"),
    request("/categories"),
    request("/blog"),
    request("/about"),
    request("/guides"),
    request("/joyagoo-spreadsheet"),
    request("/qc?product=clean-low-sneaker"),
    request("/joyagoo-spreadsheet-news"),
    request("/joyagoo-buying-guide"),
    request("/agent-shopping-cost-calculator"),
    request("/styles.css"),
    request("/js/main.js"),
    request("/js/products.js"),
    request("/js/qc-data.js")
  ]);

  if (
    home.statusCode !== 200 ||
    finds.statusCode !== 200 ||
    categories.statusCode !== 200 ||
    blog.statusCode !== 200 ||
    about.statusCode !== 200 ||
    guides.statusCode !== 200 ||
    spreadsheet.statusCode !== 200 ||
    qc.statusCode !== 200 ||
    updates.statusCode !== 200 ||
    buyingGuide.statusCode !== 200 ||
    calculator.statusCode !== 200 ||
    css.statusCode !== 200 ||
    js.statusCode !== 200 ||
    products.statusCode !== 200 ||
    qcData.statusCode !== 200
  ) {
    throw new Error(
      `HTTP check failed: home=${home.statusCode} finds=${finds.statusCode} categories=${categories.statusCode} blog=${blog.statusCode} about=${about.statusCode} guides=${guides.statusCode} spreadsheet=${spreadsheet.statusCode} qc=${qc.statusCode} updates=${updates.statusCode} buyingGuide=${buyingGuide.statusCode} calculator=${calculator.statusCode} css=${css.statusCode} js=${js.statusCode} products=${products.statusCode} qcData=${qcData.statusCode}`
    );
  }
  if (!home.body.includes("Find products and compare QC photos")) throw new Error("Home page is missing its product-and-QC heading");
  if (!finds.body.includes("MaisonLooks products with QC photos")) throw new Error("Finds page is missing its product-and-QC heading");
  if (!categories.body.includes("Streetwear categories")) throw new Error("Categories page is missing categories copy");
  if (!blog.body.includes("JoyaGoo spreadsheet notes")) throw new Error("Blog page is missing blog copy");
  if (!about.body.includes("JoyaGoo spreadsheet discovery")) throw new Error("About page is missing about copy");
  if (!guides.body.includes("Streetwear search guides")) throw new Error("Guides page is missing guide index copy");
  if (!spreadsheet.body.includes("Browse products, QC photos, and shopping guidance")) throw new Error("Spreadsheet page is missing its product-and-guidance heading");
  if (!updates.body.includes("Joyagoo Spreadsheet Updates")) throw new Error("Updates page is missing update copy");
  if (!buyingGuide.body.includes("Joyagoo Buying Guide")) throw new Error("Buying guide page is missing guide copy");
  if (!calculator.body.includes("Agent Shopping Cost Calculator")) throw new Error("Calculator page is missing calculator copy");
  if (!home.body.includes("streetstyle.maisonlooks.com")) throw new Error("Home page is missing Streetstyle links");
  if (!products.body.includes("Nike Air Force 1 White Rope Laces Sneakers")) throw new Error("Source-checked products did not load");
  if (!qcData.body.includes("30 buyer QC photos & videos")) throw new Error("QC preview data did not load");
  if (!spreadsheet.body.includes("About the photos:")) throw new Error("Spreadsheet page is missing the photo-source notice");
  if (!spreadsheet.body.includes('id="qcRecordGrid"')) throw new Error("Spreadsheet page is missing the QC record mount point");
  if (!qc.body.includes("data-qc-page")) throw new Error("Dedicated QC page is missing its page marker");

  console.log(`verified http home=200 finds=200 categories=200 blog=200 about=200 guides=200 spreadsheet=200 qc=200 updates=200 buyingGuide=200 calculator=200 css=200 js=200 products=200 qcData=200${note ? ` (${note})` : ""}`);
}

async function verifyServerHardening() {
  const [badEncoding, hiddenFile] = await Promise.all([
    request("/%E0%A4%A"),
    request("/.git/config")
  ]);

  if (badEncoding.statusCode !== 400) throw new Error(`Malformed URL should return 400, got ${badEncoding.statusCode}`);
  if (hiddenFile.statusCode !== 403) throw new Error(`Hidden path should return 403, got ${hiddenFile.statusCode}`);

  console.log("verified server hardening malformed=400 hidden=403");
}

async function verifyWithBrowser() {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".product-card");
  const title = await page.locator("h1").textContent();
  const cards = await page.locator(".product-card").count();
  const cta = await page.locator('a[href="https://streetstyle.maisonlooks.com/"]').first().getAttribute("href");
  const categoryLink = await page.locator('a[href*="streetstyle.maisonlooks.com/en/search?q=shoes"]').first().getAttribute("href");
  const firstQcLink = await page.locator('a[data-link-kind="qc"]').first().getAttribute("href");
  const calculatorHeroLabel = await page.locator('.hero-actions a[href="/agent-shopping-cost-calculator"]').textContent();
  const spreadsheetLink = await page.locator('nav a[href="/joyagoo-spreadsheet"]').first().getAttribute("href");
  const updatesLink = await page.locator('nav a[href="/joyagoo-spreadsheet-news"]').first().getAttribute("href");
  const buyingGuideLink = await page.locator('nav a[href="/joyagoo-buying-guide"]').first().getAttribute("href");
  const calculatorLink = await page.locator('nav a[href="/agent-shopping-cost-calculator"]').first().getAttribute("href");
  const findsLink = await page.locator('nav a[href="/finds"]').first().getAttribute("href");
  const categoriesLink = await page.locator('nav a[href="/categories"]').first().getAttribute("href");

  await page.goto(`http://127.0.0.1:${port}/finds`, { waitUntil: "domcontentloaded" });
  const findsTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/categories`, { waitUntil: "domcontentloaded" });
  const categoriesTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/blog`, { waitUntil: "domcontentloaded" });
  const blogTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: "domcontentloaded" });
  const aboutTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/guides`, { waitUntil: "domcontentloaded" });
  const guidesTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/joyagoo-spreadsheet`, { waitUntil: "domcontentloaded" });
  const spreadsheetTitle = await page.locator("h1").textContent();
  await page.waitForSelector(".qc-record");
  const qcRecords = await page.locator(".qc-record").count();
  const requiredQcTargets = await page.locator("#qc-clean-low-sneaker, #qc-retro-runner-shoe, #qc-court-training-sneaker").count();

  if (!firstQcLink || !firstQcLink.startsWith("/qc?product=") || firstQcLink.includes("#")) throw new Error(`Invalid QC link: ${firstQcLink}`);
  await page.goto(new URL(firstQcLink, `http://127.0.0.1:${port}`).toString(), { waitUntil: "domcontentloaded" });
  await page.waitForSelector('.qc-record[data-active="true"]');
  const qcTitle = await page.locator("#qcPageTitle").textContent();
  const qcSource = await page.locator(".qc-record-actions .button.primary").getAttribute("href");
  const qcPreviewCount = await page.locator("[data-qc-image]").count();

  await page.goto(`http://127.0.0.1:${port}/joyagoo-spreadsheet-news`, { waitUntil: "domcontentloaded" });
  const updatesTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/joyagoo-buying-guide`, { waitUntil: "domcontentloaded" });
  const buyingGuideTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/agent-shopping-cost-calculator`, { waitUntil: "domcontentloaded" });
  const calculatorTitle = await page.locator("h1").textContent();
  const calculatorTotal = await page.locator("#totalCost").textContent();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded" });
  await mobile.waitForSelector(".product-card");
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

  await page.screenshot({ path: "verification-desktop.png", fullPage: true });
  await mobile.screenshot({ path: "verification-mobile.png", fullPage: true });
  await browser.close();

  if (title !== "Find products and compare QC photos") throw new Error(`Unexpected h1: ${title}`);
  if (findsTitle !== "Products with QC links") throw new Error(`Unexpected finds h1: ${findsTitle}`);
  if (categoriesTitle !== "Choose a product category") throw new Error(`Unexpected categories h1: ${categoriesTitle}`);
  if (blogTitle !== "Product finds and buying notes") throw new Error(`Unexpected blog h1: ${blogTitle}`);
  if (aboutTitle !== "A clearer route from finds to checks") throw new Error(`Unexpected about h1: ${aboutTitle}`);
  if (guidesTitle !== "Streetwear search articles") throw new Error(`Unexpected guides h1: ${guidesTitle}`);
  if (spreadsheetTitle !== "Browse products, QC photos, and shopping guidance") throw new Error(`Unexpected spreadsheet h1: ${spreadsheetTitle}`);
  if (updatesTitle !== "Joyagoo Spreadsheet Updates") throw new Error(`Unexpected updates h1: ${updatesTitle}`);
  if (buyingGuideTitle !== "Search, QC, sizing and shipping checks") throw new Error(`Unexpected buying guide h1: ${buyingGuideTitle}`);
  if (calculatorTitle !== "Agent Shopping Cost Calculator") throw new Error(`Unexpected calculator h1: ${calculatorTitle}`);
  if (calculatorTotal !== "$88.19") throw new Error(`Unexpected calculator total: ${calculatorTotal}`);
  if (cards !== 20) throw new Error(`Expected exactly 20 product cards, found ${cards}`);
  if (qcRecords !== cards) throw new Error(`Expected ${cards} QC records, found ${qcRecords}`);
  if (requiredQcTargets !== 3) throw new Error(`Required sneaker QC anchors are missing: found ${requiredQcTargets}/3`);
  if (qcTitle !== "Nike Air Force 1 White Rope Laces Sneakers") throw new Error(`Unexpected QC title: ${qcTitle}`);
  if (!qcSource || !new URL(qcSource).hostname.endsWith("maisonlooks.com")) throw new Error(`Invalid QC source link: ${qcSource}`);
  if (qcPreviewCount !== 9) throw new Error(`Expected 9 captured QC previews for the first product, found ${qcPreviewCount}`);
  if (!cta) throw new Error("Missing Streetstyle CTA");
  if (!categoryLink) throw new Error("Missing shoes search category link");
  if (!findsLink) throw new Error("Missing /finds navigation link");
  if (!categoriesLink) throw new Error("Missing /categories navigation link");
  if (!spreadsheetLink) throw new Error("Missing /joyagoo-spreadsheet navigation link");
  if (!updatesLink) throw new Error("Missing /joyagoo-spreadsheet-news navigation link");
  if (!buyingGuideLink) throw new Error("Missing /joyagoo-buying-guide navigation link");
  if (!calculatorLink) throw new Error("Missing /agent-shopping-cost-calculator navigation link");
  if (calculatorHeroLabel !== "Estimate total cost") throw new Error(`Calculator hero label does not match its destination: ${calculatorHeroLabel}`);
  if (overflow) throw new Error("Mobile viewport has horizontal overflow");
  if (errors.length) throw new Error(`Console errors: ${errors.join("; ")}`);

  console.log(`verified browser title="${title}" guides="${guidesTitle}" cards=${cards} mobileOverflow=${overflow}`);
}

(async () => {
  port = await getAvailablePort();
  server = spawn(process.execPath, ["serve.js"], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  });

  await waitForServer();
  await verifyServerHardening();
  if (!chromium) {
    await verifyHttpOnly("browser skipped: Playwright package is unavailable");
    return;
  }

  try {
    await verifyWithBrowser();
  } catch (error) {
    if (String(error.message || error).includes("Executable doesn't exist")) {
      await verifyHttpOnly("browser skipped: Playwright browser is not installed");
      return;
    }
    throw error;
  }
})()
  .finally(() => {
    if (server) server.kill();
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
