# Portrait brief — Roshni Verma (`artist.jpg`)

For an image tool that **edits a supplied photo** (Antigravity, Photoshop
generative fill, Photoroom, Canva Magic Studio, Nano Banana, Flux Kontext).

**Input:** the existing photo of Roshni — the café selfie in the teal top.

---

## The one rule

> **Do not regenerate, replace, beautify or reshape her face.**
> Her features, skin texture, skin tone and expression must come through
> unchanged. This is a photo of a real person on a page that promises clients
> she is the one who will treat them. Everything below changes the *setting*,
> not the *subject*.

That means: no face swap, no "enhance", no skin smoothing, no slimming, no
lightening, no eye enlargement, no AI beauty filter. If the tool has a
"generate person" mode, this is not that job — it is a background-and-lighting
edit on a real photograph.

---

## Prompt

> Professional headshot retouch of the supplied photograph. **Keep the subject's
> face, hair, skin tone, skin texture and expression exactly as they are — do
> not regenerate or alter the person in any way.**
>
> Replace the background only: a clean, softly out-of-focus pale plaster wall in
> warm off-white, with gentle natural window light falling from the front-left.
> Remove all background clutter — the television, other people, the café
> interior.
>
> Correct the overall lighting so her face is evenly and softly lit, with the
> warm cast of the original preserved. Lift the shadows slightly. Neutralise any
> harsh overhead colour cast.
>
> Recompose to a **square 1:1 crop, head and shoulders**, subject centred with
> comfortable headroom, eyes on the upper third.
>
> Muted warm palette — blush pink, cream, soft rosewood — to match a premium
> skin studio. Photorealistic. No text, no logo, no watermark, no border.

**Output:** JPEG, 1024×1024, under 250KB.

---

## Steps

1. Run the edit.
2. **Check it still looks like her** — side by side with the original. If the
   face has shifted at all, discard it and try again with a tool that only does
   background removal (Photoroom, `remove.bg`).
3. Save to `public/images/artist.jpg` — exact path and filename.
4. Compress if needed:
   ```
   sips -s format jpeg -s formatOptions 72 artist.jpg --out artist.jpg
   ```
5. Rebuild — the placeholder frame disappears on its own:
   ```
   rm -rf node_modules/.astro .astro dist && npm run build
   ```

---

## Honestly, the better option

A two-minute reshoot beats any retouch of the café photo:

- Plain wall, nothing behind her
- Facing a window — daylight **on** her face, not behind her
- Phone propped at **eye level**, not held above
- What she'd actually wear to treat a client
- Relaxed, looking at the lens
- Then crop square

The current photo is lit from above in mixed indoor light, which no amount of
editing fully undoes. A window and a blank wall solve it for free.

---

## Not acceptable

- An AI-generated face, however realistic — it misrepresents who treats the client
- A stock photo of a different woman (this is what was there before; it was removed)
- Heavy retouching that changes her appearance
- Any edit that lightens her skin. The site explicitly refuses fairness and
  whitening treatments; lightening the founder's own portrait would contradict
  that on the same page.
