import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }, // Pre-load linked pages in the background
  site: 'https://docs.n24q02m.com',
  integrations: [
    starlight({
      title: 'n24q02m tools',
      description: 'Docs for skret, the MCP plugin stack, hull, and better-semantic-release (better-drive archived)',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/n24q02m' }],
      sidebar: [
        { label: 'Get started', slug: 'get-started/overview' },
        { label: 'skret', collapsed: false, items: [
          { label: 'Overview', slug: 'skret/overview' },
          { label: 'Guide', collapsed: true, items: [{ autogenerate: { directory: 'skret/guide' } }] },
          { label: 'Providers', collapsed: true, items: [{ autogenerate: { directory: 'skret/providers' } }] },
          { label: 'Integrations', collapsed: true, items: [{ autogenerate: { directory: 'skret/integrations' } }] },
          { label: 'Migration', collapsed: true, items: [{ autogenerate: { directory: 'skret/migration' } }] },
          { label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'skret/reference' } }] },
          { label: 'Contributing', collapsed: true, items: [{ autogenerate: { directory: 'skret/contributing' } }] },
          { label: 'FAQ', slug: 'skret/faq' },
        ]},
        { label: 'Plugins & MCP hub', collapsed: true, items: [
          { label: 'Get started', collapsed: true, items: [{ autogenerate: { directory: 'plugins/get-started' } }] },
          { label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'plugins/reference' } }] },
        ]},
        { label: 'sillstone', slug: 'sillstone/overview' },
        { label: 'fastretrieval', slug: 'fastretrieval/overview' },
        { label: 'hull', slug: 'hull/overview' },
        { label: 'MCP & CLI Tools', collapsed: false, items: [
          { label: 'wet', slug: 'tools/wet' },
          { label: 'mnemo', slug: 'tools/mnemo' },
          { label: 'crg', slug: 'tools/crg' },
          { label: 'telegram', slug: 'tools/telegram' },
          { label: 'email', slug: 'tools/email' },
          { label: 'notion', slug: 'tools/notion' },
          { label: 'workspace', slug: 'tools/workspace' },
        ]},
        { label: 'better-semantic-release', collapsed: false, items: [
          { label: 'Overview', slug: 'bsr/overview' },
          { label: 'Install & usage', slug: 'bsr/install' },
          { label: 'Action pinning', slug: 'bsr/pinning' },
          { label: 'Action-pin registry', slug: 'bsr/registry' },
          { label: 'Release channels', slug: 'bsr/channels' },
        ]},
        { label: 'Archived', collapsed: true, items: [
          { label: 'better-drive', badge: { text: 'Archived', variant: 'danger' }, collapsed: true, items: [
            { label: 'Overview', slug: 'bdrive/overview' },
            { label: 'Install', slug: 'bdrive/install' },
            { label: 'Sync & restore', slug: 'bdrive/sync-restore' },
          ]},
        ]},
        { label: 'Tool matrix', slug: 'reference/tool-matrix' },
      ],
    }),
    sitemap(),
  ],
});
