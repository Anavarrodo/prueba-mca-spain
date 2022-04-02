import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useResponsive from '../hooks/useResponsive';
import { COLORS } from '../utils/colors';

const MiniCard = ({ className, children, onClick, disabled }) => {
  const mobile = useResponsive(931);

  return (
    <Container
      disabled={disabled}
      onClick={() => onClick && onClick()}
      className={className}
      mobile={mobile}
    >
      {children}
    </Container>
  );
};

export default MiniCard;

const Container = styled.div`
  height: ${({ mobile }) => (mobile ? '55px' : '76px')};
  width: ${({ mobile }) => (mobile ? '98px' : '220px')};
  background: ${COLORS.white};
  border: 1px solid ${COLORS.borderWhite};
  box-shadow: 0px 1px 2px 1px rgb(37 75 208 / 5%);
  border-radius: 6px;
  align-items: center;
  display: flex;
  margin: 12px;
  padding: ${({ mobile }) => mobile && '4px'};
  box-sizing: content-box;
  &:hover {
    box-shadow: ${({ disabled }) => !disabled && `2px 2px 5px ${COLORS.softBlackShadow}`};
  }
`;

MiniCard.propTypes = {
  /**
   * Componente hijo
   */
  children: PropTypes.array,
  /**
   * Habilitar o deshabilitar componente
   */
  disabled: PropTypes.bool,
  /**
   * Función onClick
   */
  onClick: PropTypes.func,
};
