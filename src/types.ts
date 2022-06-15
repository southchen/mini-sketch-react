import { ShapeConfig } from 'konva/lib/Shape';

export type ShapeNode = {
  tool: 'rect' | 'circle';
  x?: number;
  y?: number;
  radius?: number;
} & ShapeConfig;
