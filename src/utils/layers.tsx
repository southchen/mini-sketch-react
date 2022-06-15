import { Rect, RectConfig } from 'konva/lib/shapes/Rect';
import { ShapeNode } from '../types';
import React from 'react';

export const getRadiusFromPos = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const getHeightAndWidthFromPos = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return [x2 - x1, y2 - y1];
};

export const isRect = (
  shape: ShapeNode
): shape is RectConfig & { tool: 'rect' } => {
  return shape.radius == null;
};
