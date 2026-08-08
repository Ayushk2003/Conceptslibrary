# Premium Concept Showcase — Implementation TODO

## In progress

- [x] Upgrade `src/design-system.tsx` with reusable primitives (Switch, Modal/Drawer, ProgressBar, Tabs)
- [x] Upgrade `src/index.css` with premium utilities (spotlight, glass, gradient text, reduced-motion)
- [x] Upgrade `src/components/ConceptCard.tsx` with richer hover/tilt/spotlight + keyboard focus
- [x] Upgrade `src/components/CategoryDrawer.tsx` with Escape close, focus trap
- [x] Elevate `src/App.tsx` hub (sticky nav, persisted dark mode, smooth transitions, about section)
- [x] Polish `src/concepts/ModernConcept.tsx` (stat strip)
- [ ] Enhance `src/concepts/ThreeDConcept.tsx` (carousel, fallbacks, performance guard)
- [ ] Enhance `src/concepts/StorytellingConcept.tsx` (GSAP parallax, progress rail)
- [ ] Enhance `src/concepts/StorefrontConcept.tsx` (quick view, compare, favorites, carousel hero)

## Follow-up

- [x] Centralize theme + Back navigation in `App.tsx` Header (App is single source of truth; concept pages no longer duplicate Back/theme buttons)
- [x] Run `npm run build` (tsc + vite) and fix errors — passes, 0 type errors
- [x] Run `npm run lint` (oxlint) — 0 errors (only pre-existing design-system fast-refresh warnings remaining)
- [ ] Start `npm run dev` and visually verify responsive + dark/light + a11y
- [ ] Verify all four concepts + hub at mobile/tablet/desktop breakpoints
