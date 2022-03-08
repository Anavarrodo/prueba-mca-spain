import React from 'react';
import { useHistory } from 'react-router-dom';
import { DETAIL_PATH } from '../utils/paths';
import styled from 'styled-components';
import Text from './Text';
import LazyLoad from 'react-lazyload';

const Item = ({ urlImg, brand, model, price }) => {
  const history = useHistory();
  
  return (
    <Container onClick={() => history.push(DETAIL_PATH)}>
      <LazyLoad height={200} once offset={-100}>
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
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 75%;
`;

const Brand = styled(Text)``;
const Model = styled(Brand)``;
const Price = styled(Brand)`
  margin: auto 0px;
  color: #06c;
  text-align: end;
`;
