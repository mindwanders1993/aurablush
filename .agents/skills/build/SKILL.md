---
name: build
description: Use this skill after a plan is approved. It executes the Loop Engineering process (Build -> Test -> Reflect) for Aura Blush until the site compiles cleanly and quality gates pass 100%.
---

# Phase 2: Loop Engineering (`build`)

When activated, execute these steps iteratively until successful:

1. **Build**: Implement the agreed-upon plan using surgical code edits in `src/`.
2. **Test (Quality Gate)**: Run from the project root (`/Users/mrrobot/Desktop/Projects/aurablush`):
   ```bash
   npm run build
   ```
   - Verifies Astro static compilation and all content collections resolve.
   - Ensures TypeScript type check passes with 0 errors.
   - Ensures zero broken imports, missing component exports, or invalid content frontmatter.

3. **Reflect**:
   - If build **FAILS**: Read the error message, identify the root cause, fix the component/content/style, and re-test.
   - If build **PASSES**: Proceed to Step 4.

4. **AGENTS.md Compliance Check**: Verify:
   - No category colour is hardcoded — all use `--cat` / `--cat-<id>` tokens.
   - `public/world/scrub-engine.js` is untouched.
   - Medical copy on `mole-removal` and `laser-hair-removal` is unchanged.
   - The homepage flight (`<ScrollWorld />`) remains the first element in `index.astro`.

5. **Context Cleanup**: Summarize the changes made so far to consolidate context.

6. **Pause and Prompt**:
   Output the following to the user and WAIT for their response:
   > "Build and quality gates passed 100%. Options:
   > [1] Approve (Proceed to Commit)
   > [2] Refactor Code
   > [3] Preview (run dev server)"
