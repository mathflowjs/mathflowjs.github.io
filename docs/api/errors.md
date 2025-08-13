# Error Handling

MathFlow provides comprehensive error handling to help you debug and handle issues in mathematical expressions.

## Error Types

MathFlow has three main types of errors:

### LexicalError

Occurs during the tokenization phase when the input string contains invalid characters or tokens.

**Common causes**:

- Invalid characters in expressions
- Malformed numbers
- Unknown operators

**Example**:

```ts
try {
	ctx.solve("2 @ 3"); // Invalid operator @
} catch (error) {
	if (error.type === "LexicalError") {
		console.log(error.message);
		// Invalid character '@' at position 2
	}
}
```

### SyntaxError

Occurs during parsing when the expression structure is invalid.

**Common causes**:

- Mismatched parentheses
- Invalid function calls
- Missing operators
- Incorrect expression structure

**Example**:

```ts
try {
	ctx.solve("2 + * 3"); // Invalid syntax: consecutive operators
} catch (error) {
	if (error.type === "SyntaxError") {
		console.log(error.message);
		// Unexpected operator '*' after operator '+'
	}
}
```

### RuntimeError

Occurs during evaluation when mathematical operations fail.

**Common causes**:

- Division by zero
- Invalid function arguments
- Undefined variables
- Numeric overflow

**Example**:

```ts
try {
	ctx.solve("1/0"); // Division by zero
} catch (error) {
	if (error.type === "RuntimeError") {
		console.log(error.message);
		// Division by zero
	}
}
```

## Error Structure

All errors in MathFlow follow a consistent structure:

```ts
interface MathFlowError {
	name: "MathFlowError";
	type: "LexicalError" | "SyntaxError" | "RuntimeError";
	message: string;
	suggestion: string | null;
	toString(): string;
}
```

### Error Properties

- `name`: Always 'MathFlowError' for easy type checking
- `type`: Specific error category
- `message`: Detailed error description
- `suggestion`: Optional hint for fixing the error
- `toString()`: Formatted error message with suggestion if available

## Best Practices

### 1. Use Try-Catch Blocks

Always wrap MathFlow operations in try-catch blocks when handling user input:

```ts
try {
	const result = ctx.solve(userInput);
	displayResult(result);
} catch (error) {
	if (error.name === "MathFlowError") {
		handleMathFlowError(error);
	} else {
		throw error; // Re-throw unexpected errors
	}
}
```

### 2. Error Type Checking

Check error types to provide appropriate feedback:

```ts
function handleMathFlowError(error) {
	switch (error.type) {
		case "LexicalError":
			// Handle invalid characters/tokens
			break;
		case "SyntaxError":
			// Handle invalid expression structure
			break;
		case "RuntimeError":
			// Handle evaluation errors
			break;
	}
}
```

### 3. User Feedback

Use error suggestions to help users fix issues:

```ts
function displayError(error) {
	const message = error.toString();
	// "SyntaxError: unexpected token '9' at 3:5 - expecting ')'"
	showErrorToUser(message);
}
```

### 4. Variable Validation

Check variables before evaluation to prevent runtime errors:

```ts
const ctx = createContext();

// Validate variables before solving
function safeEvaluate(expr, variables) {
	for (const [name, value] of Object.entries(variables)) {
		if (typeof value !== "number" || !isFinite(value)) {
			throw createError(
				"RuntimeError",
				`Invalid value for variable '${name}'`,
				"Use finite numeric values only"
			);
		}
	}

	ctx.variables.clear();

	Object.entries(variables).forEach(([k, v]) => ctx.variables.set(k, v));

	return ctx.solve(expr);
}
```
