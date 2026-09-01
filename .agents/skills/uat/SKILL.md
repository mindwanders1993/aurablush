---
name: uat
description: User Acceptance Testing (UAT) manual testing guide and visual verification protocol for Aura Blush Studio.
---

# Aura Blush User Acceptance Testing (`uat`)

## 🎯 Verification Matrix

### 1. Visual & Theme Inspection
- **Light/Dark Mode**: Toggle the theme button (crescent icon) and verify all colours switch cleanly — no hardcoded hex should remain visible as wrong-theme artifacts.
- **Category Colours**: On `/treatments`, confirm each service family (PMU → rose, Skin → sage, Pigment → amber, Clinical → mauve) renders with its correct `--cat` token. No family should bleed into another.
- **Typography**: Verify Cormorant Garamond (display/headings) and Outfit (body) load correctly. No system-font fallback should be visible after fonts load.
- **Responsive Layout**: Check desktop (1280px+), tablet (768px), and mobile (375px) breakpoints across homepage, `/treatments`, `/artist`, `/about`, `/reviews`, `/contact`.

### 2. Navigation
- [ ] Logo "AURA BLUSH" links back to `/`.
- [ ] Desktop nav links (`Treatments`, `The Team`, `About`, `Reviews`) navigate correctly.
- [ ] Active nav item shows the accent underline.
- [ ] "Book Appointment" button in header links to `/contact`.
- [ ] On an immersive page (`/`), the site header is hidden during the scroll flight and slides in once past it.

### 3. Homepage Flight (ScrollWorld)
- [ ] The camera flight is the **first** element on the page (no gap above it).
- [ ] Scrolling advances through all 6 scenes: Arrival → Consultation → Sterile Prep → Brow Suite → Lip Suite → Reveal.
- [ ] Scene copy (eyebrow, title, body, tags) renders correctly in each leg.
- [ ] "Book Appointment" CTA and "See the full menu" secondary CTA appear on the final (Reveal) scene.
- [ ] The flight does not show through the `.after-flight` sections below it.

### 4. Treatments
- [ ] `/treatments` lists all 10 treatments, grouped by the 4 service families.
- [ ] Each treatment card shows the medical marker (`⚕`) for `laser-hair-removal` and `mole-removal`.
- [ ] Clicking a treatment card navigates to its detail page.
- [ ] The screening notice renders on `mole-removal` and `laser-hair-removal` detail pages.
- [ ] `bestFor` and `notFor` arrays render on detail pages.

### 5. Medical Copy Integrity
- [ ] `mole-removal`: screening and dermatologist clearance language is present and **not softened**.
- [ ] `laser-hair-removal`: patch test 24–48 h requirement is present and **not softened**.

### 6. Contact & Booking
- [ ] `/contact` page loads without error.
- [ ] All required form fields are present.

### 7. Footer
- [ ] Four category family links in the footer each carry their coloured dot.
- [ ] Legal disclaimer paragraph is present.
- [ ] Copyright year is current.
