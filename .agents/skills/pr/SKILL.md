---
name: pr
description: Use this skill to push the current branch and create a Pull Request via GitHub CLI (gh).
---

# Phase 4: Publisher (`pr`)

When activated, execute these steps:

1. **Target Branch Selection**:
   - Determine target branch (`main` or `dev`).
2. **Draft PR Body**:
   - **Summary of changes**
   - **Verification Evidence** (e.g. `npm run build` passed, all 10 treatment pages generated)
   - **AGENTS.md Compliance** (category colours via `--cat` tokens, `scrub-engine.js` untouched, medical copy unchanged)
   - **Karpathy Checklist** (Surgical changes only, zero speculative code)
3. **Pause and Prompt**:
   Output the proposed PR Target, Title, and Body to the user and WAIT:
   > "Ready to publish PR. Options:
   > [1] Approve (Push and open PR via gh)
   > [2] Edit PR Body"
4. **Execute**: If approved, run:
   ```bash
   git push -u origin HEAD
   gh pr create --title "<title>" --body "<body-text>"
   ```
5. **Finalize**: Provide the clickable PR link.
