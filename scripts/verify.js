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
  const [home, finds, categories, about, guides, css, js, products] = await Promise.all([
    request("/"),
    request("/finds"),
    request("/categories"),
    request("/about"),
    request("/guides"),
    request("/styles.css"),
    request("/js/main.js"),
    request("/js/products.js")
  ]);

  if (
    home.statusCode !== 200 ||
    finds.statusCode !== 200 ||
    categories.statusCode !== 200 ||
    about.statusCode !== 200 ||
    guides.statusCode !== 200 ||
    css.statusCode !== 200 ||
    js.statusCode !== 200 ||
    products.statusCode !== 200
  ) {
    throw new Error(
      `HTTP check failed: home=${home.statusCode} finds=${finds.statusCode} categories=${categories.statusCode} about=${about.statusCode} guides=${guides.statusCode} css=${css.statusCode} js=${js.statusCode} products=${products.statusCode}`
    );
  }
  if (!home.body.includes("Joya Grid")) throw new Error("Home page is missing Joya Grid copy");
  if (!finds.body.includes("Street-style finds")) throw new Error("Finds page is missing finds copy");
  if (!categories.body.includes("Streetwear categories")) throw new Error("Categories page is missing categories copy");
  if (!about.body.includes("JoyaGoo spreadsheet discovery")) throw new Error("About page is missing about copy");
  if (!guides.body.includes("Streetwear search guides")) throw new Error("Guides page is missing guide index copy");
  if (!home.body.includes("streetstyle.maisonlooks.com")) throw new Error("Home page is missing Streetstyle links");
  if (!products.body.includes("Washed Bomber Street Layer")) throw new Error("Seed products did not load");

  console.log(`verified http home=200 finds=200 categories=200 about=200 guides=200 css=200 js=200 products=200${note ? ` (${note})` : ""}`);
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
  const guidesLink = await page.locator('nav a[href="/guides"]').first().getAttribute("href");
  const findsLink = await page.locator('nav a[href="/finds"]').first().getAttribute("href");
  const categoriesLink = await page.locator('nav a[href="/categories"]').first().getAttribute("href");
  const aboutLink = await page.locator('nav a[href="/about"]').first().getAttribute("href");

  await page.goto(`http://127.0.0.1:${port}/finds`, { waitUntil: "domcontentloaded" });
  const findsTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/categories`, { waitUntil: "domcontentloaded" });
  const categoriesTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: "domcontentloaded" });
  const aboutTitle = await page.locator("h1").textContent();

  await page.goto(`http://127.0.0.1:${port}/guides`, { waitUntil: "domcontentloaded" });
  const guidesTitle = await page.locator("h1").textContent();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded" });
  await mobile.waitForSelector(".product-card");
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

  await page.screenshot({ path: "verification-desktop.png", fullPage: true });
  await mobile.screenshot({ path: "verification-mobile.png", fullPage: true });
  await browser.close();

  if (title !== "Joya Grid") throw new Error(`Unexpected h1: ${title}`);
  if (findsTitle !== "Street-style finds") throw new Error(`Unexpected finds h1: ${findsTitle}`);
  if (categoriesTitle !== "Streetwear categories") throw new Error(`Unexpected categories h1: ${categoriesTitle}`);
  if (aboutTitle !== "JoyaGoo spreadsheet discovery") throw new Error(`Unexpected about h1: ${aboutTitle}`);
  if (guidesTitle !== "Streetwear search guides") throw new Error(`Unexpected guides h1: ${guidesTitle}`);
  if (cards < 8) throw new Error(`Expected at least 8 product cards, found ${cards}`);
  if (!cta) throw new Error("Missing Streetstyle CTA");
  if (!categoryLink) throw new Error("Missing shoes search category link");
  if (!findsLink) throw new Error("Missing /finds navigation link");
  if (!categoriesLink) throw new Error("Missing /categories navigation link");
  if (!aboutLink) throw new Error("Missing /about navigation link");
  if (!guidesLink) throw new Error("Missing /guides navigation link");
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
