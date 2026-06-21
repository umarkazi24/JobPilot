// Skeleton - a pulsing gray placeholder shape used while content is loading
import React from 'react';
import './Skeleton.css';

function Skeleton({ width, height, borderRadius = '6px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

export default Skeleton;