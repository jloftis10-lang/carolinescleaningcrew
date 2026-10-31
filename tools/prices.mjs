// Copies prices from pricing.json into every element marked data-price="<key>".
//   node tools/prices.mjs          update the HTML files
//   node tools/prices.mjs --check  exit 1 if any HTML file is out of date
// Keys are the perVisit/addOns keys in pricing.json, plus "from" (lowest per-visit price).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pricing = JSON.parse(readFileSync(join(root, "pricing.json"), "utf8"));
const check = process.argv.includes("--check");

const prices = { from: Math.min(...pricing.perVisit.map((p) => p.price)) };
for (const item of [...pricing.perVisit, ...pricing.addOns]) prices[item.key] = item.price;

let stale = 0;
for (const file of readdirSync(root).filter((f) => f.endsWith(".html"))) {
  const path = join(root, file);
  const html = readFileSync(path, "utf8");
  const updated = html.replace(/(data-price="([\w-]+)"[^>]*>)([^<]*)(<)/g, (match, open, key, text, close) => {
    if (!(key in prices)) throw new Error(`${file}: unknown price key "${key}"`);
    const value = `$${prices[key]}`;
    if (text !== value) {
      stale++;
      console.log(`${file}: ${key} ${text} -> ${value}`);
    }
    return open + value + close;
  });
  if (!check && updated !== html) writeFileSync(path, updated);
}

if (check && stale) {
  console.error(`${stale} price(s) out of date. Run: node tools/prices.mjs`);
  process.exit(1);
}
console.log(check ? "Prices match pricing.json" : "Prices synced");
