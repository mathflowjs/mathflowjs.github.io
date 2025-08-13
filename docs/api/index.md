# Context API

MathFlow configuration is managed through the properties of a context. 

Use the `ContextAPI` for most tasks. This provides a simple interface for solving, rendering, and managing variables/functions/constants.

## Creating a context

- **Type**: `function createContext(options?: Partial<ContextOptions>): ContextAPI`

Use `createContext` to manage isolated or persistent variable scopes:

```ts
import { createContext } from 'mathflow';

const ctx = createContext({
    // ...
})
```

### preferences
You can set preferences when creating a context, or update them at any time. 

```ts
const ctx = createContext({
    preferences: {
        // key: value
    }
})
```

```ts
type Preferences = {
    angles: 'rad' | 'deg';
    fractionDigits: number;
    precision: number;
};
```

#### angles

- **Type**: `rad` - radians | `deg` - degrees
- **Default**: `rad`

Mode of angles - trignometric functions depend on `angles` to handle arguments and return values. 

```ts
const ctx = createContext({
    preferences: {
        angles: 'deg'
    }
})

// or

ctx.preferences.angles = 'deg'

// example: sin(30) = 0.5 in degrees mode
```

#### fractionDigits

- **Type**: `number` 
- **Default**: `15`

Number of digits after the decimal point. Must be in the range `0` - `20`, inclusive.

```ts
const ctx = createContext({
    preferences: {
        fractionDigits: 10
    }
})

// or

ctx.preferences.fractionDigits = 'deg'
```

#### precision

- **Type**: `number` 
- **Default**: `15`

Number of significant digits. Must be in the range 1 - 21, inclusive.

```ts
const ctx = createContext({
    preferences: {
        precision: 20
    }
})

// or

ctx.preferences.precision = 'deg'
```

### variables
You can provide predefined variables to the context at its creation:

- **Type**: `Record<string, number>`

```ts
const ctx = createContext({
    variables: {
        x: 1,
    }
})
```

For an existing context, use:

- **Type**: `Map<string, number>`

```ts
ctx.variables.set('x', 1)
```

### constants

Like [variables](#variables), the constants can be defined in a similar way:

```ts
const ctx = createContext({
    constants: {
        g: 9.81
    }
})

// or

ctx.constants.set('g', 9.81)
```

### functions

Add custom functions to a context.

- **Type**: `(...args: number[]) => number`

```ts
const ctx = createContext({
    functions: {
        double: (x) => 2 * x,
    }
})
```

For an existing context, use:

- **Type**: `Map<string, number>`

```ts
ctx.functions.set('double', (x) => 2 * x)
```

## Solving expressions

### solve

Evaluate a single mathematical expression string

- **Type**: `(code: string) => ({ value: number, solution: string[] })`

```js
ctx.solve('1 + 3 + 5')
// { value: 9, solution: ['4 + 5', '9'] }
```

### solveBatch

Evaluate multiple mathematical expressions at once

- **Type**: `(code: string) => ({ value: number, solution: string[] }[])`

```ts
ctx.solveBatch(`x=2\ny=3x\nz=x+y`)
// [ 
//   { value: 2, solution: ['2'] },
//   { value: 6, solution: ['3 * 2', '6'] },
//   { value: 8, solution: ['2 + 6', '8'] },
// ]
```

## Rendering expressions

### renderAsHTML

- **Type**: 
- [default]
- [description]
- [example]
- [see-also]

### renderAsLaTeX


- **Type**: 
- [default]
- [description]
- [example]
- [see-also]
