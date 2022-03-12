import React from "react";
import styled from "styled-components";
import useResponsive from '../utils/useResponsive';

const Button = ({ text, disabled, onClick }) => {
    const mobile = useResponsive(931);
  return <Container mobile={mobile} disabled={disabled} onClick={() => onClick && onClick()}>{text}</Container>;
};

export default Button;

const Container = styled.button`
  border: 0px;
  height: 56px;
  width: ${({ mobile }) => mobile ? '100%' : '20%'};
  border-radius: 40px;
  background-color: #0071e3;
  display: flex;
  cursor: pointer;
  margin: 24px 20px;
  font-family: Montserrat-Regular;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled}) => disabled && '0.2'};
  &:hover {
    opacity: 0.7;
  }
  &:active {
    background-color: #006edb;
  }
`;
