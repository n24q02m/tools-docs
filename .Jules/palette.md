## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.

## 2025-03-05 - Enhance navigation with Starlight CardGrid
**Learning:** Using Starlight's `<CardGrid>` and `<LinkCard>` components instead of standard markdown lists for "Where to go next" or "Continue with..." sections provides larger hit areas and better UX.
**Action:** When converting lists to Starlight cards, change the file extension from `.md` to `.mdx` to allow component imports from `@astrojs/starlight/components`.
