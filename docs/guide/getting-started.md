# Getting Started

## Prerequisites

Before getting started, make sure you have the following installed:
- [Node.js](https://nodejs.org) 
- [npm](https://npmjs.org) or [pnpm](https://pnpm.io)

## Installation

Install MathFlow with:

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

## Usage

MathFlow exposes two main usage patterns:

### Basic Usage (Recommended)

```js:line-numbers
import { createContext } from 'mathflow';

const ctx = createContext();
const result = ctx.solve('1 * 3 - 2 + 2sin(30)');

console.log(result.value); // 2
```

### Advanced/Procedural Usage

For step-by-step or custom evaluation:

```js:line-numbers
import { 
    createContext,
    tokenize,
    parse,
    evaluate,
    createSolutionStack
} from 'mathflow';

const ctx = createContext();
const solution = createSolutionStack();
const tokens = tokenize(ctx, '1 * 3 - 2 + 2sin(30)');
const ast = parse(tokens);
const value = evaluate(ctx, ast.body[0], solution);

console.log(value); // 2
console.log(solution.steps); // step-by-step solution
```

---

To learn the MathFlow syntax, see the [Syntax](./basics.md) section.
Check the [Examples](./examples/index.md) section for more.
