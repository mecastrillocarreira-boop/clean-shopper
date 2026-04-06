---
name: design-system-generator
description: Guides designers through a structured brand interview to establish visual foundations before development begins. Use when starting a new project or establishing a design system. Produces an HTML visual style guide and a markdown design token spec at /docs/design-system.md. Updates CLAUDE.md with a reference to the spec after generation.
---

# Design System Generator Skill

This tool guides designers through a structured brand interview to establish visual foundations before development begins. The workflow produces two outputs:

1. **HTML Visual Style Guide** (`design-system-visual.html`) — A browser-viewable reference showing color swatches with hex values, rendered typography at each scale size, spacing blocks, border radius examples, and shadow demonstrations.

2. **Markdown Specification** (`/docs/design-system.md`) — A precise, structured document that Claude Code reads during development sessions to apply design tokens consistently.

## Interview Process

The specialist asks five question sections sequentially:
- Brand personality (three to five descriptive words plus comparative references)
- Color system (primary, secondary, accent colors with intended communication)
- Typography (typeface selection and scale definition)
- Spacing density (layout tightness or openness)
- Reference products (visual style examples to emulate)
- Design constraints (accessibility, platform rules, brand assets)

Each section waits for complete answers before advancing—no questions are batched together.

## Output Structure

The markdown spec follows a standardized format with tables for each token category: colors (primary, secondary, accent, semantic, neutral), typography scale, spacing scale, border radius, and shadows. Each entry includes the token name, value, and specific usage rules.

Critical principle: "Never hardcode a hex value. Use the token name from tailwind.config.js."

## Integration

After generation, CLAUDE.md is updated with a reference to the design system spec, ensuring future Claude Code sessions apply these tokens automatically.
