# Image generation brief — Aura Blush Studio

For generating the site's imagery elsewhere (Antigravity, Midjourney, etc.) and
dropping the results back in.

**Drop finished files into `public/images/` using the exact filenames below.**
Nothing else changes — the site picks them up on the next build.

---

## House style — prepend to every treatment prompt

> Editorial beauty photography for a premium skin studio. Warm, soft, natural
> daylight from a window; gentle shadows; calm and unhurried. Muted warm palette
> — blush pink, rosewood, cream, soft terracotta. Shallow depth of field, shot
> on 50mm at f/2. Clean minimal Indian clinic interior: pale plaster walls, warm
> wood, brushed brass, a single plant. Photorealistic, no text, no logos, no
> watermarks, no visible product branding.

**Palette to steer toward:** `#d47a82` blush · `#5c2a30` rosewood ·
`#fcf2f0` warm off-white · `#fffcfb` background

### Hard rules

1. **Indian / South Asian subjects.** The studio is in Varanasi and most clients
   are Fitzpatrick IV–V. Current stock images skew pale and Western — that is
   the single biggest thing to fix.
2. **No clinical blue or green.** Cold hospital tones fight the whole palette.
   Everything stays warm.
3. **No before/after framing, ever.** These illustrate a service. They are not
   Roshni's results and must never be presentable as such.
4. **No text, logos, product labels or watermarks.**
5. **Square, 1024×1024, JPEG.** Cropped to square in-frame — the site crops
   centrally, so keep the subject centred with breathing room.
6. Faces should look calm and relaxed. Not grimacing, not model-glamorous.

---

## The 10 treatment images

| # | Filename | Prompt (append to house style) |
|---|---|---|
| 1 | `microblading.jpg` | Extreme close-up of an Indian woman's eyebrow being shaped by a gloved artist holding a fine microblading tool. Focus on the brow and the tool tip. Her eye is closed, relaxed. Warm skin tone, soft daylight. |
| 2 | `lip-blush.jpg` | Close-up of an Indian woman's lower face, lips relaxed and softly tinted a natural rose. Gloved hand just entering frame with a fine PMU tool. Soft warm light, shallow focus on the lips. |
| 3 | `microneedling.jpg` | An Indian woman reclining on a treatment bed, eyes closed, calm, while a gloved practitioner passes a microneedling pen across her cheek. Warm daylight, blush-toned towel. |
| 4 | `collagen-restore.jpg` | An Indian woman reclining, eyes closed, as a gloved hand glides a smooth radiofrequency handpiece along her jawline. Serene, warm, spa-like. No blue device glow. |
| 5 | `glass-skin.jpg` | An Indian woman with luminous, dewy, exceptionally hydrated skin, head wrapped in a soft cream towel, eyes closed. Light reflecting off her skin in one continuous sheen. Warm and radiant. |
| 6 | `pigmentation-correction.jpg` | Gloved hand applying a clear serum to an Indian woman's cheek with a small fan brush. She reclines with eyes closed. Focus on the brush and cheek. Warm, clinical but soft. |
| 7 | `japanese-brightening.jpg` | Gloved hands pressing a hydrating serum into an Indian woman's face with flat palms. Eyes closed, calm. Warm light, no product bottle visible. |
| 8 | `under-eye.jpg` | Extreme close-up of an Indian woman's under-eye area with a soft gold hydrogel eye patch applied. Eye closed, lashes visible. Warm, intimate, shallow focus. |
| 9 | `laser-hair-removal.jpg` | Close-up of a laser handpiece against smooth Indian skin on a forearm or underarm, gloved hand holding it. Clean white towel. Abstract and calm — no face in frame. |
| 10 | `mole-removal.jpg` | Close-up of a gloved hand holding a dermatoscope over a small mole on Indian skin, on a soft blush-pink background. Reads as *examination*, not surgery. Minimal, calm, no blades or blood. |

> **9 and 10 deliberately show no faces.** Those pages are about screening and
> caution; abstract framing keeps them from looking alarming.

---

## Supporting images

| Filename | Prompt |
|---|---|
| `hero.jpg` | Interior of a small premium skin studio in India. Blush-pink treatment bed, pale plaster walls, warm wood shelving, brass fittings, a plant, soft daylight through a large window. Empty and calm, no people. |
| `studio.jpg` | A second angle of the same studio — a corner with a round mirror, a small trolley of sealed sterile tools, folded cream towels. Warm, uncluttered, no people. |

Keep these two consistent with each other: same room, same light, same palette.

---

## Roshni's portrait — `artist.jpg`

**Do not AI-generate this one.** It must be a real photo of her, or the page is
lying to clients about who treats them.

The café selfie needs reshooting or editing. What works:

- Plain wall behind her, no busy background
- Daylight from a window **facing** her, not behind
- Phone at **eye level**, propped on something — not held above
- Whatever she'd actually wear to treat a client
- Relaxed, natural, looking at the camera
- Cropped **square**, head and shoulders, 1024×1024

Free tools that will cut the background out of the existing photo in two
minutes: Canva, Photoroom, Pixlr.

Until a real photo lands, the page shows a labelled placeholder frame — which
is correct, and much better than a stranger's face.

---

## After generating

1. Save all files into `public/images/`, exact filenames above.
2. Keep each under ~250KB. To compress on macOS:
   ```
   sips -s format jpeg -s formatOptions 72 IMAGE.jpg --out IMAGE.jpg
   ```
3. Rebuild: `npm run build`
4. Filenames are cached for a year in production (see `vercel.json`) — if you
   swap an image *after* deploying, either keep the same filename and redeploy,
   or rename it.

## Consistency check

Generated in separate sessions, these will drift apart. Once all 12 exist, view
them as a grid before shipping — the giveaway is inconsistent white balance
(some warm, some cold). If one looks out of place, regenerate it rather than
letting it sit in the row.
