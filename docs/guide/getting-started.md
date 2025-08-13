# Getting Started

## Introduction

MathFlow is a powerful mathematical expression parser and evaluator for JavaScript/TypeScript. It provides a robust way to parse, evaluate, and work with mathematical expressions in your applications.

## Prerequisites

Before getting started, ensure you have:

- [Node.js](https://nodejs.org) (version 20 or higher)
- A package manager: [npm](https://npmjs.org), [pnpm](https://pnpm.io), [yarn](https://yarnpkg.com), or [bun](https://bun.sh)
- [TypeScript](https://typescript.org) (optional, but recommended for better development experience)

## Installation

Install MathFlow using your preferred package manager:

:::code-group

```sh [npm]
$ npm install mathflow
```

```sh [pnpm]
$ pnpm add mathflow
```

```sh [yarn]
$ yarn add mathflow
```

```sh [bun]
$ bun add mathflow
```

:::

## Quick Start

Here's a simple example to get you started:

```ts:line-numbers
import { createContext } from 'mathflow';

// Create a new context
const ctx = createContext();

// Evaluate a simple expression
const result = ctx.solve('2 * (3 + 4)');
console.log(result.value); // 14
```

## Basic Usage Patterns

This section uses the [Context API](../api/index.md) which provides a simple interface for solving, rendering, and managing variables, functions or constants.

### 1. Simple Calculations

```ts:line-numbers
import { createContext } from 'mathflow';

const ctx = createContext();

// Basic arithmetic
console.log(ctx.solve('2 + 3 * 4').value);     // 14
console.log(ctx.solve('(2 + 3) * 4').value);   // 20
console.log(ctx.solve('2^3 + sqrt(16)').value); // 12
```

### 2. Working with Variables

```ts:line-numbers
import { createContext } from 'mathflow';

const ctx = createContext();

// Set variables
ctx.variables.set('x', 5);
ctx.variables.set('y', 3);

// Use variables in expressions
console.log(ctx.solve('2*x + y').value);   // 13
console.log(ctx.solve('x^2 + y^2').value); // 34
```

### 3. Custom Functions

```ts:line-numbers
import { createContext } from 'mathflow';

const ctx = createContext({
    functions: {
        // Average of numbers
        avg: (...args) => args.reduce((a, b) => a + b) / args.length,
        // Area of a circle
        circleArea: (r) => Math.PI * r * r
    }
});

console.log(ctx.solve('avg(1, 2, 3, 4)').value);  // 2.5
console.log(ctx.solve('circleArea(5)').value);    // 78.54...
```

## Advanced Usage

For more control over the evaluation process, MathFlow provides a [Procedural API](../api/procedural.md) along side the [Context API](../api/index.md):

```ts:line-numbers
import {
    createContext,
    tokenize,
    parse,
    evaluate,
    createSolutionStack
} from 'mathflow';

const ctx = createContext();
const solution = createSolutionStack();

// Step 1: Tokenize the expression
const tokens = tokenize(ctx, '1 * 3 - 2 + 2*sin(30)');

// Step 2: Parse tokens into an AST
const ast = parse(tokens);

// Step 3: Evaluate the AST
const value = evaluate(ctx, ast.body[0], solution);

// Get the step-by-step solution
console.log(solution.steps);
```

## Error Handling

Always wrap MathFlow operations in `try-catch` blocks when working with user input:

```ts
try {
	const result = ctx.solve(userInput);
	displayResult(result.value);
} catch (error) {
	if (error.name === "MathFlowError") {
		console.error(`${error.type}: ${error.message}`);
		if (error.suggestion) {
			console.info("Suggestion:", error.suggestion);
		}
	}
}
```

## Next Steps

- Learn about [Basic Syntax](./basics.md)
- Explore [Built-in Functions](./builtin.md)
- See practical [Examples](../examples/index.md)
- Check the [API Reference](../api/index.md)
- Try the online [Playground](../playground/index.md)

For more advanced features and comprehensive examples, continue through the documentation.
