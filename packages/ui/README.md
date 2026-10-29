# @schema-visualizer/ui

React components for rendering an interactive schema documentation tree. Can be used with any
React app.

## Features
- Interactive Collapsible Tree: Explore complex nested objects, arrays, and union/discriminated union branches.
- Type Badges: Color-coded badges for primitives, enums, literals, unions, and more.
- CSS Modules & Theme Tokens: Pure CSS Modules built with Vite, preventing layout breaking in host documentation sites.
- Native Theme Switching: Out-of-the-box support for dark, light, and custom themes via CSS Custom Properties.

## Installation

```
npm install @schema-visualizer/ui @schema-visualizer/core react react-dom
```

## Quick Start

Import the parser, component and the bundled stylesheet into your application or documentation framework.

```
import { z } from 'zod';
import { parseZodSchema } from '@schema-visualizer/core';
import { SchemaViewer } from '@schema-visualizer/ui';

// Import CSS module stylesheet
import '@schema-visualizer/ui/styles.css';

const userSchema = z.object({
  username: z.string().min(3).max(20).describe('Unique handle'),
  role: z.enum(['admin', 'member']),
  age: z.number().min(18).optional(),
  notification: z.discriminatedUnion('type', [
    z.object({ type: z.literal('email'), email: z.string().email() }),
    z.object({ type: z.literal('sms'), phone: z.string() })
  ])
});

export default function ApiReference() {
  const ast = parseZodSchema(userSchema);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <SchemaViewer 
        schema={ast}
        title="UserProfile Payload Schema" 
        enableSandbox={true} 
      />
    </div>
  );
}

```

## Usage in Astro Starlight (MDX)

Add `@schema-visualizer/ui/styles.css` to your `astro.config.mjs` and render directly inside `.mdx` files.

```
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    starlight({
      title: 'API Documentation',
      customCss: ['@schema-visualizer/ui/styles.css'],
    }),
    react(),
  ],
});

```

Then in your `.mdx` file:

```
---
title: User API Reference
---

import { SchemaViewer } from '@schema-visualizer/ui';
import { parseZodSchema } from '@schema-visualizer/core';
import { userProfileSchema } from '../schemas/user';

# Create User Payload

<SchemaViewer schema={parseZodSchema(userProfileSchema)} title="UserSchema" client:load />

```

## License

MIT