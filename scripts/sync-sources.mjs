#!/usr/bin/env node
/**
 * Compile the skret and claude-plugins documentation into this site.
 *
 * src/content/docs/skret/ and src/content/docs/plugins/ are not tracked in this
 * repository: every build regenerates them from their source repositories, so the
 * portal cannot drift from them.
 *
 *   <SKRET_DIR>/docs/src/content/docs/**           -> skret/**
 *   <CLAUDE_PLUGINS_DIR>/docs/src/content/docs/**  -> plugins/**
 *   src/portal-pages/**                            -> same path (portal pages with
 *     no source page; one may not shadow a source page)
 *
 * The claude-plugins server pages (servers/<name>/) are rendered from
 * plugins/<name>/*.md by that repository's own generator,
 * docs/scripts/sync-plugin-docs.mjs, which runs first.
 *
 * SKRET_DIR and CLAUDE_PLUGINS_DIR default to the sibling checkouts ../skret and
 * ../claude-plugins. A missing source is an error: the build never publishes a stub.
 *
 * Each source page is adapted to its mount point:
 *   - a root-relative link into the source site gets the mount prefix
 *     (/guide/x/ -> /skret/guide/x/);
 *   - editUrl points at the source file, unless the page sets its own (the
 *     generated server pages keep the generator's, if any);
 *   - the splash hero image is dropped: its asset path only resolves in the source site.
 *
 * Output is deterministic: sorted traversal, LF line endings.
 *
 * Usage: node scripts/sync-sources.mjs (run by the build and dev scripts)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT = join('docs', 'src', 'content', 'docs');
const GENERATOR = join('docs', 'scripts', 'sync-plugin-docs.mjs');
const SKRET_EDIT = 'https://github.com/n24q02m/skret/edit/main/docs/src/content/docs';
const PLUGINS_EDIT = 'https://github.com/n24q02m/claude-plugins/edit/main/docs/src/content/docs';
// Older claude-plugins checkouts hold copies of this portal's sections there,
// written by its former reverse syncs; never feed them back in.
const PLUGINS_SKIP = new Set(['tools', 'skret']);
// Written by the generator, which sets editUrl itself; there is no file to edit there.
const PLUGINS_GENERATED = new Set(['servers']);
const MOUNTS = ['skret', 'plugins'];

// Sorted POSIX paths of every file under root, skipping the named top-level
// entries. Default sort order is by UTF-16 code unit, so it does not depend on
// the locale.
function walk(root, skip = new Set()) {
  const files = [];
  const visit = (dir, prefix) => {
    for (const name of readdirSync(dir).sort()) {
      if (!prefix && skip.has(name)) continue;
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
function compileSite(contentDir, { mount, editBase, skip, generated = new Set() }) {
  const files = walk(contentDir, skip);
  const names = sections(files);
  return files.map((rel) => {
    const raw = readFileSync(join(contentDir, rel));
    if (!isPage(rel)) return [`${mount}/${rel}`, raw];
    const text = prefixLinks(dropHeroImage(toLf(raw.toString('utf8'))), names, mount);
    if (generated.has(rel.split('/')[0])) return [`${mount}/${rel}`, text];
    return [`${mount}/${rel}`, withEditUrl(text, `${editBase}/${rel}`)];
  });
}

/**
 * Regenerate <docsDir>/skret and <docsDir>/plugins from the two source checkouts
 * plus the overlay. Every input is checked before anything under docsDir changes.
 */
export function syncSources({ skretDir, pluginsDir, docsDir, overlayDir }) {
  const skretContent = join(skretDir, CONTENT);
  const pluginsContent = join(pluginsDir, CONTENT);
  const generator = join(pluginsDir, GENERATOR);
  requirePath(skretContent, 'skret docs', 'SKRET_DIR', 'n24q02m/skret');
  requirePath(pluginsContent, 'claude-plugins docs', 'CLAUDE_PLUGINS_DIR', 'n24q02m/claude-plugins');
  requirePath(generator, 'claude-plugins server-page generator', 'CLAUDE_PLUGINS_DIR', 'n24q02m/claude-plugins');

  try {
    execFileSync(process.execPath, [generator], { cwd: join(pluginsDir, 'docs'), stdio: ['ignore', 'ignore', 'inherit'] });
  } catch (err) {
    throw new Error(`claude-plugins server-page generator failed: ${err.message}`);
  }

  const skret = compileSite(skretContent, { mount: 'skret', editBase: SKRET_EDIT });
  const plugins = compileSite(pluginsContent, {
    mount: 'plugins',
    editBase: PLUGINS_EDIT,
    skip: PLUGINS_SKIP,
    generated: PLUGINS_GENERATED,
  });
  const pages = new Map([...skret, ...plugins]);
  const counts = { skret: skret.length, plugins: plugins.length, overlay: 0 };

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

/**
 * Compile into the site at root, reading skret from SKRET_DIR or the sibling
 * ../skret, and claude-plugins from CLAUDE_PLUGINS_DIR or the sibling ../claude-plugins.
 */
export function main(root, env) {
  const counts = syncSources({
    skretDir: resolve(env.SKRET_DIR || join(root, '..', 'skret')),
    pluginsDir: resolve(env.CLAUDE_PLUGINS_DIR || join(root, '..', 'claude-plugins')),
    docsDir: join(root, 'src', 'content', 'docs'),
    overlayDir: join(root, 'src', 'portal-pages'),
  });
  console.log(
    `sync-sources: ${counts.skret} skret, ${counts.plugins} claude-plugins and ${counts.overlay} portal-only file(s)`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(dirname(dirname(fileURLToPath(import.meta.url))), process.env);
  } catch (err) {
    console.error(`sync-sources: ${err.message}`);
    process.exitCode = 1;
  }
}
