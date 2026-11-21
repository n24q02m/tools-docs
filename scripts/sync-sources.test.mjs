import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
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
    for (const name of readdirSync(dir).sort()) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else files[path.slice(root.length + 1).replace(/\\/g, '/')] = readFileSync(path, 'utf8');
    }
  };
  walk(root);
  return files;
}

function fixture() {
  const base = mkdtempSync(join(tmpdir(), 'sync-sources-'));
  const skretDir = join(base, 'skret');
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

  write(overlayDir, 'skret/overview.md', '---\r\ntitle: Overview\r\n---\r\n\r\nPortal page.\r\n');

  return { base, skretDir, docsDir, overlayDir };
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
  assert.deepEqual(counts, { skret: 7, overlay: 2 });
  assert.equal(readFileSync(join(f.docsDir, 'skret/overview.md'), 'utf8'), '---\ntitle: Overview\n---\n\nPortal page.\n');
  assert.deepEqual(readFileSync(join(f.docsDir, 'skret/diagram.png')), LOGO);

  write(f.overlayDir, 'skret/faq.md', '---\ntitle: Shadow\n---\n');
  assert.throws(() => syncSources(f), /skret\/faq\.md.*both/);
  rmSync(f.base, { recursive: true, force: true });
});

test('refuses an overlay page outside the compiled section', () => {
  const f = fixture();
  write(f.overlayDir, 'plugins/index.md', '---\ntitle: Elsewhere\n---\n');

  assert.throws(() => syncSources(f), /plugins\/index\.md.*outside skret\//);
  rmSync(f.base, { recursive: true, force: true });
});

test('runs without an overlay directory', () => {
  const f = fixture();
  rmSync(f.overlayDir, { recursive: true, force: true });

  assert.deepEqual(syncSources(f), { skret: 7, overlay: 0 });
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

test('main reads the sibling skret checkout unless SKRET_DIR is set', () => {
  const f = fixture();
  const site = join(f.base, 'site');
  main(site, {});
  assert.match(readFileSync(join(f.docsDir, 'skret/faq.md'), 'utf8'), /\(\/skret\/guide\/sync\/#prune\)/);

  const moved = join(f.base, 'elsewhere');
  write(moved, 'docs/src/content/docs/only.md', '---\ntitle: Only\n---\n');
  main(site, { SKRET_DIR: moved });
  assert.deepEqual(Object.keys(tree(f.docsDir)), ['skret/only.md', 'skret/overview.md']);
  rmSync(f.base, { recursive: true, force: true });
});

test('a missing source fails before the generated tree is touched', () => {
  const f = fixture();
  syncSources(f);
  const before = tree(f.docsDir);

  assert.throws(() => syncSources({ ...f, skretDir: join(f.base, 'nope') }), /skret.*not found.*SKRET_DIR/s);
  assert.deepEqual(tree(f.docsDir), before);

  const run = spawnSync(process.execPath, [script], {
    env: { ...process.env, SKRET_DIR: join(f.base, 'nope') },
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
