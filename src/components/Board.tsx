import React from 'react';

import { Toolbox } from './Toolbox';
import { CanvasApp } from './Canvas';
import { KonvaNodeEvents } from 'react-konva';
import styled from 'styled-components';
import { Col, Row } from 'antd';
export const Board: React.FC = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState<any[]>([]);
  const [strokeColor, setStrokeColor] = React.useState<string>('#df4b26');
  const [strokeWidth, setstrokeWidth] = React.useState<number>(5);
  const isDrawing = React.useRef(false);

  const handleMouseDown: KonvaNodeEvents['onMouseDown'] = (e) => {
    isDrawing.current = true;
    const pos = e.target?.getStage()?.getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos?.x, pos?.y], strokeWidth, strokeColor },
    ]);
  };

  const handleMouseMove: KonvaNodeEvents['onMouseMove'] = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point?.x || 0, point?.y || 0]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp: KonvaNodeEvents['onMouseUp'] = () => {
    isDrawing.current = false;
  };

  return (
    <Wrapper>
      <Col span={3}>
        <Toolbox
          tool={tool}
          setTool={setTool}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          setstrokeWidth={setstrokeWidth}
          strokeWidth={strokeWidth}
          setLines={setLines}
        />
      </Col>
      <Col>
        <CanvasApp
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          lines={lines}
          strokeColor={strokeColor}
        />
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled(Row)``;
