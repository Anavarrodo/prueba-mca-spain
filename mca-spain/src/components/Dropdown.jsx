import React from 'react';
import styled from 'styled-components';

const Dropdown = ({ children }) => {
  return (
    <Container id='showDropdown'>
      <ContainerInt>
        <Triangle />
        {children}
      </ContainerInt>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  position: absolute;
  display: none;
  top: 40px;
  right: 28px;
  padding: 16px 12px;
`;

const ContainerInt = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 154px;
  width: calc(100% + 28px);
  min-height: 54px;
  height: auto;
  box-shadow: 0px 1px 2px 1px rgb(37 75 208 / 5%);
  border-radius: 6px;
  padding: 12px;
`;

const Triangle = styled.span`
  position: absolute;
  top: 2px;
  right: 24px;
  border-right: 14px solid transparent;
  border-left: 14px solid transparent;
  border-bottom: 14px solid #fff;
`;