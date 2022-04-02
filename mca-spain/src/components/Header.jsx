import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Buy from '../assets/svg/Buy';
import Remove from '../assets/svg/Remove';
import Text from './Text';
import Dropdown from './Dropdown';
import { Context } from '../Context/context';
import { getTotalPrice } from '../utils/functions';
import { COLORS } from '../utils/colors';

const Header = ({ brand, onClick }) => {
  const { cartItems, removeFromCart, items } = useContext(Context);
  const [numberElements, setNumberElements] = useState(cartItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems.length === 0) {
      setNumberElements('0');
      setTotal(0);
    } else {
      setNumberElements(cartItems);
      setTotal(getTotalPrice(items));
    }
  }, [items]);

  return (
    <Container>
      <Link onClick={() => onClick && onClick()}>
        <Brand text={brand} />
      </Link>
      <ContainerCart>
        <Buy />
        <NumberItems text={numberElements} />
        <Dropdown>
          {cartItems === 0 ? (
            <TextArticles text='Tu cesta está vacía' />
          ) : (
            items.map((item, index) => {
              return (
                <Content key={index}>
                  <CustomRemove onClick={() => removeFromCart(index)} />
                  <Product>
                    <Name text={item.brand + ' ' + item.model} />
                    <Price
                      text={
                        item.price === '' ? 'A CONSULTAR' : item.price + ' EUR'
                      }
                    />
                  </Product>
                </Content>
              );
            })
          )}
          {cartItems !== 0 && (
            <Sumamry>
              <Summation text='TOTAL' />
              <TotalPay text={total + ' EUR'} />
            </Sumamry>
          )}
        </Dropdown>
      </ContainerCart>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 50px;
  display: flex;
  background-color: ${COLORS.softBlack};
  cursor: default;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0px 42px;
`;

const Link = styled.div`
  display: flex;
  cursor: pointer;
`;

const Brand = styled(Text)`
  color: ${COLORS.softWhite};
  margin: auto;
`;

const ContainerCart = styled.div`
  display: flex;
  align-items: center;
  &:hover #showDropdown {
    display: block;
    z-index: 1;
  }
`;

const NumberItems = styled(Text)`
  color: ${COLORS.softWhite};
  font-family: Montserrat-Bold;
  padding: 12px;
  cursor: default;
`;

const Content = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
`;

const Product = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 12px;
`;

const TextArticles = styled(Text)`
  font-family: Montserrat-Bold;
  margin: auto;
`;

const Name = styled(Text)``;
const Price = styled(Text)`
  font-family: Montserrat-Bold;
`;

const CustomRemove = styled(Remove)`
  cursor: pointer;
`;

const Sumamry = styled.div`
  border-top: 1px solid ${COLORS.softWhite};
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const Summation = styled(Text)`
  font-family: Montserrat-Bold;
  margin-top: 16px;
`;

const TotalPay = styled(Summation)``;

Header.propTypes = {
  /**
   * Nombre de la marca - Texto de la izquierda
   */
  brand: PropTypes.string,
  /**
   * Función onClick
   */
  onClick: PropTypes.func,
};
