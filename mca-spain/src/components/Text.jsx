import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../utils/colors';

const Text = ({ text, className }) => {
  return <Message className={className}>{text}</Message>;
};

export default Text;

const Message = styled.span`
  font-size: 12px;
  font-family: Montserrat-Regular;
  color: ${COLORS.softBlack};
`;

Text.propTypes = {
  /**
   * Texto
   */
  text: PropTypes.string,
};
