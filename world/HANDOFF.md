# Aura Blush — camera flight render handoff

The homepage flight is **wired and live** with placeholder stills. This document is the
contract for replacing them with the real film. Nothing in `src/` changes when the assets
land — you drop files in, run one script, and uncomment the config.

## The build, in one table

| | |
|---|---|
| Camera architecture | **A — continuous walkthrough.** One forward glide, first scene to last. |
| Clips needed | **6 legs. No connectors.** (Fly-through would have needed 11.) |
| Tool requirement | Your video tool must accept a **start / first frame**. It does **not** need an end frame — that's the reason this architecture was chosen. |
| Desktop spec | 16:9 landscape, ~8 s per leg, highest quality available, **no audio** |
| Mobile spec | 9:16 **natively portrait** (not a crop), ~8 s per leg |
| Stills | 6 landscape + 6 portrait, 3:2 / 9:16, ≥1536 px / ≥1080 px wide |
| Style | One preamble, reused **byte-identical** in all 24 prompts. That identical text is what makes six separate renders read as one building. |

## The seam rule (the thing most likely to go wrong)

Leg *i* must **open on leg *i−1*'s actual rendered last frame** — not on a fresh render of
the same room, not on the scene still. Extract the frame from the returned video and hand
that exact PNG to your tool as the start image.

Render the legs **in order**. Each one is conditioned on the file the previous one produced,
so they can't be done in parallel.

```
still_arrival.png ──▶ leg_arrival.mp4
                        └─ last frame ──▶ leg_consult.mp4
                                            └─ last frame ──▶ leg_prep.mp4  ──▶ … ──▶ leg_reveal.mp4
```

`bash world/encode.sh check` verifies this for you and prints `[locked]` or `[BROKEN]` per
seam. A broken seam goes back for re-render — no crossfade can hide a wrong start frame.

## Spec table

Drop finished files at the **exact** output paths below. Status column is yours to keep current.

### Stills — landscape (desktop posters + the reduced-motion experience)

| # | Prompt file | Conditioning | Output | Status |
|---|---|---|---|---|
| 1 | `still_arrival.txt` | — | `renders/still_arrival.png` | pending |
| 2 | `still_consult.txt` | — | `renders/still_consult.png` | pending |
| 3 | `still_prep.txt` | — | `renders/still_prep.png` | pending |
| 4 | `still_brows.txt` | — | `renders/still_brows.png` | pending |
| 5 | `still_lips.txt` | — | `renders/still_lips.png` | pending |
| 6 | `still_reveal.txt` | — | `renders/still_reveal.png` | pending |

### Stills — portrait (mobile posters)

| # | Prompt file | Conditioning | Output | Status |
|---|---|---|---|---|
| 1 | `still_arrival-m.txt` | — | `renders/still_arrival-m.png` | pending |
| 2 | `still_consult-m.txt` | — | `renders/still_consult-m.png` | pending |
| 3 | `still_prep-m.txt` | — | `renders/still_prep-m.png` | pending |
| 4 | `still_brows-m.txt` | — | `renders/still_brows-m.png` | pending |
| 5 | `still_lips-m.txt` | — | `renders/still_lips-m.png` | pending |
| 6 | `still_reveal-m.txt` | — | `renders/still_reveal-m.png` | pending |

### Legs — desktop 16:9 (render in this order)

| # | Prompt file | Start frame (start image) | Output | Status |
|---|---|---|---|---|
| 1 | `leg_arrival.txt` | `renders/still_arrival.png` | `renders/leg_arrival.mp4` | pending |
| 2 | `leg_consult.txt` | `frames/last_arrival.png` | `renders/leg_consult.mp4` | pending |
| 3 | `leg_prep.txt` | `frames/last_consult.png` | `renders/leg_prep.mp4` | pending |
| 4 | `leg_brows.txt` | `frames/last_prep.png` | `renders/leg_brows.mp4` | pending |
| 5 | `leg_lips.txt` | `frames/last_brows.png` | `renders/leg_lips.mp4` | pending |
| 6 | `leg_reveal.txt` | `frames/last_lips.png` | `renders/leg_reveal.mp4` | pending |

