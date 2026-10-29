import React, { CSSProperties } from 'react';
import { SchemaNode } from '@schema-visualizer/core';
import styles from './type-badge.module.css';

interface TypeBadgeProps {
  node: SchemaNode;
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({ node }) => {
  const typeClass = (styles as Record<string, string>)[node.type] || styles.typeBadge;

  const constraintsList: string[] = [];

  if (node.constraints) {
    const { min, max, regex } = node.constraints;
    if (min !== undefined) constraintsList.push(`min: ${min}`);
    if (max !== undefined) constraintsList.push(`max: ${max}`);
    if (regex) constraintsList.push(`/${regex}/`);
  }

  return (
    <div className={styles.badgeWrapper}>
      <span className={node.required ? styles.requiredTag : styles.optionalTag}>
        {node.required ? 'required' : 'optional'}
      </span>
      <span className={`${styles.typeBadge} ${typeClass}`}>
        {node.type}
      </span>
      {node.type === 'literal' && (
        <span className={styles.literal}>
          "{node.defaultValue}"
        </span>
      )}
      {constraintsList.map((constraint, idx) => (
        <span key={idx} className={styles.constraint}>
          {constraint}
        </span>
      ))}
    </div>
  )
  
}

