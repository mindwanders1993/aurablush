# Deploying to Vercel

The site is a **static build** — no server, no database, no API routes. That
puts it comfortably inside Vercel's free Hobby tier.

| | |
|---|---|
| Build output | 2.2 MB, 37 files |
| Hobby bandwidth | 100 GB/month — a studio site uses a fraction of it |
| Cost | Free, provided it stays non-commercial in Vercel's sense (see below) |
| Framework preset | Astro (auto-detected) |

## One-time setup

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project**, import the repo.
3. Accept the detected settings — `vercel.json` already pins them:
   - Build command `astro build`
   - Output directory `dist`
4. **Deploy.** First build takes about a minute.

Every push to `main` redeploys automatically. Pull requests get their own
preview URL, which is a good way to show her a change before it goes live.

## Custom domain

`.in` domains are cheap (roughly ₹500–900/year) and Vercel does not charge to
attach one.

1. Buy the domain (BigRock, GoDaddy, Namecheap, Cloudflare).
2. Vercel → Project → **Settings → Domains** → add it.
3. Point the registrar's nameservers or records at Vercel as instructed.
4. HTTPS is issued automatically and free.

**Then update `astro.config.mjs`** — `site:` is currently
`https://aurablush.in` and must match the real domain, or `sitemap-index.xml`
will list wrong URLs.

## The free-tier caveat, honestly

Vercel's Hobby plan is for **non-commercial** use. A studio site that
advertises paid services and takes bookings is, strictly read, commercial —
Vercel's own guidance points such sites to the Pro plan (~$20/month).

In practice a small site like this is very unlikely to attract attention, but
it is their call, not ours. If it matters, the equally free alternatives with
no commercial restriction are **Cloudflare Pages** and **Netlify**; both deploy
this repo the same way, with no code changes.

## Before it goes live

Not deployment blockers, but do not launch without them — see
`HANDOFF-FOUNDER.md`:

- [ ] **Remove the 8 placeholder reviews** — they are invented. Publishing them
      is illegal advertising.
- [ ] Replace `[FOUNDER NAME]` and the bracketed bio/credentials.
- [ ] Real phone, WhatsApp, email, address in `src/data/site.ts`.
- [ ] Confirm every price — the current ones are researched estimates.
- [ ] Decide on laser and mole removal (§6 of the handoff). Drop them if she is
      not trained and equipped for them.
- [ ] Swap stock treatment photos for her own work as it accumulates.

## Notes

- `public/images/` is cached for a year via `vercel.json`. If you replace an
  image, change its filename or visitors keep the old one.
- The homepage scroll flight runs on placeholder stills; nothing about
  deployment changes when the real clips land (see `world/HANDOFF.md`).
