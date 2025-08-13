# Procedural API

For full control, use the lower-level API. This is useful for step-by-step evaluation, custom solution tracking, or building your own tools.

## Overview


### tokenize

### parse

### createSolutionStack

### evaluate


## Step-by-step Example
```ts
import { createContext, tokenize, parse, evaluate, createSolutionStack } from 'mathflow';
const ctx = createContext({ variables: { x: 1 } });
const solution = createSolutionStack();
const tokens = tokenize(ctx, '1+2+x');
const ast = parse(tokens);
const value = evaluate(ctx, ast.body[0], solution);
console.log(value); // 4
console.log(solution.steps); // step-by-step solution
```