# Rendering Math Expressions

MathFlow supports rendering mathematical expressions as HTML and LaTeX for use in web applications, documentation, or scientific publishing.

## HTML Rendering


You can render MathFlow code as HTML using the context API (recommended):

```ts
import { createContext } from 'mathflow';

const ctx = createContext();
const html = ctx.renderAsHTML('sin(x) + 2^3');
// html: '<span>sin(x) + 2<sup>3</sup></span>'
```

Or, for advanced usage, tokenize and render manually:

```ts
import { createContext, tokenize, renderTokensAsHTML } from 'mathflow';

const ctx = createContext();
const tokens = tokenize(ctx, 'sin(x) + 2^3');
const html = renderTokensAsHTML(tokens);
```

### Options
You can customize the HTML output using `HTMLRenderOptions`.


## LaTeX Rendering


You can render MathFlow code as LaTeX using the context API (recommended):

```ts
import { createContext } from 'mathflow';

const ctx = createContext();
const latex = ctx.renderAsLaTeX('sqrt(4) + pi', { mode: 'inline' });
// latex: '$\\sqrt{4} + \\pi$'
```

Or, for advanced usage, tokenize and render manually:

```ts
import { createContext, tokenize, renderTokensAsLaTeX } from 'mathflow';
const ctx = createContext();
const tokens = tokenize(ctx, 'sqrt(4) + pi');
const latex = renderTokensAsLaTeX(tokens);
```

### Options
You can customize the LaTeX output using `LaTeXRenderOptions`.

## Use Cases
- Displaying results in web-based math editors
- Exporting expressions for scientific papers
- Integrating with markdown or documentation tools

---

See also: [API Reference](../api/index.md)
