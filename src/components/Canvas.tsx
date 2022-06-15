import { LineConfig } from 'konva/lib/shapes/Line';

import React from 'react';
import { Stage, Layer, Line, KonvaNodeEvents, Rect, Circle } from 'react-konva';

import styled from 'styled-components';
import { ShapeNode } from '../types';
import { isRect } from '../utils/layers';

export const renderShape = (shape: ShapeNode) => {
  if (isRect(shape)) {
    return <Rect {...shape} stroke={shape.strokeColor || '#000'} />;
  } else {
    return <Circle {...shape} stroke={shape.strokeColor || '#000'} />;
  }
};

type Props = {
  handleMouseDown: KonvaNodeEvents['onMouseDown'];
  handleMouseMove: KonvaNodeEvents['onMouseMove'];
  handleMouseUp: KonvaNodeEvents['onMouseUp'];
  lines: (LineConfig & { strokeWidth: number })[];
  strokeColor: string;
  shapes: ShapeNode[];
};

export const CanvasApp: React.FC<Props> = ({
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  lines,
  shapes,
}) => {
  return (
    <Container>
      <Stage
        width={800}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.strokeColor}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
          {shapes.map((s, i) => renderShape(s))}
        </Layer>
      </Stage>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border: 1px solid black;
`;
