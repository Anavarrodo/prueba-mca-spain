import React from 'react';
import styled from 'styled-components';
import useResponsive from "../utils/useResponsive";

const Box = ({ className, onClick, children }) => {
  const mobile = useResponsive(931);
  return (
    <ContainerBox
    mobile={mobile}
      className={className}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </ContainerBox>
  );
};

export default Box;

const ContainerBox = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 12px;
  ${({ mobile }) => !mobile && 'margin-right: 12px'};
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 5px #9999999e;
  }
`;
