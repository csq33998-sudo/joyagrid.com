const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml"
};

function resolveFile(urlPath) {
  let clean;
  try {
    clean = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "") || "index.html";
  } catch {
    return { statusCode: 400, message: "Bad request" };
  }

  const cleanRoutes = new Map([
    ["about", "about.html"],
    ["blog", "blog.html"],
    ["categories", "categories.html"],
    ["finds", "finds.html"],
    ["guides", "guides.html"]
  ]);
  clean = cleanRoutes.get(clean) || clean;

  const file = path.resolve(root, clean);
  const relative = path.relative(root, file);
  if (relative.startsWith("..") || path.isAbsolute(relative) || relative.split(path.sep).some((part) => part.startsWith("."))) {
    return { statusCode: 403, message: "Forbidden" };
  }
  return { file };
}

const server = http.createServer((request, response) => {
  const result = resolveFile(request.url || "/");
  if (!result.file) {
    response.writeHead(result.statusCode);
    response.end(result.message);
    return;
  }

  fs.readFile(result.file, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": types[path.extname(result.file)] || "application/octet-stream" });
    response.end(content);
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Set PORT to an available port and try again.`);
  } else {
    console.error(error.message);
  }
  process.exitCode = 1;
});

server.listen(port, () => {
  console.log(`Joya Grid running at http://localhost:${port}`);
});
