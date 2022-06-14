import React from 'react';
import { Toolbox } from './Toolbox';
import { Canvas } from './Canvas';
import styled from 'styled-components';
export const Board: React.FC = () => {
  return (
    <Wrapper>
      <Canvas />
      <Toolbox></Toolbox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: pink;
  height: 100vh;
`;