### Legs — mobile 9:16 (its own chain; never mix frames with the desktop chain)

| # | Prompt file | Start frame (start image) | Output | Status |
|---|---|---|---|---|
| 1 | `leg_arrival-m.txt` | `renders/still_arrival-m.png` | `renders/leg_arrival-m.mp4` | pending |
| 2 | `leg_consult-m.txt` | `frames/last_arrival-m.png` | `renders/leg_consult-m.mp4` | pending |
| 3 | `leg_prep-m.txt` | `frames/last_consult-m.png` | `renders/leg_prep-m.mp4` | pending |
| 4 | `leg_brows-m.txt` | `frames/last_prep-m.png` | `renders/leg_brows-m.mp4` | pending |
| 5 | `leg_lips-m.txt` | `frames/last_brows-m.png` | `renders/leg_lips-m.mp4` | pending |
| 6 | `leg_reveal-m.txt` | `frames/last_lips-m.png` | `renders/leg_reveal-m.mp4` | pending |

## Working loop

```bash
# 1. render leg_arrival.mp4 from still_arrival.png, drop it in world/renders/
bash world/encode.sh frames    # extracts frames/last_arrival.png — the next leg's start image
# 2. render leg_consult.mp4 from that PNG, drop it in… and so on through leg_reveal
bash world/encode.sh check     # every seam must read [locked]
bash world/encode.sh all       # frames + encodes + posters
```

`encode.sh` produces:

- `public/world/vid/<id>.mp4` — desktop masters: native resolution, crf 20, **GOP 8**,
  light unsharp, no audio, faststart. Not all-intra: the engine loads each clip as a Blob,
  which is always seekable, so keyframe density isn't what makes scrubbing work.
- `public/world/vid/<id>-m.mp4` — phone encodes: 720 wide, **GOP 4**, crf 23. A phone
  decoder's seek cost scales with distance from the last keyframe; this is the half of
  smooth phone scrubbing that the engine's seek-coalescing can't do on its own.
- `public/world/<id>.jpg` / `<id>-m.jpg` — posters, taken from each leg's **own frame 0**
  so there's no poster-to-video pop when the clip paints. (This machine's ffmpeg has no
  libwebp, hence JPEG rather than WebP.)

## Wiring it up

In [`src/components/ScrollWorld.astro`](../src/components/ScrollWorld.astro), each scene has
its real paths sitting commented directly beneath the placeholder. Swap them:

```js
still: '/world/arrival.jpg',
clip: '/world/vid/arrival.mp4',
clipMobile: '/world/vid/arrival-m.mp4',
stillMobile: '/world/arrival-m.jpg',
```

`connectors: []` stays empty — architecture A has none.

## Known traps

- **Interiors trip content filters.** Spa/treatment-room prompts get false-positive NSFW
  flags on several video models. Re-roll first (it's often non-deterministic); if it
  persists, add "empty, unoccupied, no people, architectural, tasteful" — already in every
  prompt here — or render that one leg on a different model and accept a slight grain shift.
- **One model for the whole chain.** Swapping models mid-chain pops at the seam even when
  the start frame is correct, because each model has its own grain and motion character.
- **Don't reorder the scenes.** The order is a walkable floorplan; the camera never pulls
  back, so front-door-to-mirror is the only sequence that reads as one continuous walk.
- **Portrait must be natively portrait.** `check` fails a mobile leg whose width ≥ height.
  A downscaled 16:9 file is a crop, not the mobile version.
- **`bash`, not `zsh`.** Run the script with `bash world/encode.sh`; zsh's 1-indexed arrays
  silently chain the wrong scene's frames.
