---
name: kaizen
description: Global GitHub workflow guidelines, branching strategies, and agentic execution standards for Aura Blush Studio. Incorporates Karpathy's principles (Simplicity First, Surgical Changes), flexible branching, Conventional Commits, pre-push quality gates, and automated PR creation via gh CLI.
---

# `kaizen` — Continuous Disciplined Development & GitHub Workflow

> **Definition:** *Kaizen (改善)* — Japanese philosophy of continuous, disciplined, high-quality improvement.

When making codebase changes, managing Git branches, writing commits, opening Pull Requests, or executing CI/CD tasks, ALL AI agents MUST strictly follow the principles and workflows outlined in this document.

---

## 1. Karpathy Agentic Engineering Principles

### 🧠 Think Before Coding
- **State assumptions explicitly:** Never guess silently. If the target branch (`main` vs `dev`) or scope is ambiguous, ask the user.
- **Present multiple options:** If there are multiple ways to implement a feature or structure a branch, outline the trade-offs.
- **Push back on unnecessary complexity:** If 200 lines can be written in 50, explain why and write the simpler version.
- **Stop when confused:** If a build fails or requirements are unclear, state the exact problem and seek input before making broad code edits.

### 🎯 Simplicity First
- **Minimum viable change:** Solve the exact problem asked. Write zero speculative code or unrequested abstractions.
- **Surgical changes:** Touch ONLY what is necessary. Leave adjacent formatting, comments, and unrelated code untouched.
- **Clean up your own mess:** If you introduce temporary scratch files or test artifacts, delete them before committing.

### 🔬 Goal-Driven Execution
- **Empirical verification required:** Never claim a task is complete or open a PR until local build checks, linters, and unit tests pass cleanly.

---

## 2. Branching Strategy

### Flow Selection Matrix

1. **Standard Flow (`feature → main`)** *(Default)*:
   - Primary stable branch is `main`.
   - Feature branches branch directly off `main` and merge back into `main` via PR.

2. **Staging Flow (`feature → dev → main`)**:
   - Used when specified by the user or project convention.
   - Feature branches branch off `dev`, merge into `dev` via PR, and `dev` is later merged into `main`.

### Branch Naming Conventions
- `feat/<scope>-<description>` — New features (e.g. `feat/treatments-filter`, `feat/booking-modal`)
- `fix/<scope>-<description>` — Bug fixes (e.g. `fix/theme-toggle`, `fix/mobile-menu`)
- `content/<topic>` — Content updates (e.g. `content/mole-screening`, `content/faq-update`)
- `style/<scope>` — Styling / token changes (e.g. `style/category-tokens`, `style/flight-layout`)
- `chore/<task>` — Maintenance, toolchain, or dependency updates (e.g. `chore/astro-upgrade`)

---

## 3. Conventional Commit Standard

Commit messages MUST follow the Conventional Commits specification:
`type(scope): concise imperative description`

### Types
- `feat`: A new feature for the user
- `fix`: A bug fix
- `docs`: Documentation-only changes
- `style`: Changes that do not affect code logic (formatting, CSS)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Maintenance tasks, build scripts, dependency updates
- `content`: Markdown / content collection additions and updates

### Rules
- Use imperative mood: `feat(treatments): add chemical peel treatment` (NOT `added chemical peel treatment`)
- Keep header line under 72 characters.
- Never write generic commits like `updated files` or `fixed bugs`.

---

## 4. Pre-Push Quality Gate

Before committing or pushing, the AI agent MUST execute local verification commands:

```bash
# Astro production build & content validation
npm run build

# End-to-end verification
# Ensure all 10 treatment routes compile without errors
```

---

## 5. Pull Request (PR) Strategy & Automation

When the user asks to **"create a PR"**, **"open PR"**, or **"submit PR"**, the AI agent executes the following steps:

1. **Verify Quality Gate**: Ensure `npm run build` passes with 0 errors.
2. **Push Feature Branch**: Push branch to remote: `git push -u origin <current-branch>`.
3. **Construct PR Body**: Generate a structured markdown file (`/tmp/pr_body.md`).

### PR Template

```markdown
## Summary
Brief 2-3 sentence overview of what this PR introduces and why.

## Key Changes
- Item 1: Detail of change
- Item 2: Detail of change

## Verification Evidence
- [x] `npm run build` compiled cleanly (0 errors)
- [x] All 10 treatment pages verified
- [x] Category token rule verified (`--cat` only)
- [x] Medical copy intact (dermatologist clearance & patch testing)

## Karpathy Compliance Checklist
- [x] Touch only necessary code (Surgical changes)
- [x] No unrequested abstractions or bloat (Simplicity first)
```

4. **Create PR via GitHub CLI**:
```bash
gh pr create \
  --base <target-branch> \
  --head <current-branch> \
  --title "type(scope): Concise title matching commit" \
  --body-file /tmp/pr_body.md
```

---

## 6. Step-by-Step AI Agent Playbook

When given a task under the `kaizen` skill:

1. **Checkout & Branch**: Ensure clean working tree, pull latest target branch, and create feature branch (`feat/...` or `fix/...`).
2. **Surgical Implementation**: Write minimal, robust code following project code standards and AGENTS.md rules.
3. **Local Quality Verification**: Run `npm run build`.
4. **Conventional Commit**: Write crisp commit messages using `type(scope): description`.
5. **PR Creation (if requested)**: Push branch and run `gh pr create` with structured template.
6. **Clean Up**: Remove any temporary scratch files or test artifacts created during execution.
