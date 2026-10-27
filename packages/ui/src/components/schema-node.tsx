import React, { useState } from 'react';
import { SchemaNode as SchemaNodeType } from '@schema-visualizer/core';
import { TypeBadge } from './type-badge.js';

interface SchemaNodeProps {
  name?: string;
  node: SchemaNodeType;
  isLast?: boolean;
  defaultExpanded?: boolean;
  root?: boolean;
};

export const SchemaNode: React.FC<SchemaNodeProps> = ({
  name,
  node,
  isLast = true,
  defaultExpanded = true,
  root = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const hasChildren = 
    (node.type === 'object' && node.properties && Object.keys(node.properties).length > 0) ||
    (node.type === 'array' && Boolean(node.items));

  return (
    <div
      style={{
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      }}
    >
      {!root && (
        <div
          className="sv:hover:bg-zinc-800/40 sv:transition-colors"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            paddingTop: '0.375rem',
            paddingBottom: '0.375rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            borderRadius: '0.5rem',
          }}
        >
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="Toggle node"
              // className="sv:mt-1 sv:p-0.5 sv:rounded sv:hover:bg-zinc-700/50 sv:text-zinc-400 sv:hover:text-zinc-200 sv:transition-colors"
              style={{
                marginTop: '0.25rem',
                padding: '0.125rem',
                borderRadius: '0.25rem',
                color: 'rgb(161 161 170)', // hex: #a1a1aa (zinc-400)
                transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',
              }}
            >
              <svg
                // className={`sv:w-3.5 sv:h-3.5 sv:transform sv:transition-transform ${
                //   isExpanded ? 'sv:rotate-90' : ''
                // }`}
                style={{
                  width: '0.875rem',
                  height: '0.875rem',
                  transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
                  transitionProperty: 'transform',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDuration: '150ms',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="9 5l7 7l-7 7" />
              </svg>
            </button>
          ) : (
            <span 
              // className="sv:w-4"
              style={{
                width: '1rem', // 16px
              }}
            >

            </span>
          )}
          {(
            <div 
              // className="sv:flex-1"
              style={{
                flex: '1 1 0%',
              }}
            >
              <div 
                // className="sv:flex sv:items-center sv:gap-2 sv:flex-wrap"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem', // 8px
                  flexWrap: 'wrap',
                }}
              >
                {name && (
                  <span
                    // className="sv:font-mono sv:font-semibold sv:text-zinc-100"
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontWeight: '600',
                      color: 'rgb(244 244 245)', // hex: #f4f4f5 (zinc-100)
                    }}
                  >
                    {name}
                    <span
                      // className="sv:text-zinc-500"
                      style={{
                        color: 'rgb(113 113 122)', // hex: #71717a (zinc-500)
                      }}
                    >
                      :
                    </span>
                  </span>
                )}
                {<TypeBadge node={node} />}
              </div>
              {node.description && (
                <p
                  // className="sv:mt-1 sv:text-xs sv:text-zinc-400"
                  style={{
                    marginTop: '0.25rem', // 4px
                    fontSize: '0.75rem', // 12px
                    lineHeight: '1rem', // 16px (Tailwind pairs this with text-xs)
                    color: 'rgb(161 161 170)', // hex: #a1a1aa (zinc-400)
                  }}
                >
                  {node.description}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {isExpanded && hasChildren && (
        <div 
          // className="sv:ml-5 sv:pl-3 sv:border sv:border-zinc-800 sv:my-1 sv:space-y-1"
          style={{
            marginLeft: '1.25rem',
            paddingLeft: '0.75rem',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgb(39 39 42)', // hex: #27272a (zinc-800)
            marginTop: '0.25rem',
            marginBottom: '0.25rem',
          }}
        >
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