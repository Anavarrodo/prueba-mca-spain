import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useResponsive from '../hooks/useResponsive';
import { COLORS } from '../utils/colors';

const Button = ({ text, disabled, onClick }) => {
  const mobile = useResponsive(931);

  return (
    <Container
      mobile={mobile}
      disabled={disabled}
      onClick={() => onClick && onClick()}
    >
      {text}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  height: 56px;
  width: ${({ mobile }) => (mobile ? '100%' : '20%')};
  ${({ mobile }) => !mobile && `min-width: 262px`};
  border: 0px;
  border-radius: 40px;
  background-color: ${COLORS.blueButton};
  display: flex;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  margin: 24px 20px;
  font-family: Montserrat-Regular;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0em;
  color: ${COLORS.white};
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => disabled && '0.2'};
  &:hover {
    opacity: ${({ disabled }) => !disabled && '0.7'};
  }
  &:active {
    background-color: ${COLORS.blueButtonActive};
  }
`;

Button.propTypes = {
  /**
   * Texto del botón
   */
  text: PropTypes.string,
  /**
   * Opción de habilitar o deshabilitar el botón
   */
  disabled: PropTypes.bool,
  /**
   * Función onClick
   */
  onClick: PropTypes.func,
};
