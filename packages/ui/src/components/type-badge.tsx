import React, { CSSProperties } from 'react';
import { SchemaNode } from '@schema-visualizer/core';

interface TypeBadgeProps {
  node: SchemaNode;
};

const TYPE_COLORS: Record<string, CSSProperties> = {
  // string: 'sv:bg-emerald-500/10 sv:text-emerald-400 sv:border-emerald-500/30',
  string: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)', // hex: #10b981 with 10% opacity (emerald-500/10)
    color: 'rgb(52, 211, 153)', // hex: #34d399 (emerald-400)
    borderColor: 'rgba(16, 185, 129, 0.3)', // hex: #10b981 with 30% opacity (emerald-500/30)
  },
  // number: 'sv:bg-amber-500/10 sv:text-amber-400 sv:border-amber-500/30',
  number: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)', // hex: #f59e0b with 10% opacity (amber-500/10)
    color: 'rgb(251, 191, 36)', // hex: #fbbf24 (amber-400)
    borderColor: 'rgba(245, 158, 11, 0.3)', // hex: #f59e0b with 30% opacity (amber-500/30)
  },
  // boolean: 'sv:bg-purple-500/10 sv:text-purple-400 sv:border-purple-500/30',
  boolean: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)', // hex: #a855f7 with 10% opacity (purple-500/10)
    color: 'rgb(192, 132, 252)', // hex: #c084fc (purple-400)
    borderColor: 'rgba(168, 85, 247, 0.3)', // hex: #a855f7 with 30% opacity (purple-500/30)
  },
  // object: 'sv:bg-blue-500/10 sv:text-blue-400 sv:border-blue-500/30',
  object: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)', // hex: #3b82f6 with 10% opacity (blue-500/10)
    color: 'rgb(96, 165, 250)', // hex: #60a5fa (blue-400)
    borderColor: 'rgba(59, 130, 246, 0.3)', // hex: #3b82f6 with 30% opacity (blue-500/30)
  },
  // array: 'sv:bg-indigo-500/10 sv:text-indigo-400 sv:border-indigo-500/30',
  array: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)', // hex: #6366f1 with 10% opacity (indigo-500/10)
    color: 'rgb(129, 140, 248)', // hex: #818cf8 (indigo-400)
    borderColor: 'rgba(99, 102, 241, 0.3)', // hex: #6366f1 with 30% opacity (indigo-500/30)
  },
  // enum: 'sv:bg-pink-500/10 sv:text-pink-400 sv:border-pink-500/30',
  enum: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)', // hex: #ec4899 with 10% opacity (pink-500/10)
    color: 'rgb(244, 114, 182)', // hex: #f472b6 (pink-400)
    borderColor: 'rgba(236, 72, 153, 0.3)', // hex: #ec4899 with 30% opacity (pink-500/30)
  },
  // union: 'sv:bg-cyan-500/10 sv:text-cyan-400 sv:border-cyan-500/30',
  union: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)', // hex: #06b6d4 with 10% opacity (cyan-500/10)
    color: 'rgb(34, 211, 238)', // hex: #22d3ee (cyan-400)
    borderColor: 'rgba(6, 182, 212, 0.3)', // hex: #06b6d4 with 30% opacity (cyan-500/30)
  },
  // literal: 'sv:bg-slate-500/10 sv:text-slate-400 sv:border-slate-500/30',
  literal: {
    backgroundColor: 'rgba(100, 116, 139, 0.1)', // hex: #64748b with 10% opacity (slate-500/10)
    color: 'rgb(148, 163, 184)', // hex: #94a3b8 (slate-400)
    borderColor: 'rgba(100, 116, 139, 0.3)', // hex: #64748b with 30% opacity (slate-500/30)
  },
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({ node }) => {
  const typeStyle = 
    TYPE_COLORS[node.type] //|| 'sv:bg-gray-500/10 sv:text-gray-400 sv:border-gray-500/30';
    || {
      backgroundColor: 'rgba(107, 114, 128, 0.1)', // hex: #6b7280 with 10% opacity (gray-500/10)
      color: 'rgb(156, 163, 175)', // hex: #9ca3af (gray-400)
      borderColor: 'rgba(107, 114, 128, 0.3)', // hex: #6b7280 with 30% opacity (gray-500/30)
    };

  const constraintsList: string[] = [];

  if (node.constraints) {
    const { min, max, regex } = node.constraints;
    if (min !== undefined) constraintsList.push(`min: ${min}`);
    if (max !== undefined) constraintsList.push(`max: ${max}`);
    if (regex) constraintsList.push(`/${regex}/`);
  }

  return (
    <div 
      // className="sv:inline-flex sv:items-center sv:gap-1.5 sv:text-xs sv:font-mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem', // 6px
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px (Tailwind pairs this with text-xs)
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    >
      <span
        // className={`sv:px-1.5 sv:py-0.5 sv:rounded sv:text-[10px] sv:font-semibold ${
        //   node.required
        //     ? `sv:bg-red-500/10 sv:text-red-400 sv:border sv:border-red-500/20`
        //     : `sv:bg-zinc-800 sv:text-zinc-400`
        // }`}
        style={{
          paddingLeft: '0.375rem', // 6px
          paddingRight: '0.375rem', // 6px
          paddingTop: '0.125rem', // 2px
          paddingBottom: '0.125rem', // 2px
          borderRadius: '0.25rem', // 4px
          fontSize: '10px',
          fontWeight: '600',
          ...(node.required ? {
            backgroundColor: 'rgba(239, 68, 68, 0.1)', // hex: #ef4444 with 10% opacity (red-500/10)
            color: 'rgb(248, 113, 113)', // hex: #f87171 (red-400)
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgba(239, 68, 68, 0.2)', // hex: #ef4444 with 20% opacity (red-500/20)
          } : {
            backgroundColor: 'rgb(39 39 42)', // hex: #27272a (zinc-800)
            color: 'rgb(161 161 170)', // hex: #a1a1aa (zinc-400)
          })
        }}
      >
        {node.required ? 'required' : 'optional'}
      </span>

      <span
        // className={`sv:px-2 sv:py-0.5 sv:rounded-md sv:border sv:font-medium ${typeStyle}`}
        style={{
          paddingLeft: '0.5rem', // 8px
          paddingRight: '0.5rem', // 8px
          paddingTop: '0.125rem', // 2px
          paddingBottom: '0.125rem', // 2px
          borderRadius: '0.375rem', // 6px
          borderStyle: 'solid',
          borderWidth: '1px',
          fontWeight: '500',
          ...typeStyle,
        }}
      >
        {node.type}
      </span>
      {constraintsList.map((constraint, idx) => (
        <span
          key={idx}
          // className="sv:px-1.5 sv:py-0.5 sv:rounded sv:bg-zinc-800/80 sv:text-zinc-300 sv:border sv:border-zinc-700/50 sv:text-[11px]"
          style={{
            paddingLeft: '0.375rem', // 6px
            paddingRight: '0.375rem', // 6px
            paddingTop: '0.125rem', // 2px
            paddingBottom: '0.125rem', // 2px
            borderRadius: '0.25rem', // 4px
            backgroundColor: 'rgba(39, 39, 42, 0.8)', // hex: #27272a with 80% opacity (zinc-800/80)
            color: 'rgb(212 212 216)', // hex: #d4d4d8 (zinc-300)
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgba(63, 63, 70, 0.5)', // hex: #3f3f46 with 50% opacity (zinc-700/50)
            fontSize: '11px',
          }}
        >
          {constraint}
        </span>
      ))}
    </div>
  )
  
}

