# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

VitePress documentation site for [MathFlow](https://github.com/mathflowjs/mathflow) (`@mathflowjs/mathflow`), served at https://mathflow.js.org. The library itself lives in a separate repo; this repo only holds docs plus an interactive playground.

## Commands

Uses pnpm (CI uses pnpm 10).

- `pnpm dev`: local dev server (`vitepress dev docs`)
- `pnpm build`: production build to `docs/.vitepress/dist`
- `pnpm format`: Prettier write over `docs/`
- `pnpm check`: Prettier check over `docs/`

There are no tests or linters beyond Prettier. `pnpm build` is the only real verification, since it fails on broken pages and dead internal links.

## Architecture

- `docs/` is the VitePress source root. Each `.md` file is a page.
- `docs/.vitepress/config.ts` holds the nav and sidebar. Both are hand-maintained, so a new page has to be added there to show up. The version label (`v2.0.0`) in the nav is also hardcoded there.
- `docs/.vitepress/theme/index.ts` extends the default theme and registers `Playground` as a global component. `docs/playground/index.md` renders it inside `<ClientOnly>` because it runs the library in the browser.
- The playground is a single component, `theme/components/Playground.vue`, built from two `computed`s that re-run on every edit:
  - `output` creates a fresh context on each run, so no variables leak between runs. It then calls `ctx.solve` once per line, which gives each line its own result or error. Each line is prefixed with `"\n".repeat(i)` so error positions match the editor's line numbers.
  - `program` produces the whole-program Tokens, LaTeX, and HTML tabs.
  - The colour scheme comes from VitePress's `isDark`, not `"auto"`. `"auto"` follows the OS rather than the site toggle.
- MathFlow v2 behaviour the playground works around:
  - `ctx.solve` only evaluates the first line of its input.
  - Multi-line expressions don't parse.
  - `log(x, base)` needs a base; `log(100)` returns `NaN`.
  - Undefined variables silently evaluate to `0`.
  - `fractionDigits: 0` means no rounding.
  - The renderer's CSS has to be injected separately; the playground does this once with `<component is="style">`.
- The API pages (`docs/api/*.md`) document the `@mathflowjs/mathflow` version installed as a dependency. Check signatures against `node_modules/@mathflowjs/mathflow/dist/index.d.ts` before documenting or changing API usage.

## Conventions

- Prettier: tabs (width 4), double quotes, semicolons, `trailingComma: es5`.
- Code samples in the docs use `ts` fences, or `ts:line-numbers` in the examples.
- Brand color `#4169e1` is set in `config.ts` (theme-color) and `theme/assets/styles.css` (`--vp-c-brand-1`).

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` under `docs/`, and can also be run manually. It builds and publishes `docs/.vitepress/dist` with `peaceiris/actions-gh-pages`. The custom domain comes from `docs/public/CNAME`.
