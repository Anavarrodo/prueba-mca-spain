import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import Text from './Text';
import { COLORS } from '../utils/colors';

const Item = ({ urlImg, brand, model, price, onClick }) => {
  return (
    <Container onClick={() => onClick && onClick()}>
      <LazyLoad height={250}>
        <Image src={urlImg} />
      </LazyLoad>
      <Columns>
        <ColumnText>
          <Brand text={brand} />
          <Model text={model} />
        </ColumnText>
        <Price text={price !== '' ? price + ' EUR' : 'Consultar'} />
      </Columns>
    </Container>
  );
};

export default Item;

const Container = styled.div`
  margin: auto;
  padding: 24px;
`;

const Image = styled.img`
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 12px 0px;
`;

const ColumnText = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const Brand = styled(Text)``;
const Model = styled(Brand)``;
const Price = styled(Brand)`
  margin: auto 0px;
  color: ${COLORS.blue};
  text-align: end;
`;

Item.propTypes = {
  /**
   * Ruta de la imagen
   */
  urlImg: PropTypes.string,
  /**
   * Marca del producto de la imagen
   */
  brand: PropTypes.string,
  /**
   * Modelo del producto de la imagen
   */
  model: PropTypes.string,
  /**
   * Precio del producto de la imagen
   */
  price: PropTypes.string,
  /**
   * Función onClick
   */
  onClick: PropTypes.func,
};
