# Expressions

Expressions in MathFlow are combinations of values, variables, operators, and function calls that can be evaluated to produce a result.

## Expression Types

### 1. Arithmetic Expressions

Basic mathematical calculations using operators:

```sh
# Simple arithmetic
2 + 3 * 4         # 14
(2 + 3) * 4       # 20
2^3 + 4           # 12

# Mixed operations
(3 + 4) * (5 - 2) / 2  # 10.5
```

### 2. Function Expressions

Calls to built-in or custom functions:

```sh
# Basic function calls
sin(30)
sqrt(16)
abs(-5)

# Nested functions
sin(sqrt(x))
log(abs(x - y))

# Multiple arguments
min(x, y, z)
max(2, 3, x, y)
```

### 3. Variable Expressions

Operations involving variables:

```sh
# Simple variable usage
x + y
2 * radius

# Complex expressions
(x^2 + y^2) / 2
velocity * time + (acceleration * time^2) / 2
```

## Expression Structure

### 1. Terms

Terms are the basic building blocks of expressions:

```sh
# Numbers
42
3.14
1.23e-4

# Variables
x
y
radius

# Function calls
sin(x)
sqrt(y)

# Parenthesized expressions
(x + y)
```

### 2. Operators

#### Arithmetic Operators
- `+`: Addition
- `-`: Subtraction or negation
- `*`: Multiplication
- `/`: Division
- `^`: Exponentiation

```sh
# Binary operators
a + b
x * y
base ^ exponent

# Unary operators
-x
+y
```

### 3. Function Calls

```sh
# Basic syntax
functionName(argument)
functionName(arg1, arg2)

# Examples
sin(angle)
max(x, y, z)
sqrt(x^2 + y^2)
```

## Expression Evaluation

### 1. Operator Precedence

Operators are evaluated in this order (highest to lowest):
1. `( )` - Parentheses
2. Function calls
3. `^` - Exponentiation
4. `-` (unary) - Negation
5. `*`, `/` - Multiplication and division
6. `+`, `-` (binary) - Addition and subtraction

```sh
# Examples of precedence
2 + 3 * 4       # 14 (not 20)
-2^2            # -4 (not 4)
2^3 * 4         # 32 (not 64)
sin(30) * 2     # Function call before multiplication
```

### 2. Expression Evaluation Rules

1. **Left-to-Right Evaluation**
   ```sh
   a - b - c      # Evaluated as (a - b) - c
   ```

2. **Function Precedence**
   ```sh
   sin(x) + cos(x)  # Functions evaluated before addition
   2 * sin(x)       # Function evaluated before multiplication
   ```

3. **Implicit Multiplication**
   ```sh
   2x           # Same as 2 * x
   2sin(x)      # Same as 2 * sin(x)
   (x+1)(x-1)   # Same as (x+1) * (x-1)
   ```

## Expression Results

### 1. Return Values

- Each expression produces a single numeric value
- In multi-line scripts, the last expression's value is returned
- Assignment expressions return the assigned value

```sh
# Single expression
2 + 3                  # Returns 5

# Multiple expressions
x = 2                  # Returns 2
y = x * 3              # Returns 6
z = (x + y) / 2        # Returns 4
```

## Best Practices

1. **Use Parentheses for Clarity**
   ```sh
   # Clear intention
   (x + y) * z
   
   # Less clear
   x + y * z
   ```

2. **Break Down Complex Expressions**
   ```sh
   # Hard to read
   result = (-b + sqrt(b^2 - 4*a*c)) / (2*a)
   
   # Better
   discriminant = b^2 - 4*a*c
   numerator = -b + sqrt(discriminant)
   result = numerator / (2*a)
   ```

3. **Use Meaningful Variables**
   ```sh
   # Good
   area = length * width
   
   # Less clear
   a = l * w
   ```

## Common Patterns

### 1. Mathematical Formulas
```sh
# Quadratic formula
x1 = (-b + sqrt(b^2 - 4*a*c)) / (2*a)
x2 = (-b - sqrt(b^2 - 4*a*c)) / (2*a)

# Circle area
area = pi * radius^2

# Pythagorean theorem
c = sqrt(a^2 + b^2)
```

### 2. Scientific Calculations
```sh
# Kinetic energy
ke = (1/2) * mass * velocity^2

# Gravitational force
force = G * (mass1 * mass2) / distance^2

# Wave frequency
frequency = velocity / wavelength
```
