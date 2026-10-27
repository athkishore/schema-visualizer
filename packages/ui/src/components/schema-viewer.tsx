import React, { useState } from 'react';
import { SchemaNode as SchemaNodeType } from '@schema-visualizer/core';
import { SchemaNode } from './schema-node.js';

export interface SchemaViewerProps {
  schema: SchemaNodeType;
  title?: string;
};

export const SchemaViewer: React.FC<SchemaViewerProps> = ({
  schema,
  title,
}) => {
  return (
    <div
      // className="sv:my-4 sv:rounded-xl sv:border sv:border-zinc-800 sv:bg-zinc-900 sv:shadow-xl sv:overflow-hidden"
      style={{
        marginTop: '1rem', // 16px
        marginBottom: '1rem', // 16px
        borderRadius: '0.75rem', // 12px
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'rgb(39 39 42)', // hex: #27272a (zinc-800)
        backgroundColor: 'rgb(24 24 27)', // hex: #18181b (zinc-900)
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <div
        // className="sv:flex sv:items-center sv:justify-between sv:px-4 sv:py-3 sv:bg-zinc-950/60 sv:border-b sv:border-zinc-800"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '1rem', // 16px
          paddingRight: '1rem', // 16px
          paddingTop: '0.75rem', // 12px
          paddingBottom: '0.75rem', // 12px
          backgroundColor: 'rgba(9, 9, 11, 0.6)', // hex: #09090b with 60% opacity (zinc-950/60)
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: 'rgb(39 39 42)', // hex: #27272a (zinc-800)
        }}
      >
        <span
          // className="sv:font-mono sv:text-xs sv:font-semibold sv:text-zinc-300"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.75rem', // 12px
            lineHeight: '1rem', // 16px (Tailwind pairs this with text-xs)
            fontWeight: '600',
            color: 'rgb(212 212 216)', // hex: #d4d4d8 (zinc-300)
          }}
        >
          {title || 'Schema Visualizer'}
        </span>
      </div>
      <div
        // className="sv:p-4"
        style={{
          padding: '1rem', // 16px
        }}
      >
        <SchemaNode node={schema} root />
      </div>
    </div>
  )
}