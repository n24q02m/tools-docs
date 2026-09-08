import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tools.n24q02m.com',
  integrations: [
    starlight({
      title: 'n24q02m tools',
      description: 'Docs for skret, better-semantic-release and better-drive',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/n24q02m' }],
      sidebar: [
        { label: 'Get started', slug: 'get-started/overview' },
        { label: 'skret', collapsed: false, items: [
          { label: 'Overview', slug: 'skret/overview' },
          { label: 'Install', slug: 'skret/install' },
          { label: 'Secrets workflow', slug: 'skret/secrets' },
          { label: 'Reference links', slug: 'skret/reference' },
          { label: 'Commands', slug: 'skret/commands' },
          { label: 'Providers', slug: 'skret/providers' },
          { label: 'Error codes', slug: 'skret/errors' },
        ]},
        { label: 'better-semantic-release', collapsed: false, items: [
          { label: 'Overview', slug: 'bsr/overview' },
          { label: 'Action pinning', slug: 'bsr/pinning' },
          { label: 'Action-pin registry', slug: 'bsr/registry' },
          { label: 'Release channels', slug: 'bsr/channels' },
        ]},
        { label: 'better-drive', collapsed: false, items: [
          { label: 'Overview', slug: 'bdrive/overview' },
          { label: 'Install', slug: 'bdrive/install' },
          { label: 'Sync & restore', slug: 'bdrive/sync-restore' },
        ]},
        { label: 'Tool matrix', slug: 'reference/tool-matrix' },
      ],
    }),
    sitemap(),
  ],
});
