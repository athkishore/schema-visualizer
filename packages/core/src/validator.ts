import { SchemaNode } from "./ast";

export function validatePayload(node: SchemaNode, payload: any): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  function walk(currentSchema: SchemaNode, value: any, path: string) {
    // Check required status
    if (value === undefined || value === null) {
      if (currentSchema.required) {
        errors.push(`Field '${path}' is required`);
      }
      return;
    }

    // Type checking
    switch (currentSchema.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`Field '${path}' must be a string`);
        } else {
          if (currentSchema.constraints?.min !== undefined && value.length < currentSchema.constraints.min) {
            errors.push(`Field '${path}' must be at least ${currentSchema.constraints.min} characters`);
          }
          if (currentSchema.constraints?.max !== undefined && value.length > currentSchema.constraints.max) {
            errors.push(`Field '${path}' must be at least ${currentSchema.constraints.max} characters`);
          }
        }
        break;

      case 'number':
        if (typeof value !== 'number') {
          errors.push(`Field '${path}' must be a number`);
        }
        break;

      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`Field '${path} must be a boolean'`);
        }
        break;

      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          errors.push(`Field '${path}' must be an object`);
          break;
        }
        if (currentSchema.properties) {
          for (const [key, subSchema] of Object.entries(currentSchema.properties)) {
            walk(subSchema, value[key], `${path}.${key}`);
          }
        }
        break;
      
      case 'array':
        if (!Array.isArray) {
          errors.push(`Field '${path}' must be an array`);
          break;
        }
        if (currentSchema.items) {
          value.forEach((item: any, index: number) => {
            walk(currentSchema.items as SchemaNode, item, `${path}[${index}]`);
          });
        }
        break;
    }
  }

  walk(node, payload, 'root');
  return { success: errors.length === 0, errors };
}