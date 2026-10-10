## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.
## 2025-03-05 - Enhance Next Steps Navigation Hit Areas
**Learning:** Standard markdown lists on index/overview pages offer small click targets for primary navigational actions ("Where to go next" or "Continue with...").
**Action:** Use Starlight's `<CardGrid>` and `<LinkCard>` components instead of standard markdown lists for these sections. This provides larger hit areas and better UX. Ensure the file extension is `.mdx` to allow component imports from `@astrojs/starlight/components`.
## 2025-03-05 - Use Tabs and Steps for Setup Guides
**Learning:** Grouping OS-specific commands reduces visual clutter, and using dedicated Step components improves the visual hierarchy of sequential instructions over standard numbered lists.
**Action:** Use Starlight's `<Tabs>`, `<TabItem>`, and `<Steps>` components for instructional content, changing file extensions to `.mdx` where necessary.
## 2025-03-05 - Do Not Use Starlight Steps for Non-Sequential Lists
**Learning:** Starlight's `<Steps>` component is designed strictly for sequential instructions or multi-step setup guides. Using it to wrap non-sequential lists (like a list of features, tools, or jobs) is semantically incorrect and creates an accessibility regression.
**Action:** Remove `<Steps>` component usage for non-sequential lists and revert to standard unordered markdown lists.
