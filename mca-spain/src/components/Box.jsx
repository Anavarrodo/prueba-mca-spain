import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useResponsive from '../hooks/useResponsive';

const Box = ({ className, onClick, children }) => {
  const mobile = useResponsive(931);
  
  return (
    <Container
      mobile={mobile}
      className={className}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </Container>
  );
};

export default Box;

const Container = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 12px;
  ${({ mobile }) => !mobile && 'margin-right: 12px'};
  cursor: pointer;
`;

Box.propTypes = {
  /**
   * Función onClick
   */
  onClick: PropTypes.func,
  /**
   * Componente hijo
   */
  children: PropTypes.object,
};
