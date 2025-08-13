# Basic Syntax

This guide covers the fundamental syntax elements of MathFlow, a powerful mathematical expression parser and evaluator.

## Overview

MathFlow's syntax is designed to be:

- **Intuitive**: Similar to standard mathematical notation
- **Flexible**: Supports various writing styles
- **Forgiving**: Handles different spacing and formatting
- **Expressive**: Rich set of operations and functions

## Lexical Structure

### Comments

Comments in MathFlow start with a hash symbol (`#`) and continue to the end of the line:

```sh
# This is a single line comment
2 + 3     # Calculate sum
x = 5     # Assign value to x
```

### Whitespace

MathFlow is whitespace-insensitive. Spaces, tabs, and newlines are ignored except to separate tokens:

```sh
# These are equivalent:
2+3*4
2 + 3 * 4
2  +  3  *  4

# These are also equivalent:
sin(30)
sin (30)
sin ( 30 )
```

### Numbers

MathFlow supports various numeric formats:

```sh
# Integers
42
-17

# Decimals
3.14
-0.001

# Scientific notation
1.23e4    # 12300
1.23e-4   # 0.000123

# Special values
Infinity
-Infinity
```

### Operators

#### Arithmetic Operators

```sh
a + b    # Addition
a - b    # Subtraction
a * b    # Multiplication
a / b    # Division
a ^ b    # Exponentiation (power)
-a       # Negation (unary minus)
```

#### Assignment Operator

```sh
x = 5    # Assign 5 to variable x
```

### Grouping

Use parentheses for grouping and controlling evaluation order:

```sh
2 * (3 + 4)     # 14 (not 10)
(1 + 2) * (3 + 4)  # 21

# Nested parentheses
((2 + 3) * 4) + 5  # 25
```

## Expression Structure

### Simple Expressions

```sh
# Basic arithmetic
2 + 3
4 * 5 - 1

# Using variables
x + y
2 * radius

# Using functions
sin(30)
sqrt(16)
```

### Compound Expressions

```sh
# Multiple operations
2 * x + y / 4

# Function composition
sin(sqrt(x))

# Complex calculations
(-b + sqrt(b^2 - 4*a*c)) / (2*a)
```

### Multiple Lines

```sh
# Sequential calculations
x = 5
y = 2 * x
z = x + y

# Functions with multiple arguments
point_distance(x1, y1, x2, y2)

# Multi-line expressions
(sin(x)^2 +
 cos(x)^2)
```

## Implicit Multiplication

MathFlow supports implicit multiplication between:

- Numbers and variables: `2x` = `2 * x`
- Numbers and functions: `2sin(x)` = `2 * sin(x)`
- Variables: `xy` = `x * y`
- Parentheses: `2(x+y)` = `2 * (x+y)`

```sh
# These are equivalent:
2x + 3y
2 * x + 3 * y

# These are also equivalent:
2sin(30)
2 * sin(30)
```

## Operator Precedence

Operators are evaluated in this order (highest to lowest):

1. Parentheses `()`
2. Functions `sin(), cos(), etc.`
3. Exponentiation `^`
4. Unary minus `-`
5. Multiplication `*` and Division `/`
6. Addition `+` and Subtraction `-`
7. Assignment `=`

```sh
# Examples of precedence:
2 + 3 * 4       # 14 (not 20)
-2^2            # -4 (not 4)
2^3 * 4         # 32 (not 64)
x = y = 5       # Assigns 5 to both x and y
```

## Error Handling

MathFlow provides clear error messages for common syntax issues:

```sh
2 +             # Incomplete expression
2 * * 3         # Invalid operator sequence
(2 + 3          # Unmatched parenthesis
sin 30          # Missing parentheses
```

## Style Guidelines

While MathFlow is flexible with syntax, these guidelines improve readability:

1. **Use Spaces** around operators:

    ```sh
    x = 2 * y + 5  # Good
    x=2*y+5        # Less readable
    ```

2. **One Expression per Line**:

    ```sh
    # Good
    x = 5
    y = 2 * x

    # Less readable
    x = 5; y = 2 * x
    ```

3. **Use Parentheses** for clarity:

    ```sh
    (a + b) * c    # Clear precedence
    a + b * c      # Less clear
    ```

4. **Meaningful Variable Names**:

    ```sh
    radius = 5          # Clear purpose
    r = 5              # Less clear
    ```

5. **Add Comments** for complex expressions:
    ```sh
    # Calculate discriminant
    b^2 - 4*a*c
    ```
