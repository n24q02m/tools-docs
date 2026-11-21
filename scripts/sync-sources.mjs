#!/usr/bin/env node
/**
 * Compile the skret documentation into this site.
 *
 * src/content/docs/skret/ is not tracked in this repository: every build
 * regenerates it from the skret repository, so the portal cannot drift from it.
 *
 *   <SKRET_DIR>/docs/src/content/docs/**  -> skret/**
 *   src/portal-pages/**                   -> same path (portal pages with no
 *     source page; one may not shadow a source page)
 *
 * SKRET_DIR defaults to the sibling checkout ../skret. A missing source is an
 * error: the build never publishes a stub.
 *
 * Each source page is adapted to its mount point:
 *   - a root-relative link into the source site gets the mount prefix
 *     (/guide/x/ -> /skret/guide/x/);
 *   - editUrl points at the source file, unless the page sets its own;
 *   - the splash hero image is dropped: its asset path only resolves in the source site.
 *
 * Output is deterministic: sorted traversal, LF line endings.
 *
 * Usage: node scripts/sync-sources.mjs (run by the build and dev scripts)
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT = join('docs', 'src', 'content', 'docs');
const SKRET_EDIT = 'https://github.com/n24q02m/skret/edit/main/docs/src/content/docs';
const MOUNTS = ['skret'];

// Sorted POSIX paths of every file under root. Default sort order is by UTF-16
// code unit, so it does not depend on the locale.
function walk(root) {
  const files = [];
  const visit = (dir, prefix) => {
    for (const name of readdirSync(dir).sort()) {
      const rel = prefix ? `${prefix}/${name}` : name;
      if (statSync(join(dir, name)).isDirectory()) visit(join(dir, name), rel);
      else files.push(rel);
    }
  };
  visit(root, '');
  return files;
}

// First path segments that belong to a source site: its top-level sections and pages.
function sections(files) {
  const names = files.map((rel) => rel.split('/')[0].replace(/\.mdx?$/, ''));
  return [...new Set(names)].filter((name) => name !== 'index').sort();
}

function prefixLinks(text, names, mount) {
  if (names.length === 0) return text;
  const alternatives = names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  return text.replace(new RegExp(`([(:\\s"'])/(${alternatives})/`, 'g'), `$1/${mount}/$2/`);
}

function dropHeroImage(text) {
  const fm = text.match(/^---\n([\s\S]*?\n)---\n/);
  if (!fm || !/^hero:/m.test(fm[1])) return text;
  const stripped = fm[1].replace(/^ {2}image:\n(?: {4,}\S.*\n)*/m, '');
  return `---\n${stripped}---\n${text.slice(fm[0].length)}`;
}

function withEditUrl(text, url) {
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm || /^editUrl:/m.test(fm[1])) return text;
  return `---\n${fm[1]}\neditUrl: ${url}\n---\n${text.slice(fm[0].length)}`;
}

const isPage = (rel) => /\.mdx?$/.test(rel);
const toLf = (text) => text.replace(/\r\n/g, '\n');

function requirePath(path, what, env, repo) {
  if (!existsSync(path)) {
    throw new Error(`${what} not found at ${path}; set ${env} to a checkout of ${repo}`);
  }
}

// Read one source site into [portal path, content] pairs.
function compileSite(contentDir, { mount, editBase }) {
  const files = walk(contentDir);
  const names = sections(files);
  return files.map((rel) => {
    const raw = readFileSync(join(contentDir, rel));
    if (!isPage(rel)) return [`${mount}/${rel}`, raw];
    const text = prefixLinks(dropHeroImage(toLf(raw.toString('utf8'))), names, mount);
    return [`${mount}/${rel}`, withEditUrl(text, `${editBase}/${rel}`)];
  });
}

/**
 * Regenerate <docsDir>/skret from the skret checkout plus the overlay. Every input
 * is checked before anything under docsDir changes.
 */
export function syncSources({ skretDir, docsDir, overlayDir }) {
  const skretContent = join(skretDir, CONTENT);
  requirePath(skretContent, 'skret docs', 'SKRET_DIR', 'n24q02m/skret');

  const pages = new Map(compileSite(skretContent, { mount: 'skret', editBase: SKRET_EDIT }));
  const counts = { skret: pages.size, overlay: 0 };

  for (const rel of existsSync(overlayDir) ? walk(overlayDir) : []) {
    if (!MOUNTS.includes(rel.split('/')[0])) {
      throw new Error(`${rel} in ${overlayDir} is outside ${MOUNTS.join('/ and ')}/`);
    }
    if (pages.has(rel)) {
      throw new Error(`${rel} exists in both ${overlayDir} and its source repository; remove the overlay copy`);
    }
    const raw = readFileSync(join(overlayDir, rel));
    pages.set(rel, isPage(rel) ? toLf(raw.toString('utf8')) : raw);
    counts.overlay += 1;
  }

  for (const mount of MOUNTS) rmSync(join(docsDir, mount), { recursive: true, force: true });
  for (const rel of [...pages.keys()].sort()) {
    const dest = join(docsDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, pages.get(rel));
  }
  return counts;
}

/** Compile into the site at root, reading skret from SKRET_DIR or the sibling ../skret. */
export function main(root, env) {
  const counts = syncSources({
    skretDir: resolve(env.SKRET_DIR || join(root, '..', 'skret')),
    docsDir: join(root, 'src', 'content', 'docs'),
    overlayDir: join(root, 'src', 'portal-pages'),
  });
  console.log(`sync-sources: ${counts.skret} skret and ${counts.overlay} portal-only file(s)`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(dirname(dirname(fileURLToPath(import.meta.url))), process.env);
  } catch (err) {
    console.error(`sync-sources: ${err.message}`);
    process.exitCode = 1;
  }
}
