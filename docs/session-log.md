# Clean Shopper — Session Log

## Session — 2026-04-11

### What we built or changed
- **Supabase integration:** installed `@supabase/supabase-js`, created `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, created `src/lib/supabase.js` client, created `.env.example` as a safe committed placeholder
- **20 seed products** inserted into Supabase across Personal Care (6), Home Cleaning (6), Baby Care (4), Kitchen (4) — real brands, real product names, clean-focused descriptions
- **`src/lib/api/products.js`** — `fetchProducts()` queries the `products` table; `searchProducts()` was added then removed when the architecture changed
- **BrowsePage refactored** to fetch live data from Supabase on mount, replacing static `browse-data.js`; shows 6 animated skeleton cards during load
- **SearchBar component** built (`src/components/SearchBar.jsx`) — controlled input, inline SVG magnifying glass icon, focus ring state, live filtering on `onChange`; submit button was initially primary → changed to ghost → replaced entirely with a clear (×) button that only appears when input has a value
- **EmptyState component** built (`src/components/EmptyState.jsx`) — optional icon slot, heading, body, action button
- **Search integrated into BrowsePage** — search query state added, client-side filtering across `name`, `brand`, `description`; search + category filters combine; EmptyState shown on zero results
- **NavBar updated** — removed 'Search' nav item, added 'Browse', Browse is now first and default
- **App.jsx cleaned up** — removed SearchPage routing, default activeView is 'browse'
- **SearchPage deleted** — `src/features/search/` directory removed entirely after search was merged into BrowsePage

### Decisions made
- **Client-side search filtering, not Supabase queries on keystroke:** All 20 products are fetched once on mount; filtering happens in JS. Reasoning: avoids debouncing complexity and network latency for a small dataset. If the product count grows significantly, revisit with a debounced Supabase `.ilike()` query.
- **Search merged into BrowsePage, not a separate page:** User explicitly requested this — no separate Search nav item or page. The search bar lives between the page header and the category filter pills.
- **Clear button instead of Submit button:** User decided there's no need for a search button since filtering is live on every keystroke. The × button only appears when the input has a value, giving users a quick way to reset.
- **Supabase table was named 'Products table' (with capital P and space):** The user renamed it to `products` in the Supabase dashboard. All code uses `products`. The unusual original name was a Supabase UI artifact — worth noting if they create new tables.
- **`safetyStatus` is hardcoded to `'unknown'` on all ProductCards:** The `products` table has no safety assessment data yet. AI ingredient analysis is a future phase. Unknown renders a neutral grey SafetyBadge.

### Problems encountered and solutions
- **Table named 'Products table' not 'products':** Initial `.from('products')` query returned a PGRST205 error with hint pointing to `'public.Products table'`. Probed with `.from('Products table')` to confirm, then user renamed via Supabase dashboard.
- **BrowsePage disappeared after routing was added:** When SearchPage and BrowsePage routing was introduced in App.jsx, BrowsePage was mapped to `activeView === 'browse'` — but NavBar had no 'browse' item, so it was unreachable. Fixed by merging search into BrowsePage and removing the separate Search nav item.
- **SearchPage was dead code after merge:** `SearchPage.jsx`, its directory, and the `searchProducts` API function were all removed to avoid confusion.

### Next steps
- Wire up NavBar navigation for Library, Shopping List, and Preferences (currently all show BrowsePage as a placeholder)
- Build the AI ingredient analysis feature — connect to Claude API to generate `safetyStatus` assessments and populate the SafetyBadge with real data
- Build the Library page (saved products, persisted to Supabase)
- Build the Shopping List page
- Consider adding a product detail view triggered by `onClick` on ProductCard (currently logs to console)

### Prompt patterns worth reusing
- "Check [existing file] before building — if an existing component covers the use case, use it. Only create a new component if no spec covers the pattern." — keeps Claude from over-building
- Giving the full architectural constraint upfront ("client-side filtering, no Supabase queries on keystroke") avoids having to correct after the fact

---

## Session — 2026-04-11 (Auth)

### What we built or changed
- **`src/components/InputField.jsx`** — built from the existing spec (was specified but not yet implemented); added `password` to the `type` prop options (spec only listed `text | email | url`) since auth requires it; updated `component-spec.md` to match
- **`src/features/auth/SignInPage.jsx`** — email + password form calling `supabase.auth.signInWithPassword()`; error shown on password field; link to sign-up; on success `onAuthStateChange` in App.jsx handles the redirect automatically — no manual navigation needed
- **`src/features/auth/SignUpPage.jsx`** — email + password form calling `supabase.auth.signUp()`; on success shows a "check your email" confirmation message with a link to sign-in (Supabase sends confirmation email by default); link to sign-in for existing users
- **`src/App.jsx`** — added session gating: `getSession()` on mount + `onAuthStateChange` listener; `session === undefined` renders a spinner (prevents flash of auth screen); `session === null` routes to sign-in or sign-up based on `authView` state; authenticated users see the main app
- **`src/components/NavBar.jsx`** — added optional `onSignOut` prop; when provided, renders a "Sign Out" button at the end of the nav list styled `text-neutral-400 hover:text-error-500`; when not provided (e.g. auth pages don't render NavBar at all), button is absent
- **`src/App.jsx`** — passes `handleSignOut` (`supabase.auth.signOut()`) to NavBar; sign-out clears the session and `onAuthStateChange` automatically returns user to sign-in

### Decisions made
- **Auth gating in App.jsx, not a router:** Consistent with the existing pattern — the app uses `useState` for view state, no React Router. Auth state follows the same pattern: a `session` state value drives which branch renders.
- **`session === undefined` as loading sentinel:** `useState(undefined)` distinguishes "haven't checked yet" from `null` (checked, not signed in) and a session object (signed in). Prevents the sign-in page from flashing before the session check completes.
- **Error displayed on the password field, not a separate alert:** Keeps the form compact and the error close to the field the user needs to fix. Both sign-in errors (wrong credentials) and sign-up errors (weak password, existing email) surface this way.
- **Sign-out button uses `onSignOut &&` guard in NavBar:** The component stays self-contained — if no `onSignOut` prop is passed, the button simply doesn't render. Auth pages never render NavBar, so the sign-out button is naturally invisible to unauthenticated users.
- **CLAUDE.md "no auth" rule was overridden by explicit user request:** The project instructions say "V1 is single-user, no auth." This session added auth as a course exercise. CLAUDE.md needs updating.

### Problems encountered and solutions
- None — the Supabase auth API (`signUp`, `signInWithPassword`, `onAuthStateChange`) worked as expected with the existing `src/lib/supabase.js` client. No new credentials or client setup was needed.

### Next steps
- Update `CLAUDE.md` — remove "No authentication in V1" constraint and the "Do not add user authentication" do-not rule; both are now stale
- Update NavBar section of `component-spec.md` to document the `onSignOut` prop
- Wire up Library, Shopping List, and Preferences pages (NavBar links currently go nowhere)
- Build AI ingredient analysis feature (Claude API → safety assessments)

### Prompt patterns worth reusing
- "Use the existing Supabase connection — do not create a new one or new credentials file" — prevents Claude from scaffolding a new client when one already exists
- Naming the exact Supabase auth methods to use (`signUp`, `signInWithPassword`) in the prompt avoids Claude guessing or using a deprecated method

---

## Session — 2026-04-18

### What we built or changed
- **Warm neutral color palette** — replaced the default Tailwind gray neutral scale with a warm, cream-toned scale anchored at `neutral-50 = #f7f3ed`. Updated in three places: `tailwind.config.js`, `docs/design-system.md`, and `design-system-visual.html` (both the CSS custom properties and the swatch hex labels in the palette preview)
- **Session documentation workflow** — discussed how to save decisions and keep Claude aligned; established a clear mental model: git for code, `docs/` for conventions and decisions, `session-log.md` for narrative history
- **Memory system updated** — Claude's auto-memory files refreshed to reflect the auth session (2026-04-11) and today's changes; new `project-decisions.md` memory captures key architectural decisions so they auto-load in future sessions

