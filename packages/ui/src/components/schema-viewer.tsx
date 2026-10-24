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
    <div className="sv:my-4 sv:rounded-xl sv:border sv:border-zinc-800 sv:bg-zinc-900 sv:shadow-xl sv:overflow-hidden">
      <div className="sv:flex sv:items-center sv:justify-between sv:px-4 sv:py-3 sv:bg-zinc-950/60 sv:border-b sv:border-zinc-800">
        <span className="sv:font-mono sv:text-xs sv:font-semibold sv:text-zinc-300">
          {title || 'Schema Visualizer'}
        </span>
      </div>
      <div className="sv:p-4">
        <SchemaNode node={schema} />
      </div>
    </div>
  )
}