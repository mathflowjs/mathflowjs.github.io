# Examples

This section provides practical examples of using MathFlow in different scenarios.

## Basic Usage

### Simple Calculations

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext();

// Basic arithmetic
console.log(ctx.solve('2 + 3 * 4'));  // 14
console.log(ctx.solve('(2 + 3) * 4')); // 20

// Powers and roots
console.log(ctx.solve('2^3'));     // 8
console.log(ctx.solve('sqrt(16)')); // 4
```

### Working with Variables

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext({
    variables: {
        x: 5,
        y: 3
    }
});

// Using variables in expressions
console.log(ctx.solve('2*x + y'));   // 13
console.log(ctx.solve('x^2 + y^2')); // 34

// Dynamic variable updates
ctx.variables.set('z', 10);
console.log(ctx.solve('x + y + z')); // 18
```

## Advanced Examples

### Solving Equations in Steps

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const steps = ctx.solveBatch(`
    x = 5
    y = 3*x
    z = x^2 + y
    result = z/2
`);

// Each step shows work and final value
steps.forEach(step => {
    console.log(step.solution);
    console.log('= ' + step.value);
});
```

### Working with Functions

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext({
    functions: {
        // Custom average function
        avg: (...args) => args.reduce((a, b) => a + b) / args.length,
        // Area of a circle
        circleArea: (r) => Math.PI * r * r
    }
});

console.log(ctx.solve('avg(1, 2, 3, 4)')); // 2.5
console.log(ctx.solve('circleArea(5)'));    // 78.54...
```

### Trigonometry

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext({
    preferences: {
        angles: 'deg' // Use degrees instead of radians
    }
});

// Basic trigonometry
console.log(ctx.solve('sin(30)'));  // 0.5
console.log(ctx.solve('cos(60)'));  // 0.5
console.log(ctx.solve('tan(45)'));  // 1

// Complex expressions
console.log(ctx.solve('sin(x)^2 + cos(x)^2')); // 1
```

### LaTeX Output

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext();

const expr = '1/2 + sqrt(x^2 + y^2)';

// Get LaTeX for display mode
const latex = ctx.renderAsLaTeX(expr, {
    mode: 'display'
});

console.log(latex);
// $$\frac{1}{2} + \sqrt{x^2 + y^2}$$
```

### HTML Rendering

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext();

const expr = 'sin^2(x) + cos^2(x) = 1';

// Get interactive HTML with dark theme
const {html, css} = ctx.renderAsHTML(expr, {
    colorScheme: 'dark'
});

document.getElementById('math').innerHTML = `<style>${css}</style>${html}`;
```

## Real-World Applications

### Financial Calculations

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext({
    functions: {
        // Future Value calculation
        FV: (pv, r, n) => pv * Math.pow(1 + r, n),
        // Monthly Payment calculation
        PMT: (pv, r, n) => {
            const monthlyRate = r / 12;
            return pv * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
        }
    }
});

// Calculate future value of $1000 at 5% for 3 years
console.log(ctx.solve('FV(1000, 0.05, 3)')); // 1157.63

// Calculate monthly payment for $200000 loan at 3.5% for 30 years
console.log(ctx.solve('PMT(200000, 0.035, 360)')); // 898.09
```

### Physics Equations

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext({
    constants: {
        g: 9.81,    // Gravity
        pi: Math.PI
    },
    functions: {
        // Kinetic energy
        KE: (m, v) => 0.5 * m * v * v,
        // Period of a pendulum
        period: (l) => 2 * Math.PI * Math.sqrt(l / 9.81)
    }
});

// Calculate kinetic energy
console.log(ctx.solve('KE(2, 5)')); // 25 (2kg mass at 5m/s)

// Calculate pendulum period
console.log(ctx.solve('period(2)')); // 2.84s (2m length)
```

### Geometry

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext({
    functions: {
        // Triangle area using Heron's formula
        triangleArea: (a, b, c) => {
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        },
        // Regular polygon area
        polygonArea: (n, r) => {
            return (n * r * r * Math.sin(2 * Math.PI / n)) / 2;
        }
    }
});

// Area of triangle with sides 3, 4, 5
console.log(ctx.solve('triangleArea(3, 4, 5)')); // 6

// Area of regular hexagon with radius 2
console.log(ctx.solve('polygonArea(6, 2)')); // 10.39
```

## Error Handling Examples

### Graceful Error Handling

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

function safeSolve(expr: string) {
    try {
        const ctx = createContext();
        return {
            success: true,
            value: ctx.solve(expr)
        };
    } catch (error) {
        return {
            success: false,
            error: error.toString(),
            suggestion: error.suggestion
        };
    }
}

// Examples
console.log(safeSolve('1 + 2'));        // { success: true, value: 3 }
console.log(safeSolve('1 + / 2'));      // { success: false, error: "SyntaxError: ..." }
console.log(safeSolve('undefined_var')); // { success: false, error: "RuntimeError: ..." }
```

### Input Validation

```ts:line-numbers
import { createContext } from '@mathflowjs/mathflow';

function validateExpression(expr: string) {
    const ctx = createContext();
    const issues = [];

    // Check for basic syntax
    try {
        ctx.tokenize(expr);
    } catch (error) {
        issues.push({
            type: 'syntax',
            message: error.message
        });
    }

    // Check for undefined variables
    const variables = new Set();
    expr.match(/[a-zA-Z_]\w*/g)?.forEach(name => {
        if (!ctx.variables.has(name) && !ctx.functions.has(name)) {
            variables.add(name);
        }
    });

    if (variables.size > 0) {
        issues.push({
            type: 'variables',
            message: `Undefined variables: ${Array.from(variables).join(', ')}`
        });
    }

    return issues;
}

// Example usage
console.log(validateExpression('x + y'));
// [{ type: 'variables', message: 'Undefined variables: x, y' }]
```
