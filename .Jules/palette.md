## 2025-03-05 - Enhance Hero Actions Accessibility and Visual Hierarchy
**Learning:** Starlight Hero component allows customizing variants `primary`, `secondary`, `minimal` and inserting arbitrary attributes to links via the `attrs` property in frontmatter.
**Action:** Use `attrs` property (like `attrs: aria-label: ...`) to add ARIA labels to Starlight links for screen readers, and employ `minimal` variant to establish visual hierarchy without custom CSS.

## 2025-03-05 - CardGrid and LinkCard for Next Steps
**Learning:** Standard markdown lists for "Where to go next" or "Continue with..." links offer small hit areas and low visual prominence. Starlight's `<CardGrid>` and `<LinkCard>` components provide a much better UX with larger clickable areas, clear hover states, and better visual chunking.
**Action:** When creating index/overview pages, use `.mdx` instead of `.md` to import and utilize `<CardGrid>` and `<LinkCard>` from `@astrojs/starlight/components` for lists of next-step links instead of standard markdown unordered lists.
