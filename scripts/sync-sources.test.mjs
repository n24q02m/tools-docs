import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { main, syncSources } from './sync-sources.mjs';

const script = join(dirname(fileURLToPath(import.meta.url)), 'sync-sources.mjs');
const LOGO = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function write(root, rel, content) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function tree(root) {
  const files = {};
  const walk = (dir) => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1));
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else files[path.slice(root.length + 1).replace(/\\/g, '/')] = readFileSync(path, 'utf8');
    }
  };
  walk(root);
  return files;
}

function fixture() {
  const base = mkdtempSync(join(tmpdir(), 'sync-sources-'));
  const skretDir = join(base, 'skret');
  const pluginsDir = join(base, 'claude-plugins');
  const docsDir = join(base, 'site', 'src', 'content', 'docs');
  const overlayDir = join(base, 'site', 'src', 'portal-pages');

  write(skretDir, 'docs/src/content/docs/index.mdx',
    '---\ntitle: skret\ntemplate: splash\nhero:\n  tagline: Secrets.\n  image:\n    file: ../../assets/logo.svg\n    alt: skret logo\n  actions:\n    - text: Get started\n      link: /guide/getting-started/\n---\n\nSee the [FAQ](/faq/).\n');
  write(skretDir, 'docs/src/content/docs/faq.md', '---\ntitle: FAQ\n---\n\nRead [sync](/guide/sync/#prune).\n');
  write(skretDir, 'docs/src/content/docs/guide/sync.md',
    '---\r\ntitle: Sync\r\n---\r\n\r\nSee [config](/reference/config-schema/) and `/guide/` in code, not [hull](/hull/overview/).\r\n');
  write(skretDir, 'docs/src/content/docs/guide/custom-edit.md',
    '---\ntitle: Custom edit\neditUrl: https://example.test/elsewhere.md\n---\n\nBody.\n');
  write(skretDir, 'docs/src/content/docs/guide/plain.md', 'No frontmatter, see [faq](/faq/).\n');
  write(skretDir, 'docs/src/content/docs/guide/logo.png', LOGO);
  write(skretDir, 'docs/src/content/docs/reference/config-schema.md', '---\ntitle: Config schema\n---\n\nBody.\n');

  write(pluginsDir, 'docs/src/content/docs/index.mdx',
    '---\ntitle: Plugins\ntemplate: splash\nhero:\n  tagline: Servers.\n  image:\n    light: ../../assets/logo.svg\n    dark: ../../assets/logo-dark.svg\n  actions:\n    - text: Install\n      link: /get-started/install/\n---\n\nCompare in [the table](/reference/comparison/).\n');
  write(pluginsDir, 'docs/src/content/docs/get-started/install.md',
    '---\ntitle: Install\n---\n\nSet up [wet](/servers/wet/setup/), keep secrets in [skret](/skret/guide/sync/), read [the wet card](/tools/wet/).\n');
  write(pluginsDir, 'docs/src/content/docs/reference/comparison.md', '---\ntitle: Comparison\n---\n\nBody.\n');
  write(pluginsDir, 'docs/scripts/sync-plugin-docs.mjs', generator(0));

  write(overlayDir, 'skret/overview.md', '---\r\ntitle: Overview\r\n---\r\n\r\nPortal page.\r\n');

  return { base, skretDir, pluginsDir, docsDir, overlayDir };
}

// Stands in for claude-plugins docs/scripts/sync-plugin-docs.mjs: renders servers/
// next to the docs content, one page with its own editUrl and one without, then
// exits with the given code.
function generator(exitCode) {
  const servers = {
    'index.md': '---\ntitle: Servers\n---\n\nSee [the table](/reference/comparison/).\n',
    'wet/setup.md':
      '---\ntitle: Setup\neditUrl: https://github.com/n24q02m/claude-plugins/edit/main/plugins/wet/setup.md\n---\n\nBack to [install](/get-started/install/).\n',
  };
  return [
    "import { mkdirSync, writeFileSync } from 'node:fs';",
    "import { dirname, join } from 'node:path';",
    "import { fileURLToPath } from 'node:url';",
    "const target = join(dirname(dirname(fileURLToPath(import.meta.url))), 'src', 'content', 'docs', 'servers');",
    `for (const [rel, text] of Object.entries(${JSON.stringify(servers)})) {`,
    '  mkdirSync(dirname(join(target, rel)), { recursive: true });',
    '  writeFileSync(join(target, rel), text);',
    '}',
    `process.exit(${exitCode});`,
    '',
  ].join('\n');
}

