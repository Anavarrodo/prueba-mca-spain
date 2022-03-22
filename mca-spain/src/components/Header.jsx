import React, { useContext } from 'react';
import styled from 'styled-components';
import Buy from '../assets/svg/Buy';
import Text from './Text';
import { Context } from '../utils/context';

const Header = ({ brand, onClick }) => {
  const { cartItems } = useContext(Context);

  return (
    <Container>
      <Link onClick={() => onClick && onClick()}>
        <Brand text={brand} />
      </Link>
      <ContainerCart>
        <Buy />
        <NumberItems text={cartItems} />
      </ContainerCart>
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

const Link = styled.div`
  display: flex;
  cursor: pointer;
`;

const Brand = styled(Text)`
  color: #d7d7d7;
  margin: auto;
`;

const ContainerCart = styled.div`
  display: flex;
  align-items: center;
`;

const NumberItems = styled(Text)`
  color: #d7d7d7;
  font-family: 'Montserrat-Bold';
  padding: 12px;
`;