### Decisions made
- **Warm neutrals are intentional** — `neutral-50 = #f7f3ed` was the anchor; the full scale was derived from it. Don't revert to Tailwind's default gray. The warmth brings the palette closer to the cream/natural tone that fits the product's clean, organic positioning.
- **Documentation lives in `docs/`, not scattered files** — CLAUDE.md holds rules, `docs/design-system.md` holds visual tokens, `component-spec.md` holds component contracts, `session-log.md` holds narrative history. Each file has a distinct role; don't duplicate across them.
- **Claude's hidden memory files are a convenience layer, not the source of truth** — If `docs/` files are well-maintained, Claude can re-derive context. Memory files are a shortcut so Claude doesn't re-read everything each session.

### Problems encountered and solutions
- None — color token update was straightforward across all three files.

### Next steps
- **Carry over from previous session:** Update `component-spec.md` NavBar section to document the `onSignOut` prop (still not done)
- Wire up Library, Shopping List, and Preferences pages (NavBar links still go nowhere)
- Build AI ingredient analysis feature (Claude API → safety assessments → populate SafetyBadge with real data)
- Build Library page (saved products, persisted to Supabase)
- Build Shopping List page
- Consider product detail view (ProductCard onClick currently just logs to console)

### Prompt patterns worth reusing
- "Update the color tokens to [description]. For [specific token] I want [hex value]. Based on this value, update the rest of the scale." — gives Claude a clear anchor and lets it derive the rest consistently
- Ending a session with "do the session wrap-up" triggers the full log + doc audit + commit workflow in one step

