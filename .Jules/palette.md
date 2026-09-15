## 2023-10-27 - Converting Markdown Lists to Interactive Card Grids
**Learning:** Standard markdown lists in Starlight docs can be difficult to tap on mobile and lack visual emphasis for primary next steps.
**Action:** When appropriate for primary navigation blocks (like "Where to go next" or "Continue with"), convert them to Astro Starlight `<CardGrid>` and `<LinkCard>` components. Remember to rename the file extension from `.md` to `.mdx` to support the component imports.
