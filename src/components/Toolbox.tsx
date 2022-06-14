import React from 'react';
import { Input, Slider, InputNumber, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { LineConfig } from 'konva/lib/shapes/Line';

type Props = {
  tool: string;
  setTool: (tool: string) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setstrokeWidth: (weight: number) => void;
  setLines: (lines: LineConfig[]) => void;
};

export const Toolbox: React.FC<Props> = ({
  tool,
  setTool,
  setStrokeColor,
  strokeColor,
  setstrokeWidth,
  strokeWidth,
  setLines,
}) => {
  return (
    <div>
      <Row>
        <Slider
          style={{ width: 120 }}
          value={strokeWidth}
          onAfterChange={(val) => setstrokeWidth(val)}
        />
        <InputNumber value={strokeWidth} onChange={setstrokeWidth} />
      </Row>
      <Input
        style={{ width: 120 }}
        type="color"
        value={strokeColor}
        onChange={(e) => {
          setStrokeColor(e.target.value);
        }}
      />

      <Row>
        <Col
          style={{ backgroundColor: tool === 'pen' ? 'lightblue' : 'white' }}
          onClick={() => {
            setTool('pen');
          }}
        >
          <IconButton>🖋</IconButton>
        </Col>
        <Col
          style={{ backgroundColor: tool === 'eraser' ? 'lightblue' : 'white' }}
          onClick={() => {
            setTool('eraser');
          }}
        >
          <IconButton>🧼</IconButton>
        </Col>
      </Row>
      <Button
        onClick={() => {
          setLines([]);
        }}
      >
        clear
      </Button>
    </div>
  );
};
const IconButton = styled.div`
  padding: 8px;
  font-size: 20px;
`;
