import React from 'react';

import { Toolbox } from './Toolbox';
import { CanvasApp } from './Canvas';
import { KonvaNodeEvents } from 'react-konva';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';
import { getHeightAndWidthFromPos, getRadiusFromPos } from '../utils/layers';

export const Board: React.FC = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState<any[]>([]);
  const [startPos, SetStartPos] = React.useState<[number, number]>([0, 0]);
  const [shapes, setShapes] = React.useState<any[]>([]);

  const [strokeColor, setStrokeColor] = React.useState<string>('#df4b26');
  const [strokeWidth, setstrokeWidth] = React.useState<number>(5);
  const isDrawing = React.useRef(false);

  const handleMouseDown: KonvaNodeEvents['onMouseDown'] = (e) => {
    if (tool !== 'rect' && tool !== 'circle') {
      isDrawing.current = true;
      const pos = e.target?.getStage()?.getPointerPosition();
      setLines([
        ...lines,
        { tool, points: [pos?.x, pos?.y], strokeWidth, strokeColor },
      ]);
    } else {
      const pos = e.target?.getStage()?.getPointerPosition();

      SetStartPos([pos?.x || 0, pos?.y || 0]);
    }
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

  const handleMouseUp: KonvaNodeEvents['onMouseUp'] = (e) => {
    isDrawing.current = false;
    if (tool === 'rect' || tool === 'circle') {
      const pos = e.target?.getStage()?.getPointerPosition();

      if (pos?.x && pos?.y) {
        const [width, height] = getHeightAndWidthFromPos(
          ...startPos,
          pos.x,
          pos.y
        );
        const radius = getRadiusFromPos(...startPos, pos.x, pos.y);

        setShapes([
          ...shapes,
          {
            tool,
            x: startPos[0],
            y: startPos[1],
            height: tool === 'rect' ? height : undefined,
            width: tool === 'rect' ? width : undefined,
            radius: tool === 'circle' ? radius : undefined,
            strokeWidth,
            strokeColor,
          },
        ]);
      }
    }
  };

  return (
    <Wrapper>
      <Col
        span={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Toolbox
          tool={tool}
          setTool={setTool}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          setstrokeWidth={setstrokeWidth}
          strokeWidth={strokeWidth}
        />
        <Button
          type={'primary'}
          danger
          onClick={() => {
            setLines([]);
            setShapes([]);
          }}
        >
          clear canvas
        </Button>
      </Col>

      <Col>
        <CanvasApp
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          lines={lines}
          strokeColor={strokeColor}
          shapes={shapes}
        />
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled(Row)``;
