export type FieldType = 
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'enum'
  | 'literal'
  | 'union';

export interface SchemaNode {
  type: FieldType;
  required: boolean;
  description?: string;
  defaultValue?: any;

  // For objects
  properties?: Record<string, SchemaNode>;
  
  // For arrays
  items?: SchemaNode | SchemaNode[];
  
  // For strings/numbers/arrays
  constraints?: {
    // Numeric constraints
    min?: number;             // Minimum number value OR minimum string/array length
    max?: number;             // Maximum number value OR maximum string/array length
    exclusiveMin?: number;    // Zod .gt()
    exclusiveMax?: number;    // Zod .lt()
    multipleOf?: number;      // Zod .step() / JSON Schema multipleOf

    // String/Format constraints
    regex?: string;
    format?:
      | 'email'
      | 'url'
      | 'uuid'
      | 'cuid'
      | 'datetime'
      | 'ipv4'
      | 'ipv6'
  };
  // For enums or unions
  options?: any[] | SchemaNode[];
  discriminator?: string;
  discriminatorValue?: string;
}