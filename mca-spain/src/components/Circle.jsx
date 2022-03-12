import React from 'react';
import styled from 'styled-components';

const Circle = ({ color, nameColor, className }) => {
  return <Color className={className} title={nameColor} color={color}></Color>;
};

export default Circle;

const Color = styled.span`
  background: ${({ color }) => color && color};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #33333336;
  margin: auto;
`;