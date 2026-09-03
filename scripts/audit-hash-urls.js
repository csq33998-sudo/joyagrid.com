const fs = require("fs");
const path = require("path");

const extensions = new Set([".css", ".html", ".js", ".json", ".md", ".txt", ".xml"]);
const ignoredDirectories = new Set([".git", ".tools", "node_modules"]);
const checks = [
  { label: "HTML URL attribute", pattern: /\b(?:href|src|action)\s*=\s*["'][^"']*#[^"']*["']/gi },
  { label: "absolute URL fragment", pattern: /https?:\/\/[^\s"'<>)]*#[^\s"'<>)]*/gi },
  { label: "Markdown URL fragment", pattern: /\]\([^\s)]*#[^)]*\)/g },
  { label: "JavaScript hash navigation", pattern: /\b(?:location\.hash|hashchange)\b/g }
];

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    return entry.isFile() && extensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

const findings = [];
for (const file of sourceFiles(process.cwd())) {
  if (path.resolve(file) === __filename) continue;
  const source = fs.readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const check of checks) {
      check.pattern.lastIndex = 0;
      if (check.pattern.test(line)) {
        findings.push(`${path.relative(process.cwd(), file)}:${index + 1} ${check.label}: ${line.trim()}`);
      }
    }
  });
}

if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log("verified no hash-fragment URLs or hash-navigation code");
}
