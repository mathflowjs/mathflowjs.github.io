# Built-ins

MathFlow comes with a rich set of built-in constants and functions for mathematical computation. These are available in every context by default.

## Constants

- `pi` : Ratio of a circle's circumference to its diameter (`3.14159...`)
- `e` : Euler's number, the base of natural logarithms (`2.71828...`)

## Functions

### Arithmetic & Numbers

- `add(x, y, ...)` : Sum of arguments
- `sub(x, y)` : Subtraction
- `mul(x, y, ...)` : Product of arguments
- `div(x, y)` : Division
- `abs(x)` : Absolute value
- `ceil(x)` : Ceiling
- `floor(x)` : Floor
- `sqrt(x)` : Square root
- `pow(x, y)` : x to the power y
- `cbrt(x)` : Cube root
- `root(x, y)` : y-th root of x
- `trunc(x)` : Truncate to integer

### Logarithms & Exponentials

- `exp(x)` : e^x
- `ln(x)` : Natural logarithm
- `log(x, y)` : Logarithm of x base y
- `log10(x)` : Base-10 logarithm
- `log2(x)` : Base-2 logarithm

### Trigonometry

> Angle mode can be _degrees_ or _radians_ - See [Preferences](../api/index.md#angles) for details.

- `sin(x)`, `cos(x)`, `tan(x)` : Sine, cosine, tangent
- `asin(x)`, `acos(x)`, `atan(x)` : Inverse trigonometric functions
- `csc(x)`, `sec(x)`, `cot(x)` : Cosecant, secant, cotangent
- `sinh(x)`, `cosh(x)`, `tanh(x)` : Hyperbolic functions
- `asinh(x)`, `acosh(x)`, `atanh(x)` : Inverse hyperbolic functions
- `deg(x)` : Convert radians to degrees
- `rad(x)` : Convert degrees to radians
- `hypot(x, y)` : sqrt(x² + y²)
- `versin(x)` : 1 - cos(x)
- `coversin(x)` : (1 - cos(x)) / 2

## Examples

```js:line-numbers
import { createContext } from '@mathflowjs/mathflow';

const ctx = createContext();

ctx.solve('log(100, 10)');  // 2
ctx.solve('sin(90)');       // 1 (if angles = 'deg')
ctx.solve('sqrt(16)');      // 4
ctx.solve('hypot(3, 4)');   // 5
```

---

See also: [Preferences](../api/index.md#preferences) for angle mode and precision settings.
