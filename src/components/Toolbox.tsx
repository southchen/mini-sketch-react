import React from 'react';
import { Input, Slider, InputNumber, Row, Col } from 'antd';
import styled from 'styled-components';

type Props = {
  tool: string;
  setTool: (tool: string) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setstrokeWidth: (weight: number) => void;
};

export const Toolbox: React.FC<Props> = ({
  tool,
  setTool,
  setStrokeColor,
  strokeColor,
  setstrokeWidth,
  strokeWidth,
}) => {
  return (
    <div>
      <Wrapper>
        <Row>
          <IconButton
            style={{ backgroundColor: tool === 'pen' ? 'lightblue' : 'white' }}
            onClick={() => {
              setTool('pen');
            }}
          >
            <img style={{ width: 25, height: 25 }} src="/pen.svg" />
          </IconButton>
          <IconButton
            style={{
              backgroundColor: tool === 'eraser' ? 'lightblue' : 'white',
              padding: 10,
            }}
            onClick={() => {
              setTool('eraser');
            }}
          >
            <img style={{ width: 25, height: 25 }} src="/earser.svg" />
          </IconButton>
        </Row>
        <Row>
          <IconButton
            style={{ backgroundColor: tool === 'rect' ? 'lightblue' : 'white' }}
            onClick={() => {
              setTool('rect');
            }}
          >
            <img style={{ width: 25, height: 25 }} src="/rect.svg" />
          </IconButton>
          <IconButton
            style={{
              backgroundColor: tool === 'circle' ? 'lightblue' : 'white',
            }}
            onClick={() => {
              setTool('circle');
            }}
          >
            <img style={{ width: 25, height: 25 }} src="/compass.svg" />
          </IconButton>
        </Row>
        <Row>
          <IconButton
            style={{ backgroundColor: tool === 'text' ? 'lightblue' : 'white' }}
            onClick={() => {
              setTool('text');
            }}
          >
            <img style={{ width: 20, height: 20 }} src="/text.svg" />
          </IconButton>
          <IconButton
            style={{ backgroundColor: tool === 'sun' ? 'lightblue' : 'white' }}
            onClick={() => {
              setTool('sun');
            }}
          >
            <img style={{ width: 25, height: 25 }} src="/images/sun.svg" />
          </IconButton>
        </Row>
      </Wrapper>
      <Wrapper>
        <span>线条宽度：</span>
        <SliderWrapper>
          <Slider
            style={{ width: 130 }}
            step={0.5}
            value={strokeWidth}
            onChange={(val) => setstrokeWidth(val)}
            max={30}
          />
        </SliderWrapper>
      </Wrapper>
      <Wrapper>
        <span>线条颜色：</span>
        <Input
          style={{ width: 148 }}
          type="color"
          value={strokeColor}
          onChange={(e) => {
            setStrokeColor(e.target.value);
          }}
        />
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  padding: 10px;
`;
const IconButton = styled(Col)`
  padding: 8px;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid rgb(232, 232, 232);
  border-radius: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SliderWrapper = styled.div`
  border: 1px solid rgb(232, 232, 232);
  border-radius: 10px;
`;
