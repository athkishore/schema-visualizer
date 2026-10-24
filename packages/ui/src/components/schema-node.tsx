import React, { useState } from 'react';
import { SchemaNode as SchemaNodeType } from '@schema-visualizer/core';
import { TypeBadge } from './type-badge.js';

interface SchemaNodeProps {
  name?: string;
  node: SchemaNodeType;
  isLast?: boolean;
  defaultExpanded?: boolean;
};

export const SchemaNode: React.FC<SchemaNodeProps> = ({
  name,
  node,
  isLast = true,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const hasChildren = 
    (node.type === 'object' && node.properties && Object.keys(node.properties).length > 0) ||
    (node.type === 'array' && Boolean(node.items));

  return (
    <div className="sv:font-sans sv:text-sm">
      <div className="sv:flex sv:items-start sv:gap-2 sv:py-1.5 sv:px-2 sv:rounded-lg sv:hover:bg-zinc-800/40 sv:transition-colors">
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Toggle node"
            className="sv:mt-1 sv:p-0.5 sv:rounded sv:hover:bg-zinc-700/50 sv:text-zinc-400 sv:hover:text-zinc-200 sv:transition-colors"
          >
            <svg
              className={`sv:w-3.5 sv:h-3.5 sv:transform sv:transition-transform ${
                isExpanded ? 'sv:rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="sv:w-4"></span>
        )}
        <div className="sv:flex-1">
          <div className="sv:flex sv:items-center sv:gap-2 sv:flex-wrap">
            {name && (
              <span className="sv:font-mono sv:font-semibold sv:text-zinc-100">
                {name}
                <span className="sv:text-zinc-500">:</span>
              </span>
            )}
            <TypeBadge node={node} />
          </div>
          {node.description && (
            <p className="sv:mt-1 sv:text-xs sv:text-zinc-400">{node.description}</p>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="sv:ml-5 sv:pl-3 sv:border sv:border-zinc-800 sv:my-1 sv:space-y-1">
          {node.type === 'object' && node.properties && (
            Object.entries(node.properties).map(([propName, childNode], index, array) => (
              <SchemaNode 
                key={propName}
                name={propName}
                node={childNode}
                isLast={index === array.length - 1}
              />
            ))
          )}

          {node.type === 'array' && node.items && (
            <SchemaNode 
              name="[item]"
              node={node.items as SchemaNodeType}
            />
          )}
        </div>
      )}
    </div>
  );
};