import React, { useState } from 'react';
import { SchemaNode as SchemaNodeType } from '@schema-visualizer/core';
import { TypeBadge } from './type-badge.js';
import styles from './schema-node.module.css';

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
    <div className={styles.nodeContainer}>
      {!root && (
        <div className={styles.nodeRow}>
          {hasChildren ? (
            <button
              className={styles.toggleBtn}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="Toggle node"
            >
              <svg
                className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="9 5l7 7l-7 7" />
              </svg>
            </button>
          ) : (
            <span className={styles.spacer} />
          )}
          {(
            <div style={{ flex: '1 1 0%' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem', // 8px
                  flexWrap: 'wrap',
                }}
              >
                {name && (
                  <span className={styles.propertyName}>
                    {name}
                    <span className={styles.colon}>
                      :
                    </span>
                  </span>
                )}
                {<TypeBadge node={node} />}
              </div>
              {node.description && (
                <p className={styles.description}>
                  {node.description}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {isExpanded && hasChildren && (
        <div className={styles.childrenArea}>
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