---

## Session — 2026-04-18 (Product Images)

### What we built or changed
- **`image_url TEXT` column** added to the Supabase `products` table via SQL Editor (`ALTER TABLE products ADD COLUMN image_url TEXT`)
- **`scripts/open-amazon-searches.sh`** — opens an Amazon search tab per product in the browser; used to find product image URLs
- **`scripts/update-product-images.js`** — updates each product row with its image URL; uses `SUPABASE_SERVICE_ROLE_KEY` (not the anon key, which is blocked by RLS)
- **`src/lib/api/products.js`** — `fetchProducts()` select updated to include `image_url`
- **`src/components/ProductCard.jsx`** — added `imageUrl` prop; renders `<img>` at top of card (`w-full h-40 object-contain rounded-md bg-neutral-50`) when prop is present
- **`src/features/browse/BrowsePage.jsx`** — passes `imageUrl={product.image_url}` to each ProductCard
- **`docs/component-spec.md`** — ProductCard spec updated to document `imageUrl` prop and image visual structure

### Decisions made
- **External image URLs (Amazon/iHerb CDN), not Supabase Storage:** User collected image URLs directly from product pages rather than downloading and re-hosting. Simpler for a personal app; tradeoff is that URLs can break if the listing changes.
- **Service role key for seed scripts:** The anon key is blocked by RLS for writes to the `products` table. Seed/admin scripts use `SUPABASE_SERVICE_ROLE_KEY` (stored in `.env`, never committed). The app itself continues to use the anon key.
- **Image renders only when `imageUrl` is present:** Cards without an image fall back to the existing layout — no placeholder or broken image state needed for a personal app.

### Problems encountered and solutions
- **Amazon CDN blocks hotlinking:** All Amazon image URLs returned 403 when loaded by the browser. User switched to direct product page image URLs (right-click → copy image address) from Amazon and iHerb, which work.
- **Update script reported ✓ for all rows but database stayed null:** RLS was silently blocking writes from the anon key — Supabase reports no error, just writes 0 rows. Fixed by switching the script to use the service role key.

### Next steps
- Collect remaining image URLs and re-run the update script for any products still showing null
- Build AI ingredient analysis feature (Phase 3) — Claude API → safety assessments → populate SafetyBadge
- Wire up Library, Shopping List, and Preferences pages
- Build Library page (saved products, persisted to Supabase)
