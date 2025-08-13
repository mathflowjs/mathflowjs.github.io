# Procedural API

The procedural API provides low-level access to MathFlow's core components, offering fine-grained control over the expression parsing and evaluation process.

## Overview

MathFlow's processing pipeline consists of four main stages:

1. **Tokenization**: Converting raw text into tokens (lexical analysis)
2. **Parsing**: Converting tokens into an Abstract Syntax Tree (AST)
3. **Evaluation**: Computing the final value from the AST
4. **Solution Tracking**: Recording step-by-step evaluation details

### Use Cases
- Implementing custom evaluation strategies
- Tracking step-by-step solutions
- Building tools and extensions
- Advanced error handling
- Creating custom syntax implementations
- Integrating with other systems

## Core Components

### tokenize
`function tokenize(ctx: Context, input: string): Token[]`

Converts a string input into a sequence of tokens.

```ts
import { createContext, tokenize, TOKEN } from 'mathflow';

const ctx = createContext()

const tokens = tokenize(ctx, '2*x + 1');
// [
//   { type: TOKEN.NUMBER, value: '2', line: 1, column: 1 },
//   { type: TOKEN.OPERATOR, value: '*', line: 1, column: 2 },
//   { type: TOKEN.IDENTIFIER, value: 'x', line: 1, column: 3 },
//   { type: TOKEN.OPERATOR, value: '+', line: 1, column: 5 },
//   { type: TOKEN.NUMBER, value: '1', line: 1, column: 7 }
// ]
```

**Token Types**:
```ts
enum TOKEN {
    NUMBER,
    IDENTIFIER,
    OPERATOR,
    FUNCTION,
    LPAREN,
    RPAREN,
    COMMA,
    ASSIGNMENT,
    NEWLINE,
    EOF
}

type Token = {
    type: TOKEN
    value: string
    column: number
    line: number
    position: number
}
```

### parse
`function parse(tokens: Token[]): Node`

Converts a sequence of tokens into an Abstract Syntax Tree (AST).

```ts
import { parse, NODE } from 'mathflow';

const ast = parse(tokens);
// {
//   type: NODE.PROGRAM,
//   body: [{
//     type: NODE.BINARY,
//     operator: '+',
//     left: {
//       type: NODE.BINARY,
//       operator: '*',
//       left: { type: NODE.NUMBER, value: 2 },
//       right: { type: NODE.IDENTIFIER, name: 'x' }
//     },
//     right: { type: NODE.NUMBER, value: 1 }
//   }]
// }
```

**Node Types**:
```ts
enum NODE {
    PROGRAM,
    BINARY,
    UNARY,
    NUMBER,
    IDENTIFIER,
    CALL,
    ASSIGNMENT
}
```

### createSolutionStack
`function createSolutionStack(): Solution`

Creates a new solution stack for tracking evaluation steps.

```ts
import { createSolutionStack } from 'mathflow';

const solution = createSolutionStack();

// evaluate expression with `solution` buffer

console.log(solution.steps); // [ ... ]
```

### evaluate
`function evaluate(ctx: Context, node: Node, solution?: Solution): number`

Evaluates an AST node in the given context.

```ts
import { evaluate } from 'mathflow';

const value = evaluate(ctx, ast.body[0], solution);

console.log(value); // Numeric result
```

## Complete Example

Here's a complete example showing how to use all components together:

```ts
import { 
    createContext,
    tokenize,
    parse,
    evaluate,
    createSolutionStack,
    TOKEN,
    NODE
} from 'mathflow';

// 1. Create context with variables
const ctx = createContext({
    variables: { x: 5 }
});

// 2. Create solution tracker
const solution = createSolutionStack();

// 3. Process expression
const expression = '2*x + sin(30)';

// 4. Tokenize
const tokens = tokenize(ctx, expression);
console.log('Tokens:', tokens);

// 5. Parse
const ast = parse(tokens);
console.log('AST:', ast);

// 6. Evaluate
const value = evaluate(ctx, ast.body[0], solution);

console.log('Result:', value);
console.log('Steps:', solution.steps);
```

## Advanced Usage

### Custom Token Processing

```ts
import { Token, TOKEN } from 'mathflow';

function analyzeTokens(tokens: Token[]) {
    return tokens.reduce((info, token) => {
        info.types.add(token.type);
        if (token.type === TOKEN.IDENTIFIER) {
            info.variables.add(token.value);
        }
        return info;
    }, {
        types: new Set<TOKEN>(),
        variables: new Set<string>()
    });
}
```

### AST Transformation

```ts
import { Node, NODE } from 'mathflow';

// ...

function simplifyAST(node: Node): Node {
    // Handle numbers
    if (node.type === NODE.NUMBER) {
        return node;
    }

    // Simplify binary expressions
    if (node.type === NODE.BINARY) {
        const left = simplifyAST(node.left);
        const right = simplifyAST(node.right);

        // If both operands are numbers, compute the result
        if (left.type === NODE.NUMBER && right.type === NODE.NUMBER) {
            return {
                type: NODE.NUMBER,
                value: evaluate(ctx, {
                    type: NODE.BINARY,
                    operator: node.operator,
                    left,
                    right
                })
            };
        }

        return {
            ...node,
            left,
            right
        };
    }

    return node;
}
```

### Custom Evaluation Strategy

```ts
import { Context, Node } from 'mathflow';

function evaluateWithTimeout(
    ctx: Context,
    node: Node,
    timeout: number = 1000
): Promise<number> {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error('Evaluation timeout'));
        }, timeout);

        try {
            const result = evaluate(ctx, node);
            clearTimeout(timeoutId);
            resolve(result);
        } catch (error) {
            clearTimeout(timeoutId);
            reject(error);
        }
    });
}
```

## Best Practices

1. **Token Management**
   - Keep track of token positions for error reporting

2. **AST Operations**
   - Implement AST visitors for complex transformations
   - Cache AST for repeated evaluations

3. **Error Handling**
   - Implement specific error types for each phase

## Performance Considerations

1. **Tokenization**
   - Cache tokens for frequently used expressions

2. **Evaluation**
   - Cache computed values when possible
   - Implement lazy evaluation for large expressions
   - Use optimized math functions for common operations