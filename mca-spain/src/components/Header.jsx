import React from 'react';
import styled from 'styled-components';
import Buy from '../assets/svg/Buy';

const Header = ({ brand }) => {
  return (
    <Container>
      <Brand>{brand}</Brand>
      <Buy />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  background-color: #333333;
  height: 50px;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0px 42px;
`;

const Brand = styled.h1`
  font-size: 12px;
  font-family: 'Montserrat-Regular';
  font-weight: 500;
  color: #d7d7d7;
  margin: auto 0px;
`;
