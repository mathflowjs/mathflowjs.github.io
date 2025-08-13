# Error Handling

## Overview

MathFlow throws errors for invalid syntax or unsupported operations. Use _try/catch_ to handle them:

```ts
import { createContext } from 'mathflow';

const ctx = createContext();

try {
  ctx.solve('invalid = ');
} catch (err) {
  console.error('MathFlow error:', err);
}
```

