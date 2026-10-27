import React, { useState } from 'react';
import { SchemaNode as SchemaNodeType } from '@schema-visualizer/core';
import { SchemaNode } from './schema-node.js';
import styles from './schema-viewer.module.css';

export interface SchemaViewerProps {
  schema: SchemaNodeType;
  title?: string;
  theme?: 'light' | 'dark';
};

// TODO: Add style and className for container in the interface

export const SchemaViewer: React.FC<SchemaViewerProps> = ({
  schema,
  title,
  theme = 'dark',
}) => {
  return (
    <div className={styles.root} data-theme={theme}>
      <div className={styles.header}>
        <span className={styles.title}>
          {title || 'Schema Visualizer'}
        </span>
      </div>
      <div className={styles.content}>
        <SchemaNode node={schema} root />
      </div>
    </div>
  )
}