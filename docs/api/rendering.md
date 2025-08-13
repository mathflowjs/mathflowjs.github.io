# Rendering Math Expressions

MathFlow supports rendering mathematical expressions as HTML and LaTeX for use in web applications, documentation, or scientific publishing.

## HTML Rendering

You can render mathematical expressions as HTML with customizable styling and theme support. The rendered output includes built-in CSS for proper display of mathematical symbols and expressions.

### renderAsHTML

You can render MathFlow code as HTML using the context API (recommended):

```ts
import { createContext } from "mathflow";

const ctx = createContext();
const html = ctx.renderAsHTML("sin(x) + 2^3", {
	/* options */
});
// html: '<span>sin(x) + 2<sup>3</sup></span>'
```

### renderTokensAsHTML

For advanced usage, tokenize an expression and render manually:

```ts
import { createContext, tokenize, renderTokensAsHTML } from "mathflow";

const ctx = createContext();
const tokens = tokenize(ctx, "sin(x) + 2^3");
const html = renderTokensAsHTML(tokens, {
	/* options */
});
```

### Options

You can customize the HTML output using `HTMLRenderOptions` listed below:

- `classPrefix`: Prefix for CSS classes (default: `mf`)
- `colorScheme`: Color scheme selection (`none` | `auto` | `light` | `dark`)
- `includeDebugInfo`: Include position data attributes for debugging (`true` or `false`)

**Default Options**:

```ts
{
  classPrefix: 'mf',
  colorScheme: 'none',
  includeDebugInfo: false
}
```

## LaTeX Rendering

You can convert mathematical expressions to LaTeX format, suitable for use with LaTeX renderers or math typesetting systems.

### renderAsLaTeX

You can render MathFlow code as LaTeX using the context API (recommended):

```ts
import { createContext } from "mathflow";

const ctx = createContext();

const latex = ctx.renderAsLaTeX("sqrt(4) + pi", { mode: "inline" });
// latex: '$\\sqrt{4} + \\pi$'
```

### renderTokensAsLaTeX

For advanced usage, tokenize an expression and render manually:

```ts
import { createContext, tokenize, renderTokensAsLaTeX } from "mathflow";

const ctx = createContext();

const tokens = tokenize(ctx, "sqrt(4) + pi");

const latex = renderTokensAsLaTeX(tokens, {
	/* options */
});
```

### Options

You can customize the LaTeX output using `LaTeXRenderOptions` listed below:

- `mode`: LaTeX math mode (`inline` | `display` | `align`)

**Default Options**:

```ts
{
	mode: "inline";
}
```

## Use Cases

- Displaying results in web-based math editors
- Exporting expressions for scientific papers
