import { z } from 'zod';
import { SchemaNode, FieldType } from '../ast.js';

export function parseZodSchema(schema: z.ZodType): SchemaNode {
  let current = schema;
  let isRequired = true;
  let isNullable = false;
  let defaultValue: any = undefined;

  while (current) {
    const def = current.def;
    if (!def) break;

    if (def.type === 'optional') {
      isRequired = false;
      current = (def as z.ZodOptional['def']).innerType as z.ZodType;
      continue;
    }

    if (def.type === 'nullable') {
      isNullable = true;
      current = (def as z.ZodNullable['def']).innerType as z.ZodType;
      continue;
    }

    if (def.type === 'default') {
      isRequired = false;
      defaultValue = (def as z.ZodDefault['def']).defaultValue;
      current = (def as z.ZodDefault['def']).innerType as z.ZodType;
      continue;
    }
    if (def.type === 'readonly' || def.type === 'catch') {
      current = (def as z.ZodReadonly['def'] | z.ZodCatch['def']).innerType as z.ZodType;
      continue;
    }
    break;
  }

  const def = current._zod?.def;
  const typeName = def?.type;
  let nodeType: FieldType = 'string';
  let description = schema.description;
  let constraints: SchemaNode['constraints'] = {};

  switch(typeName) {
    case 'string': {
      if (def.checks) {
        for (const check of (def as z.ZodString['def']).checks ?? []) {
          const checkDef = check._zod?.def;
          if (!checkDef) continue;

          switch (checkDef.check) {
            case 'min_length':
              constraints.min = (checkDef as z.core.$ZodCheckMinLength['_zod']['def']).minimum;
              break;

            case 'max_length':
              constraints.max = (checkDef as z.core.$ZodCheckMaxLength['_zod']['def']).maximum;
              break;
          }
          // if (check.kind === 'regex') constraints.regex = check.regex?.source || check.value;
        }
      }
      break;
    }

    case 'number': {
      nodeType = 'number';
      if (def.checks) {
        for (const check of (def as z.ZodNumber['def']).checks ?? []) {
          const checkDef = check._zod.def;
          if (!checkDef) continue;

          switch (checkDef.check) {
            case 'greater_than':
              constraints.min = (checkDef as z.core.$ZodCheckGreaterThan['_zod']['def']).value as number;
              break;

            case 'less_than':
              constraints.max = (checkDef as z.core.$ZodCheckLessThan['_zod']['def']).value as number;
              break;
          }
        }
      }
      break;
    }

    case 'boolean': {
      nodeType = 'boolean';
      break;
    }

    case 'object': {
      nodeType = 'object';
      const shape = (def as z.ZodObject['def']).shape;
      const properties: Record<string, SchemaNode> = {};
      if (shape) {
        for (const [key, subSchema] of Object.entries(shape)) {
          properties[key] = parseZodSchema(subSchema as z.ZodType);
        }
      }
      return {
        type: nodeType,
        required: isRequired,
        description,
        properties,
        defaultValue,
      };
    }

    case 'array': {
      nodeType = 'array';
      const elementSchema= (def as z.ZodArray['def']).element;
      return {
        type: nodeType,
        required: isRequired,
        description,
        items: elementSchema ? parseZodSchema(elementSchema as z.ZodType) : undefined,
        defaultValue,
      };
    }

    case 'enum': {      
      nodeType = 'enum';
      return {
        type: nodeType,
        required: isRequired,
        description,
        options: Object.values((def as z.ZodEnum['def']).entries),
        defaultValue,
      };
    }

    case 'union': {
      nodeType = 'union';
      return {
        type: nodeType,
        required: isRequired,
        description,
        options: (def as z.ZodUnion['def']).options.map(opt => parseZodSchema(opt as z.ZodType)),
        defaultValue,
      };
    }

    default:
      nodeType = 'string';
  }

  return {
    type: nodeType,
    required: isRequired,
    description,
    constraints,
    defaultValue,
  };
}
