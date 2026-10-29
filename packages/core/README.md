# @schema-visualizer/core

The multi-schema introspection engine for Schema Visualizer. Parses runtime schemas and normalizes them into a framework-agnostic, JSON-serializable Intermediate Representation (AST). Currently Zod v4+ is supported. JSON Schema is the next in the pipeline.

## Installation

```
npm install @schema-visualizer/core zod
```

## Usage

### Parsing a Zod schema

```
import { z } from 'zod';
import { parseZodSchema } from '@schema-visualizer/core';

// Define a schema with modern Zod 4 features
const userProfileSchema = z.object({
  username: z.string().min(3).max(20).describe('Unique user handle'),
  bio: z.string().optional().describe('Optional biography'),
  age: z.number().min(18).describe('User age, must be 18+'),
  role: z.enum(['admin', 'moderator', 'member']),
  notificationChannel: z.discriminatedUnion('type', [
    z.object({ type: z.literal('email'), address: z.string().email() }),
    z.object({ type: z.literal('sms'), phoneNumber: z.string() })
  ]).describe('Preferred alert delivery channel')
});

// Normalize into the Unified Intermediate Representation (AST)
const ast = parseZodSchema(userProfileSchema);

console.log(JSON.stringify(ast, null, 2));
```

### AST Interface

This interface has not yet been standardized and is likely to change drastically until v1.