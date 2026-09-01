/**
 * The treatment menu is no longer PMU-only, so every treatment now belongs to
 * one of four service families. Categories live here (not in a content
 * collection) because they are structure, not editorial content: the ids are
 * referenced by the treatments schema, the nav, the filters and the card art.
 *
 * `accent` is used for the category chip and the generated card artwork. Each
 * one is muted enough to sit beside the Warm Blush brand accent without
 * fighting it; `accentDark` is the dark-theme lift of the same hue.
 */
export const CATEGORY_IDS = ['pmu', 'skin', 'pigment', 'clinical'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
  id: CategoryId;
  label: string;
  /** Short form for chips and pills where the full label won't fit. */
  short: string;
  /** One line for the category rail on the homepage. */
  tagline: string;
  /** Two sentences for the section intro on /treatments. */
  description: string;
  accent: string;
  accentDark: string;
}

export const categories: Category[] = [
  {
    id: 'pmu',
    label: 'Permanent Makeup',
    short: 'PMU',
    tagline: 'Brows and lips, mapped to your face and set to wake up finished.',
    description:
      'Semi-permanent pigment work — hair-stroke brows and lip blush — placed by a certified artist rather than a stencil. Everything starts with mapping and a pigment match you sign off on before a needle is opened.',
    accent: '#bc5d66',
    accentDark: '#e8969e',
  },
  {
    id: 'skin',
    label: 'Skin Renewal',
    short: 'Skin',
    tagline: 'Collagen, texture and glow — the treatments that rebuild the skin itself.',
    description:
      'Treatments that work on the structure of the skin rather than its surface: controlled collagen stimulation, deep barrier hydration and the layered Korean facial protocol. These build over a course, not a single visit.',
    accent: '#6f8f7d',
    accentDark: '#93b8a3',
  },
  {
    id: 'pigment',
    label: 'Tone & Pigment',
    short: 'Pigment',
    tagline: 'Melasma, sun damage, post-acne marks and under-eye shadow.',
    description:
      'Pigment is the slowest thing on the face to shift and the easiest to make worse. These protocols are deliberately gradual — tyrosinase inhibitors, gentle acid work and strict photoprotection — because aggressive brightening rebounds.',
    accent: '#b8894e',
    accentDark: '#d9ab72',
  },
  {
    id: 'clinical',
    label: 'Laser & Clinical',
    short: 'Clinical',
    tagline: 'Laser hair reduction and lesion removal, under medical screening.',
    description:
      'Our device-led and minor-procedure services. Both require a consultation, a documented skin assessment and — for anything pigmented that is being removed — sign-off from a dermatologist before we treat.',
    accent: '#84708f',
    accentDark: '#b199bd',
  },
];

export const getCategory = (id: string): Category =>
  categories.find(c => c.id === id) ?? categories[0];
