# Contributing to Jukeboxd

Thanks for your interest in contributing to Jukeboxd.

This document explains how to get your environment running and what we expect in pull requests so collaboration stays fast and clear.

## Ground Rules

- Be respectful and constructive in all interactions
- Keep pull requests focused and small when possible
- Prefer clear code over clever code
- Open an issue first for large changes or architectural ideas

## Development Setup

### 1) Fork and clone

```bash
git clone https://github.com/<your-username>/jukeboxd.git
cd jukeboxd
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create `.env.local` in the project root:

```env
MONGODB_URI=
NEXT_PUBLIC_URL=http://localhost:3000
WEBHOOK_SECRET=
```

If your flow touches authentication, include the Clerk keys required by your local Clerk setup.

### 4) Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Branch and Commit Workflow

1. Create a branch from `main`:
   ```bash
   git checkout -b feature/short-description
   ```
2. Make your changes
3. Run checks:
   ```bash
   npm run lint
   ```
4. Commit with a clear message
5. Push and open a pull request

## Pull Request Guidelines

Before opening a PR, verify:

- [ ] The change is scoped to one concern
- [ ] Lint passes locally (`npm run lint`)
- [ ] New behavior is documented (README/docs/comments as needed)
- [ ] Screenshots or short videos are included for UI changes
- [ ] Any required follow-up tasks are called out

In the PR description, include:

- What changed
- Why it changed
- How you tested it
- Any risks or known limitations

## What to Work On

- Browse [open issues](https://github.com/pedroborgescruz/jukeboxd/issues)
- Look for labels like `good first issue` and `help wanted`
- If you want to work on something not listed, open an issue first

## Reporting Bugs

Please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/logs when relevant
- Environment details (OS, browser, Node version)

## Feature Requests

Feature proposals are welcome. Please describe:

- The problem you are trying to solve
- The proposed solution
- Alternatives considered
- Any impact on existing behavior

## Questions

If something is unclear, open an issue and ask before implementing large changes.
