## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.
## 2025-03-05 - Enhance Next Steps Navigation Hit Areas
**Learning:** Standard markdown lists on index/overview pages offer small click targets for primary navigational actions ("Where to go next" or "Continue with...").
**Action:** Use Starlight's `<CardGrid>` and `<LinkCard>` components instead of standard markdown lists for these sections. This provides larger hit areas and better UX. Ensure the file extension is `.mdx` to allow component imports from `@astrojs/starlight/components`.
## 2025-03-05 - Enhance Setup Guides with Tabs and Steps
**Learning:** Standard markdown sections for OS-specific setup commands and numbered lists create unnecessary vertical scrolling and visual clutter for users looking for instructions specific to their environment.
**Action:** For instructional content in Starlight, use the `<Steps>` component for multi-step setup guides (instead of standard numbered lists) and `<Tabs>`/`<TabItem>` components to group OS/environment-specific commands to reduce visual clutter. This requires changing the file extension to `.mdx`.
