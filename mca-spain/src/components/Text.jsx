import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = ({ text, className }) => {
  console.log(text)
  return <Message className={className}>{text}</Message>;
};

export default Text;

const Message = styled.span`
  font-size: 12px;
  font-family: Montserrat-Regular;
  color: #333333;
`;

Text.propTypes = {
  /**
   * Texto
   */
  text: PropTypes.string,
};
