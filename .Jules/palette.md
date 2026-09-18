## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.
## 2025-03-05 - CardGrid and LinkCard for Navigation
**Learning:** Standard markdown lists in overview pages offer small hit areas and sub-optimal navigation UX for users on mobile or with motor impairments.
**Action:** Convert index/overview files from `.md` to `.mdx` and replace "Where to go next" lists with Starlight's `<CardGrid>` and `<LinkCard>` components to provide larger, more accessible click targets.
