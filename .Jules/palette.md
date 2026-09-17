## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.
## 2025-03-05 - Enhance Navigational Hit Areas
**Learning:** Standard markdown lists for "Where to go next" or "Continue with..." sections have small hit areas, which are poor for usability and accessibility.
**Action:** Convert to Starlight's `<CardGrid>` and `<LinkCard>` to provide larger, more clickable targets, ensuring the file extension is `.mdx` for component imports.
