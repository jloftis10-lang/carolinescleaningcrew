// Pre-publish checks for the static site. Run: node tools/check-site.mjs
// Checks titles/descriptions/canonicals, the sitemap, internal links and anchors,
// structured data, phone links, prices, and wording the business can't currently back up.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://carolinescleaningcrew.com/";
const PHONE = "+17604929338";
const errors = [];
const fail = (msg) => errors.push(msg);

// Claims that need evidence or approval before they can appear on the site
const banned = [
  [/bonded/i, "\"bonded\" (not confirmed)"],
  [/fully insured/i, "\"fully insured\""],
  [/background[- ]check/i, "background checks"],
  [/licensed/i, "\"licensed\""],
  [/most popular/i, "\"Most popular\""],
  [/\$(?!100\b)\d/, "a price other than \"as low as $100\" (the site doesn't list prices)"],
  [/cheapest/i, "\"cheapest\""],
  [/near me/i, "\"near me\""],
  [/testimonial|aggregateRating|reviewRating|★/i, "reviews or ratings"],
  [/within (one|1|24|48)/i, "response-time promise"],
  [/twice (a|per) month/i, "every other week described as twice a month"],
];

const pages = readdirSync(root).filter((f) => f.endsWith(".html"));
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const ids = Object.fromEntries(
  pages.map((f) => [f, new Set([...readFileSync(join(root, f), "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))])
);

for (const file of pages) {
  const html = readFileSync(join(root, file), "utf8");
  const visible = html.replace(/<!--[\s\S]*?-->/g, "");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const url = file === "index.html" ? SITE : SITE + file;

  if (!/<title>[^<]{10,70}<\/title>/.test(html)) fail(`${file}: missing or overlong <title>`);
  if (!noindex) {
    const desc = html.match(/<meta name="description" content="([^"]*)"/);
    if (!desc || desc[1].length < 70 || desc[1].length > 170) fail(`${file}: meta description missing or not 70-170 chars`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (canonical?.[1] !== url) fail(`${file}: canonical should be ${url}`);
    if (!/property="og:title"/.test(html) || !/property="og:image"/.test(html)) fail(`${file}: missing og tags`);
    if (!sitemapUrls.includes(url)) fail(`${file}: indexable page missing from sitemap`);
  } else if (sitemapUrls.includes(url)) {
    fail(`${file}: noindex page is in the sitemap`);
  }

  for (const [pattern, label] of banned) if (pattern.test(visible)) fail(`${file}: contains ${label}`);

  for (const m of visible.matchAll(/href="(tel|sms):([^"]+)"/g)) {
    if (m[2] !== PHONE) fail(`${file}: ${m[1]} link to ${m[2]} (expected ${PHONE})`);
  }

  for (const m of visible.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|tel:|sms:|mailto:)/.test(href)) continue;
    const [pathPart, hash] = href.replace(/^\?[^#]*/, "").split("#");
    const target = pathPart === "" || pathPart === "/" ? (pathPart === "/" ? "index.html" : file) : pathPart.replace(/^\//, "");
    if (!existsSync(join(root, target))) fail(`${file}: broken link ${href}`);
    else if (hash && target.endsWith(".html") && !ids[target]?.has(hash)) fail(`${file}: missing anchor ${href}`);
  }
  for (const m of visible.matchAll(/src="([^"]+)"/g)) {
    if (!/^https?:/.test(m[1]) && !existsSync(join(root, m[1].replace(/^\//, "")))) fail(`${file}: missing file ${m[1]}`);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      for (const key of ["address", "openingHours", "aggregateRating", "review", "areaServed", "geo"]) {
        if (key in data) fail(`${file}: structured data has unconfirmed "${key}"`);
      }
    } catch {
      fail(`${file}: structured data is not valid JSON`);
    }
  }
}

for (const url of sitemapUrls) {
  const file = url === SITE ? "index.html" : url.replace(SITE, "");
  if (!existsSync(join(root, file))) fail(`sitemap: ${url} has no file`);
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages checked, sitemap has ${sitemapUrls.length} URLs`);
