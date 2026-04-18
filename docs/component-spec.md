-guest# Clean Shopper — Component Specification
**Version:** 1.0
**Date:** 2026-04-07

All visual values reference tokens from `tailwind.config.js`. Never hardcode hex colors, pixel sizes, or spacing values in component implementations — use the Tailwind theme classes listed here.

---

## Table of Contents
1. [Button](#button)
2. [InputField](#inputfield)
3. [SearchBar](#searchbar)
4. [SafetyBadge](#safetybadge)
5. [CategoryTag](#categorytag)
6. [ProductCard](#productcard)
7. [NavBar](#navbar)
8. [EmptyState](#emptystate)

---

## Button

**Purpose:** Triggers a single primary or secondary action; the most-used interactive element across the app.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | Yes | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | No (default: `'md'`) | Controls padding and font size |
| `children` | `ReactNode` | Yes | Button label |
| `onClick` | `() => void` | No | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | No (default: `'button'`) | HTML button type |
| `disabled` | `boolean` | No (default: `false`) | Disables interaction |
| `loading` | `boolean` | No (default: `false`) | Shows spinner, disables interaction |
| `fullWidth` | `boolean` | No (default: `false`) | Stretches to fill container width |

### Visual Structure

**Primary**
```
bg-primary-500 text-neutral-0 font-semibold rounded-md shadow-sm
px-6 py-3 (md) | px-4 py-2 text-sm (sm) | px-8 py-4 text-lg (lg)
```

**Secondary**
```
bg-secondary-500 text-neutral-0 font-semibold rounded-md shadow-sm
px-6 py-3 (md) | px-4 py-2 text-sm (sm) | px-8 py-4 text-lg (lg)
```

**Ghost**
```
bg-transparent text-primary-500 font-semibold rounded-md border border-primary-200
px-6 py-3 (md) — same size scale as above
```

### States

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Default | `bg-primary-500` | `bg-secondary-500` | `bg-transparent border-primary-200` |
| Hover | `bg-primary-600` | `bg-secondary-600` | `bg-primary-50 border-primary-300` |
| Pressed | `bg-primary-700` | `bg-secondary-700` | `bg-primary-100` |
| Disabled | `bg-primary-300 cursor-not-allowed opacity-60` | `bg-secondary-300 cursor-not-allowed opacity-60` | `opacity-40 cursor-not-allowed` |
| Loading | Same as disabled + spinner icon replacing or preceding label text |

### Usage Rules

- Use **primary** for the single most important action on a view (e.g., Run Search, Save Product).
- Use **secondary** for supporting CTAs that appear alongside a primary button.
- Use **ghost** for low-emphasis actions like Cancel or Clear.
- Never place two primary buttons side-by-side. If two actions are equal weight, make one secondary.
- Do not use Button for navigation — use NavBar links instead.

---

## InputField

**Purpose:** A labeled single-line text input for structured data entry, used in preference settings and any form context.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Links label to input via `htmlFor` |
| `label` | `string` | Yes | Visible label text above the input |
| `value` | `string` | Yes | Controlled value |
| `onChange` | `(value: string) => void` | Yes | Change handler |
| `placeholder` | `string` | No | Placeholder text |
| `helperText` | `string` | No | Supporting text below the input |
| `errorMessage` | `string` | No | Replaces helperText when in error state |
| `disabled` | `boolean` | No (default: `false`) | Disables interaction |
| `type` | `'text' \| 'email' \| 'url' \| 'password'` | No (default: `'text'`) | HTML input type |

### Visual Structure

```
// Label
<label> text-sm font-medium text-neutral-700 mb-1

// Input
<input>
  w-full px-4 py-3 rounded-md border border-neutral-200 bg-neutral-100
  text-base text-neutral-900 placeholder:text-neutral-400
  shadow-sm

// Helper text
<p> text-sm text-neutral-500 mt-1

// Error message (replaces helper text)
<p> text-sm text-error-500 mt-1
```

### States

| State | Input border | Input background |
|---|---|---|
| Default | `border-neutral-200` | `bg-neutral-100` |
| Focus | `border-primary-500 ring-2 ring-primary-100` | `bg-neutral-0` |
| Error | `border-error-500 ring-2 ring-error-100` | `bg-error-100` |
| Disabled | `border-neutral-300 cursor-not-allowed` | `bg-neutral-100 opacity-60` |

### Usage Rules

- Always include a visible `label` — do not rely on placeholder as a label.
- Use `helperText` to describe expected format or constraints (e.g., "Separate multiple entries with a comma").
- Switch to `errorMessage` only when there is a specific, actionable error to communicate.
- Use SearchBar instead of InputField when the action is search.

---

## SearchBar

**Purpose:** The primary product search input; combines a text field with a submit action and surfaces AI-powered search intent.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | Yes | Controlled query value |
| `onChange` | `(value: string) => void` | Yes | Change handler |
| `onSubmit` | `() => void` | Yes | Called when the user submits a search |
| `placeholder` | `string` | No | Placeholder text (default: `"Search for a product..."`) |
| `loading` | `boolean` | No (default: `false`) | Shows loading state while AI query runs |
| `disabled` | `boolean` | No (default: `false`) | Disables input and submit |

### Visual Structure

```
// Wrapper
<div> w-full flex items-center gap-2 bg-neutral-0 rounded-xl border border-neutral-200 shadow-md px-4 py-3

// Search icon (left)
text-neutral-400 flex-shrink-0

// Input
<input>
  flex-1 text-base text-neutral-900 placeholder:text-neutral-400 bg-transparent
  focus:outline-none

// Submit button (right) — uses Button primary sm
<Button variant="primary" size="sm" loading={loading}>Search</Button>
```

### States

| State | Wrapper border | Wrapper shadow |
|---|---|---|
| Default | `border-neutral-200` | `shadow-md` |
| Focus (input active) | `border-primary-500 ring-2 ring-primary-100` | `shadow-md` |
| Loading | Input disabled, spinner on submit button | `shadow-md` |
| Disabled | `border-neutral-300 opacity-60` | `shadow-sm` |

### Usage Rules

- There is one SearchBar per view — do not render multiple SearchBars on the same screen.
- Use SearchBar (not InputField) for any free-text product or ingredient query.
- The submit button uses the `Button` component internally — do not re-implement the button.
- Loading state must be shown whenever an AI or API call is in flight from this input.

---

## SafetyBadge

**Purpose:** Communicates a product's clean/caution/not-clean assessment at a glance using a color-coded label drawn from semantic tokens.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `status` | `'clean' \| 'caution' \| 'not-clean' \| 'unknown'` | Yes | Drives color and label |
| `label` | `string` | No | Override the default label text |
| `size` | `'sm' \| 'md'` | No (default: `'md'`) | Controls padding and font size |
| `variant` | `'default' \| 'outline'` | No (default: `'default'`) | `default` uses semantic background colors; `outline` uses no background, `border-neutral-300`, `text-neutral-600` |

### Default Labels by Status

| Status | Default label |
|---|---|
| `clean` | Clean |
| `caution` | Caution |
| `not-clean` | Not Clean |
| `unknown` | Unknown |

### Visual Structure

```
// Wrapper pill
<span>
  inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap

  // sm:  px-2 py-0.5 text-xs
  // md:  px-3 py-1  text-sm

// variant="default" — status → token mapping
clean:     bg-success-100 text-success-500    dot: bg-success-500
caution:   bg-warning-100 text-warning-500    dot: bg-warning-500
not-clean: bg-error-100   text-error-500      dot: bg-error-500
unknown:   bg-neutral-100 text-neutral-500    dot: bg-neutral-400

// variant="outline" — all statuses share
wrapper: border border-neutral-300 text-neutral-600    dot: bg-neutral-400

// Dot (6px circle, always present)
<span> w-1.5 h-1.5 rounded-full [color from above]
```

### States

SafetyBadge is display-only — no interactive states. The `status` prop drives all visual variation.

### Usage Rules

- Always render SafetyBadge on every ProductCard — never omit it, even for `unknown` status.
- Do not use SafetyBadge for anything other than ingredient safety assessment results.
- Use `size="sm"` inside ProductCard; use `size="md"` (default) on the product detail page.
- Never override the semantic token colors — clean must be green, caution must be amber, not-clean must be red.

---

## CategoryTag

**Purpose:** A small pill label that identifies a product's category (e.g., Shampoo, Cleaner, Moisturizer) or a certification (e.g., EWG Verified).

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Tag text |
| `variant` | `'category' \| 'certification' \| 'outline'` | No (default: `'category'`) | Drives color — category uses accent, certification uses primary, outline uses no background with neutral border |
| `onRemove` | `() => void` | No | If provided, renders an × remove button inside the tag |

### Visual Structure

```
// Wrapper pill
<span>
  inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium

  category:      bg-accent-100 text-accent-800
  certification: bg-primary-100 text-primary-800
  outline:       border border-neutral-300 text-neutral-600

// Remove button (only when onRemove is provided)
<button> ml-1 text-current opacity-60 hover:opacity-100 focus:outline-none
  × character or small icon
```

### States

| State | Description |
|---|---|
| Default | Static pill, no interaction |
| Removable (onRemove present) | × button appears; button has hover opacity transition |

### Usage Rules

- Use `variant="category"` for product categories (Shampoo, Lotion, etc.).
- Use `variant="certification"` for certifications (EWG Verified, USDA Organic, B Corp).
- Use `onRemove` only in editable contexts like Preference Settings — not on read-only ProductCards.
- Do not use CategoryTag to show safety status — use SafetyBadge for that purpose.

---

## ProductCard

**Purpose:** Displays a single product with its name, brand, safety assessment, category, and actions (save to library).

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `productName` | `string` | Yes | Product display name |
| `brand` | `string` | Yes | Brand name |
| `category` | `string` | Yes | Product category label |
| `safetyStatus` | `'clean' \| 'caution' \| 'not-clean' \| 'unknown'` | Yes | Passed to SafetyBadge |
| `summary` | `string` | No | One- or two-sentence AI-generated assessment summary |
| `isSaved` | `boolean` | No (default: `false`) | Controls saved/unsaved state of the save action |
| `onSave` | `() => void` | No | Called when the user saves/unsaves the product |
| `onClick` | `() => void` | No | Called when the card body is clicked (opens detail view) |

### Visual Structure

```
// Card wrapper
<div>
  bg-neutral-0 rounded-lg shadow-md p-6
  flex flex-col h-full
  cursor-pointer (when onClick provided) hover:shadow-lg transition-shadow

  // Main content — grows to push action row to bottom
  <div> flex flex-col gap-3 flex-1

    // Top row: name + brand (stacked left) + SafetyBadge (right)
    <div> flex items-start justify-between gap-2 mb-4
      <div> flex flex-col gap-0.5
        <h3> text-lg font-medium text-neutral-900   — product name
        <span> text-sm text-neutral-500             — brand name
      <SafetyBadge status={safetyStatus} size="sm" />

    // Category tag row
    <div>
      <CategoryTag label={category} variant="outline" />

    // Summary (optional)
    <p> text-sm text-neutral-600 line-clamp-2

  // Action row — always pinned to bottom, buttons right-aligned
  <div> flex items-center justify-end gap-2 mt-4 pt-2 border-t border-neutral-200
    <Button variant="ghost" size="sm" onClick={onSave}>
      {isSaved ? 'Saved' : 'Save'}
```

### States

| State | Description |
|---|---|
| Default | Full card with all content |
| Saved (`isSaved=true`) | Save button reads "Saved" with `text-primary-500` |
| Hover | `shadow-lg` transition when `onClick` is provided |
| Loading | Render skeleton: `bg-neutral-100 animate-pulse rounded-lg` blocks in place of text and badges |

### Usage Rules

- Use ProductCard in: Search results, Saved Library, Shopping List.
- Always render SafetyBadge — pass `status="unknown"` when assessment is pending, not absent.
- If `onSave` is not provided (e.g., read-only contexts), omit the action row.
- Do not inline product detail content into ProductCard — use a separate detail view triggered by `onClick`.
- For loading skeleton states, render a fixed-height `bg-neutral-100 animate-pulse rounded-lg` block at the same card dimensions — do not render a partial card.

---

## NavBar

**Purpose:** Persistent top navigation linking the four main views: Browse, Library, Shopping List, and Preferences. Also renders a Sign Out button when the user is authenticated.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `activeView` | `'browse' \| 'library' \| 'list' \| 'preferences'` | Yes | Highlights the current view's nav item |
| `onNavigate` | `(view: string) => void` | Yes | Called when a nav item is clicked |
| `onSignOut` | `() => void` | No | When provided, renders a Sign Out button at the end of the nav row; omit on auth pages |

### Visual Structure

```
// Outer bar
<nav>
  w-full bg-neutral-0 border-b border-neutral-200 shadow-sm
  px-6 py-4 flex items-center justify-between

// Logo / wordmark (left)
<span> text-xl font-bold text-primary-900

// Nav links (right)
<ul> flex items-center gap-6

// Each nav item
<li>
  <button>
    text-sm font-medium
    default:  text-neutral-500 hover:text-primary-500
    active:   text-primary-500 border-b-2 border-primary-500 pb-1

// Sign Out button (rightmost, only when onSignOut prop is provided)
<button>
  text-sm font-medium text-neutral-500 hover:text-error-500
```

### States

| State | Description |
|---|---|
| Default | `text-neutral-500` label |
| Hover | `text-primary-500` transition |
| Active (current view) | `text-primary-500 border-b-2 border-primary-500` underline |

### Usage Rules

- NavBar renders once at the top of the app shell — do not render it inside individual views.
- The active state is controlled by the parent via `activeView` — NavBar does not manage its own routing state.
- Do not add icons to nav items in V1 — text labels only.
- Do not add secondary navigation or dropdowns to NavBar in V1.
- Auth pages do not render NavBar at all — pass `onSignOut` only from the authenticated app shell.

---

## EmptyState

**Purpose:** Fills a zero-content view with a message and optional action, preventing blank screens in the Library, Shopping List, and Search results.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `heading` | `string` | Yes | Primary message (e.g., "Your library is empty") |
| `body` | `string` | No | Supporting sentence explaining what to do next |
| `actionLabel` | `string` | No | CTA button label |
| `onAction` | `() => void` | No | Called when the CTA is clicked; required if `actionLabel` is provided |
| `icon` | `ReactNode` | No | Optional illustration or icon rendered above the heading |

### Visual Structure

```
// Wrapper
<div>
  flex flex-col items-center justify-center gap-4 py-20 px-6 text-center

// Icon slot (optional)
<div> w-16 h-16 text-neutral-300   — render icon at this size

// Heading
<h3> text-xl font-semibold text-neutral-700

// Body
<p> text-base text-neutral-500 max-w-sm

// Action button (optional)
<Button variant="primary" size="md" onClick={onAction}>
  {actionLabel}
```

### States

EmptyState has one visual state. Presence of `icon`, `body`, and `actionLabel` controls which slots render.

### Usage Rules

- Use EmptyState whenever a list or grid has zero items to display.
- Always provide a `heading`. Provide `body` and `actionLabel` whenever there is a clear next action the user can take (e.g., "Search for a product" → navigate to Search).
- Do not show EmptyState while data is loading — show skeleton cards or a loading spinner instead.
- Do not use EmptyState for error states — use an error message with retry action instead.

---

*This spec covers the V1 component library. Add new components here before building them. Check this document before creating any new component — prefer extending an existing component to adding a new one.*