test('rewrites root-relative links into the skret site under its portal mount', () => {
  const f = fixture();
  syncSources(f);
  const out = tree(f.docsDir);

  assert.match(out['skret/index.mdx'], /link: \/skret\/guide\/getting-started\//);
  assert.match(out['skret/index.mdx'], /\[FAQ\]\(\/skret\/faq\/\)/);
  assert.match(out['skret/faq.md'], /\(\/skret\/guide\/sync\/#prune\)/);
  assert.match(out['skret/guide/sync.md'], /\(\/skret\/reference\/config-schema\/\)/);
  assert.match(out['skret/guide/sync.md'], /`\/guide\/` in code/, 'code spans are not links');
  assert.match(out['skret/guide/sync.md'], /\(\/hull\/overview\/\)/, 'portal links outside the source site stay');
  assert.match(out['skret/guide/plain.md'], /\(\/skret\/faq\/\)/);
  rmSync(f.base, { recursive: true, force: true });
});

test('points editUrl of every compiled page at its source file', () => {
  const f = fixture();
  syncSources(f);
  const out = tree(f.docsDir);

  assert.match(out['skret/guide/sync.md'],
    /^---\ntitle: Sync\neditUrl: https:\/\/github\.com\/n24q02m\/skret\/edit\/main\/docs\/src\/content\/docs\/guide\/sync\.md\n---\n/);
  assert.match(out['skret/index.mdx'],
    /\neditUrl: https:\/\/github\.com\/n24q02m\/skret\/edit\/main\/docs\/src\/content\/docs\/index\.mdx\n---\n/);
  // A page that sets its own editUrl keeps it, and only it.
  assert.match(out['skret/guide/custom-edit.md'], /\neditUrl: https:\/\/example\.test\/elsewhere\.md\n/);
  assert.equal(out['skret/guide/custom-edit.md'].match(/editUrl:/g).length, 1);
  // A page with no frontmatter has nowhere to put one.
  assert.equal(out['skret/guide/plain.md'], 'No frontmatter, see [faq](/skret/faq/).\n');
  rmSync(f.base, { recursive: true, force: true });
});

test('drops the hero image whose asset path only resolves in the source site', () => {
  const f = fixture();
  syncSources(f);
  const out = tree(f.docsDir);

  assert.doesNotMatch(out['skret/index.mdx'], /image:|logo\.svg/);
  assert.match(out['skret/index.mdx'], /\nhero:\n  tagline: Secrets\.\n  actions:\n/);
  rmSync(f.base, { recursive: true, force: true });
});

test('copies non-page files byte for byte', () => {
  const f = fixture();
  syncSources(f);

  assert.deepEqual(readFileSync(join(f.docsDir, 'skret/guide/logo.png')), LOGO);
  rmSync(f.base, { recursive: true, force: true });
});

test('copies portal pages from the overlay and refuses to shadow a source page', () => {
  const f = fixture();
  write(f.overlayDir, 'skret/diagram.png', LOGO);
  const counts = syncSources(f);
  assert.deepEqual(counts, { skret: 7, plugins: 5, overlay: 2 });
  assert.equal(readFileSync(join(f.docsDir, 'skret/overview.md'), 'utf8'), '---\ntitle: Overview\n---\n\nPortal page.\n');
  assert.deepEqual(readFileSync(join(f.docsDir, 'skret/diagram.png')), LOGO);

  write(f.overlayDir, 'skret/faq.md', '---\ntitle: Shadow\n---\n');
  assert.throws(() => syncSources(f), /skret\/faq\.md.*both/);
  rmSync(f.base, { recursive: true, force: true });
});

test('refuses an overlay page outside the compiled section', () => {
  const f = fixture();
  write(f.overlayDir, 'hull/index.md', '---\ntitle: Elsewhere\n---\n');

  assert.throws(() => syncSources(f), /hull\/index\.md.*outside skret\/ and plugins\//);
  rmSync(f.base, { recursive: true, force: true });
});

test('runs without an overlay directory', () => {
  const f = fixture();
  rmSync(f.overlayDir, { recursive: true, force: true });

  assert.deepEqual(syncSources(f), { skret: 7, plugins: 5, overlay: 0 });
  rmSync(f.base, { recursive: true, force: true });
});

test('a source site with only an index page keeps its links unchanged', () => {
  const f = fixture();
  rmSync(f.skretDir, { recursive: true, force: true });
  write(f.skretDir, 'docs/src/content/docs/index.md',
    '---\ntitle: skret\n---\n\nSee [cdn](//cdn.example.test/x/) and [faq](/faq/).\n');
  syncSources(f);

  assert.match(readFileSync(join(f.docsDir, 'skret/index.md'), 'utf8'),
    /\(\/\/cdn\.example\.test\/x\/\) and \[faq\]\(\/faq\/\)/);
  rmSync(f.base, { recursive: true, force: true });
});

test('main reads the sibling checkouts unless SKRET_DIR or CLAUDE_PLUGINS_DIR is set', () => {
  const f = fixture();
  const site = join(f.base, 'site');
  main(site, {});
  assert.match(readFileSync(join(f.docsDir, 'skret/faq.md'), 'utf8'), /\(\/skret\/guide\/sync\/#prune\)/);
  assert.ok(existsSync(join(f.docsDir, 'plugins/servers/wet/setup.md')));

  const moved = join(f.base, 'elsewhere');
  write(moved, 'docs/src/content/docs/only.md', '---\ntitle: Only\n---\n');
  const movedPlugins = join(f.base, 'plugins-elsewhere');
  write(movedPlugins, 'docs/src/content/docs/only.md', '---\ntitle: Only\n---\n');
  write(movedPlugins, 'docs/scripts/sync-plugin-docs.mjs', '');
  main(site, { SKRET_DIR: moved, CLAUDE_PLUGINS_DIR: movedPlugins });
  assert.deepEqual(Object.keys(tree(f.docsDir)), ['plugins/only.md', 'skret/only.md', 'skret/overview.md']);
  rmSync(f.base, { recursive: true, force: true });
});

test('a missing source fails before the generated tree is touched', () => {
  const f = fixture();
  syncSources(f);
  const before = tree(f.docsDir);

  assert.throws(() => syncSources({ ...f, skretDir: join(f.base, 'nope') }), /skret.*not found.*SKRET_DIR/s);
  assert.deepEqual(tree(f.docsDir), before);

  for (const [paths, message] of [
    [{ pluginsDir: join(f.base, 'nope') }, /claude-plugins docs not found.*CLAUDE_PLUGINS_DIR/s],
    [{ pluginsDir: f.skretDir }, /server-page generator not found.*CLAUDE_PLUGINS_DIR/s],
  ]) {
    assert.throws(() => syncSources({ ...f, ...paths }), message);
    assert.deepEqual(tree(f.docsDir), before);
  }

  const run = spawnSync(process.execPath, [script], {
    env: { ...process.env, SKRET_DIR: join(f.base, 'nope'), CLAUDE_PLUGINS_DIR: join(f.base, 'nope') },
    encoding: 'utf8',
  });
  assert.equal(run.status, 1);
  assert.match(run.stderr, /SKRET_DIR/);
  rmSync(f.base, { recursive: true, force: true });
});

test('output is deterministic, LF-only, and drops pages removed at the source', () => {
  const f = fixture();
  write(f.docsDir, 'skret/stale.md', '---\ntitle: Gone\n---\n');
  write(f.docsDir, 'get-started/overview.mdx', '---\ntitle: Portal page outside the compiled dir\n---\n');
  syncSources(f);
  const first = tree(f.docsDir);
  syncSources(f);
  assert.deepEqual(tree(f.docsDir), first);

  assert.ok(!('skret/stale.md' in first));
  assert.ok('get-started/overview.mdx' in first, 'pages outside skret/ are left alone');
  for (const [path, text] of Object.entries(first)) {
    if (path.endsWith('.png')) continue;
    assert.ok(!text.includes('\r'), `${path} has CR`);
  }
  rmSync(f.base, { recursive: true, force: true });
});

test('compiles the claude-plugins site under /plugins, generated server pages included', () => {
  const f = fixture();
  syncSources(f);
  const out = tree(f.docsDir);

  assert.match(out['plugins/index.mdx'], /link: \/plugins\/get-started\/install\//);
  assert.match(out['plugins/index.mdx'], /\(\/plugins\/reference\/comparison\/\)/);
  assert.match(out['plugins/get-started/install.md'], /\(\/plugins\/servers\/wet\/setup\/\)/,
    'links into generated sections are prefixed too');
  assert.match(out['plugins/get-started/install.md'], /\(\/skret\/guide\/sync\/\)/, 'links to other portal sections stay');
  assert.match(out['plugins/get-started/install.md'], /\(\/tools\/wet\/\)/, 'portal tool cards stay');
  assert.match(out['plugins/servers/wet/setup.md'], /\(\/plugins\/get-started\/install\/\)/);
  assert.match(out['plugins/servers/index.md'], /\(\/plugins\/reference\/comparison\/\)/);
  assert.doesNotMatch(out['plugins/index.mdx'], /image:|logo/);
  assert.match(out['plugins/index.mdx'], /\nhero:\n  tagline: Servers\.\n  actions:\n/);
  rmSync(f.base, { recursive: true, force: true });
});

test('claude-plugins pages edit their source; generated pages keep what the generator set', () => {
  const f = fixture();
  syncSources(f);
  const out = tree(f.docsDir);

  assert.match(out['plugins/get-started/install.md'],
    /\neditUrl: https:\/\/github\.com\/n24q02m\/claude-plugins\/edit\/main\/docs\/src\/content\/docs\/get-started\/install\.md\n---\n/);
  assert.match(out['plugins/servers/wet/setup.md'],
    /\neditUrl: https:\/\/github\.com\/n24q02m\/claude-plugins\/edit\/main\/plugins\/wet\/setup\.md\n/);
  assert.equal(out['plugins/servers/wet/setup.md'].match(/editUrl:/g).length, 1);
  // A synthesized landing page has no file to edit, so it gets no editUrl.
  assert.doesNotMatch(out['plugins/servers/index.md'], /editUrl:/);
  rmSync(f.base, { recursive: true, force: true });
});

test('ignores the portal copies an older claude-plugins checkout still holds', () => {
  const f = fixture();
  const content = join(f.pluginsDir, 'docs/src/content/docs');
  write(content, 'tools/wet.md', '---\ntitle: Stale tool card\n---\n');
  write(content, 'skret/guide/sync.md', '---\ntitle: Stale skret copy\n---\n');
  const counts = syncSources(f);
  const out = tree(f.docsDir);

  assert.equal(counts.plugins, 5);
  assert.ok(!Object.keys(out).some((rel) => /^plugins\/(tools|skret)\//.test(rel)));
  assert.match(out['plugins/get-started/install.md'], /\(\/skret\/guide\/sync\/\), read \[the wet card\]\(\/tools\/wet\/\)/);
  rmSync(f.base, { recursive: true, force: true });
});

test('a failing claude-plugins generator stops the build before the generated tree changes', () => {
  const f = fixture();
  syncSources(f);
  const before = tree(f.docsDir);
  write(f.pluginsDir, 'docs/scripts/sync-plugin-docs.mjs', generator(3));

  assert.throws(() => syncSources(f), /claude-plugins server-page generator failed/);
  assert.deepEqual(tree(f.docsDir), before);
  rmSync(f.base, { recursive: true, force: true });
});

test('portal-only pages may sit under plugins/ too', () => {
  const f = fixture();
  write(f.overlayDir, 'plugins/extra.md', '---\ntitle: Extra\n---\n');
  assert.deepEqual(syncSources(f), { skret: 7, plugins: 5, overlay: 2 });

  write(f.overlayDir, 'plugins/servers/wet/setup.md', '---\ntitle: Shadow\n---\n');
  assert.throws(() => syncSources(f), /plugins\/servers\/wet\/setup\.md.*both/);
  rmSync(f.base, { recursive: true, force: true });
});
