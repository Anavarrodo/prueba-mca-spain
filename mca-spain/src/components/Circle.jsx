import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../utils/colors';

const Circle = ({ color, nameColor, className }) => {
  return <Color className={className} title={nameColor} color={color}/>;
};

export default Circle;

const Color = styled.span`
  width: 32px;
  height: 32px;
  background: ${({ color }) => color && color};
  border-radius: 50%;
  border: 1px solid ${COLORS.softBlackOpacity};
  margin: auto;
  &:hover {
    box-shadow: ${({ disabled }) => !disabled && `2px 2px 5px ${COLORS.softBlackShadow}`};
  }
`;

Circle.propTypes = {
  /**
   * Color en hex del relleno del círculo
   */
  color: PropTypes.string,
  /**
   * Nombre del color
   */
  nameColor: PropTypes.string,
};
