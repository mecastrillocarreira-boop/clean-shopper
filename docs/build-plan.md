# Clean Shopper — Build Plan

Build phase by phase in order. Do not start a phase until the previous one is complete. Do not add features outside the current phase without asking first.

---

## Phase 1 — Foundation ✅ Complete
Design system, component library, and browse screen with live data.

- [x] Design system (tokens, typography, spacing, color) in `tailwind.config.js` and `docs/design-system.md`
- [x] Design system visual preview (`design-system-visual.html`)
- [x] All shared components built: Button, InputField, SearchBar, SafetyBadge, CategoryTag, ProductCard, NavBar, EmptyState
- [x] Supabase project set up, `products` table created, 20 seed products inserted
- [x] `BrowsePage` — fetches products from Supabase, client-side search + category filtering, skeleton loading, EmptyState on zero results
- [x] App shell (`App.jsx`) with view-state routing

---

## Phase 2 — Auth ✅ Complete
User sign-up and sign-in via Supabase Auth.

- [x] `SignInPage` — email + password, error handling
- [x] `SignUpPage` — email + password, confirmation message on success
- [x] Session gating in `App.jsx` — loading state, unauthenticated state, authenticated state
- [x] Sign Out button in NavBar

---

## Phase 3 — AI Ingredient Analysis 🔜 Next
Connect to the Claude API to generate safety assessments for products.

- [ ] Add `safetyStatus` column to Supabase `products` table (values: `clean | caution | not-clean | unknown`)
- [ ] Create `src/lib/api/analysis.js` — calls Claude API (`claude-sonnet-4-20250514`) with product name + ingredient list, returns structured safety assessment
- [ ] Wire assessment results into ProductCard SafetyBadge (replacing hardcoded `unknown`)
- [ ] Decide: generate assessments on demand (per product click) or batch on page load?

---

## Phase 4 — Library
Save products to a personal library, organised by category.

- [ ] Add `saved_products` table to Supabase (columns: id, user_id, product_id, saved_at)
- [ ] `isSaved` state on ProductCard driven by Supabase query
- [ ] Save/unsave toggle persists to Supabase
- [ ] Build `LibraryPage` — shows saved products grouped by category, EmptyState when nothing saved
- [ ] Wire Library nav link in App.jsx

---

## Phase 5 — Shopping List
Add saved products to a persistent shopping list.

- [ ] Add `shopping_list` table to Supabase (columns: id, user_id, product_id, added_at)
- [ ] `isInList` state on ProductCard driven by Supabase query
- [ ] Add/remove from list persists to Supabase
- [ ] Build `ShoppingListPage` — shows list items, remove action, EmptyState when empty
- [ ] Wire Shopping List nav link in App.jsx

---

## Phase 6 — Product Detail
Full product view with ingredient breakdown and AI reasoning.

- [ ] Build `ProductDetailPage` under `/src/features/product/`
- [ ] Triggered by clicking a ProductCard (currently just logs to console)
- [ ] Shows full product info, ingredient list, AI safety reasoning, save + list actions

---

## Phase 7 — Preferences
User-controlled filters applied to product recommendations.

- [ ] Build `PreferencesPage` — ingredients to avoid, trusted brands, certifications (EWG Verified, USDA Organic, B Corp)
- [ ] Persist preferences to Supabase
- [ ] Apply preferences to AI analysis prompts in Phase 3

---

## Deferred / Out of Scope for V1
- EWG Skin Deep API integration (ingredient safety data source — evaluate after Phase 3)
- Product comparison feature
- Barcode scanning
- Mobile app
- Checkout or retailer integrations
