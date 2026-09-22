## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.
## 2025-03-05 - Enhance Next Steps Navigation Hit Areas
**Learning:** Standard markdown lists on index/overview pages offer small click targets for primary navigational actions ("Where to go next" or "Continue with...").
**Action:** Use Starlight's `<CardGrid>` and `<LinkCard>` components instead of standard markdown lists for these sections. This provides larger hit areas and better UX. Ensure the file extension is `.mdx` to allow component imports from `@astrojs/starlight/components`.
## 2025-03-05 - Enhance Installation Guides with Tabs and Steps
**Learning:** Presenting multiple OS-specific installation commands sequentially in markdown creates visual clutter and forces users to scan past irrelevant instructions. Furthermore, standard numbered lists for multi-step setup guides lack visual prominence and clear progression cues.
**Action:** When documenting installation instructions for multiple platforms, use Starlight's `<Tabs>` and `<TabItem>` components to group commands by OS/environment. For multi-step setup guides, use the `<Steps>` component to provide a clear, instructional visual hierarchy. Ensure the file extension is `.mdx` to allow component imports from `@astrojs/starlight/components`.
