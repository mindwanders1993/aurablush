---
name: test
description: Dedicated QA and build validation skill for Aura Blush Studio.
---

# Aura Blush Test & QA Orchestration Skill (`test`)

## 🎯 Purpose
Run and diagnose the full Aura Blush verification pipeline before shipping code.

All commands run from the project root: `/Users/mrrobot/Desktop/Projects/aurablush`.

---

## 🧪 1. Production Build Verification
```bash
npm run build
```
- Confirms Astro compiles all pages and content collections without errors.
- TypeScript must pass with 0 type errors.
- All `src/content/` frontmatter must match the schemas in `src/content.config.ts`.

---

## 👁️ 2. Local Preview (Optional)
```bash
astro dev --background
```
- Starts the dev server in the background (per AGENTS.md).
- Inspect at `http://localhost:4321`.
- Stop with `astro dev stop`.

---

## 📋 Quality Checklist
- [ ] `npm run build` passes with 0 errors and 0 type errors.
- [ ] All 10 treatment pages render (check `dist/treatments/` after build).
- [ ] Category colours use `--cat` tokens only — no hardcoded hex in any `.astro` or `.css` file changed.
- [ ] `public/world/scrub-engine.js` is unmodified (check `git diff public/world/scrub-engine.js`).
- [ ] Medical copy on `mole-removal.md` and `laser-hair-removal.md` is unchanged.
- [ ] No scratch files, test artifacts, or unrequested modifications are staged.
