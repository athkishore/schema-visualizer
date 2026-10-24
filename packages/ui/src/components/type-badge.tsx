import React from 'react';
import { SchemaNode } from '@schema-visualizer/core';

interface TypeBadgeProps {
  node: SchemaNode;
};

const TYPE_COLORS: Record<string, string> = {
  string: 'sv:bg-emerald-500/10 sv:text-emerald-400 sv:border-emerald-500/30',
  number: 'sv:bg-amber-500/10 sv:text-amber-400 sv:border-amber-500/30',
  boolean: 'sv:bg-purple-500/10 sv:text-purple-400 sv:border-purple-500/30',
  object: 'sv:bg-blue-500/10 sv:text-blue-400 sv:border-blue-500/30',
  array: 'sv:bg-indigo-500/10 sv:text-indigo-400 sv:border-indigo-500/30',
  enum: 'sv:bg-pink-500/10 sv:text-pink-400 sv:border-pink-500/30',
  union: 'sv:bg-cyan-500/10 sv:text-cyan-400 sv:border-cyan-500/30',
  literal: 'sv:bg-slate-500/10 sv:text-slate-400 sv:border-slate-500/30',
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({ node }) => {
  const typeStyle = 
    TYPE_COLORS[node.type] || 'sv:bg-gray-500/10 sv:text-gray-400 sv:border-gray-500/30';

  const constraintsList: string[] = [];

  if (node.constraints) {
    const { min, max, regex } = node.constraints;
    if (min !== undefined) constraintsList.push(`min: ${min}`);
    if (max !== undefined) constraintsList.push(`max: ${max}`);
    if (regex) constraintsList.push(`/${regex}/`);
  }

  return (
    <div className="sv:inline-flex sv:items-center sv:gap-1.5 sv:text-xs sv:font-mono">
      <span
        className={`sv:px-1.5 sv:py-0.5 sv:rounded sv:text-[10px] sv:font-semibold ${
          node.required
            ? `sv:bg-red-500/10 sv:text-red-400 sv:border sv:border-red-500/20`
            : `sv:bg-zinc-800 sv:text-zinc-400`
        }`}
      >
        {node.required ? 'required' : 'optional'}
      </span>

      <span
        className={`sv:px-2 sv:py-0.5 sv:rounded-md sv:border sv:font-medium ${typeStyle}`}
      >
        {node.type}
      </span>
      {constraintsList.map((constraint, idx) => (
        <span
          key={idx}
          className="sv:px-1.5 sv:py-0.5 sv:rounded sv:bg-zinc-800/80 sv:text-zinc-300 sv:border sv:border-zinc-700/50 sv:text-[11px]"
        >
          {constraint}
        </span>
      ))}
    </div>
  )
  
}

