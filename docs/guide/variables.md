# Variables

Variables in MathFlow are used to store values and make expressions reusable. They work similar to variables in mathematical notation, making them intuitive for mathematical calculations.

## Variable Basics

### Naming Rules

1. **Start with a letter**
   - Must begin with uppercase or lowercase letter
   - Examples: `x`, `A`, `radius`, `Height`

2. **Case sensitivity**
   - `x` and `X` are different variables
   - `area` and `Area` are different variables

3. **Valid characters**
   - Letters (a-z, A-Z)
   - Numbers (0-9, not at start)
   - Underscores (_)

```js
// Valid variable names
x
y1
radius
total_sum
mass2
velocity_initial

// Invalid variable names
1x          // Can't start with number
@speed      // Can't use special characters
sin         // Can't use function names
```

### Declaration and Assignment

Variables are declared and assigned using the `=` operator:

```sh
# Simple assignments
x = 5
y = 3.14
radius = 10

# Expression assignments
area = pi * radius^2
circumference = 2 * pi * radius

#  Using other variables
total = x + y
average = total / 2
```

## Variable Scoping

Variables in MathFlow are scoped to their [context](../api/index.md).
Learn how to manage variables programmatically [here](../api/index.md#variables). 

## Using Variables

### In Expressions

```sh
# Basic arithmetic
x = 5
y = 2 * x              # 10
z = x + y              # 15

# Complex expressions
t = 2
distance = initial_velocity * t + (acceleration * t^2) / 2

## Multiple variables
base = 4
height = 3
area = (base * height) / 2
```

### In Functions

```sh
# Using variables in function calls
angle = 30
result = sin(angle)

# Multiple variables in functions
x1 = 0
y1 = 0
x2 = 3
y2 = 4
distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)
```

## Best Practices

:::tip
Use your preferred approach to naming variables.
You are recommended that you use variable names just like you would on paper or at least close. 
Add precise comments to describe the use of the variable or significance of an expression.
:::

### 1. Descriptive Names

Choose meaningful variable names that describe their purpose:

```sh
# GOOD
radius = 5
area = pi * radius^2

# LESS CLEAR
r = 5
a = pi * r^2
```

Alternatively, be precise and add comments to describe variables:

```sh
# GOOD

# radius of circle
r = 5

# area of cirlce 
A = pi * r * r

# LESS CLEAR
r = 5
a = pi * r * r
```

### 2. Consistent Naming

Use consistent naming conventions:

```sh
# GOOD - consistent style
initial_velocity = 0
final_velocity = 10
average_velocity = (initial_velocity + final_velocity) / 2

# Bad - mixed styles
initialVel = 0
final_vel = 10
avgVelocity = (initialVel + final_vel) / 2
```

### 3. Intermediate Variables

Use intermediate variables for complex calculations:

```sh
# Hard to read
result = (-b + sqrt(b^2 - 4*a*c)) / (2*a)

# Better
discriminant = b^2 - 4*a*c
numerator = -b + sqrt(discriminant)
denominator = 2*a
result = numerator / denominator

# Descriptive altenative

# compute roots of a quadratic eqaution
x1 = (-b + sqrt(b^2 - 4*a*c)) / (2*a)
x2 = (+b + sqrt(b^2 - 4*a*c)) / (2*a)
```

### 4. Initialize Before Use

Always initialize variables before using them:

```sh
# Good
x = 5
y = 10
sum = x + y

# Will cause error
sum = a + b  # a and b not defined
```

## Common Patterns

### 1. Accumulation

```sh
# Sum calculation
sum = 0
sum = sum + x1
sum = sum + x2
sum = sum + x3
```

### 2. Swapping Values

```sh
# Swap x and y
temp = x
x = y
y = temp
```

### 3. Derived Values

```sh
# Calculate derived quantities
mass = 10
acceleration = 9.81
force = mass * acceleration

# Convert units
celsius = 25
fahrenheit = celsius * 9/5 + 32
```
