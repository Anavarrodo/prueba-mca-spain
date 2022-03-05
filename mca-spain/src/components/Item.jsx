import React from "react";
import styled from "styled-components";

const Item = ({ onClick, urlImg, branch, model, price }) => {
  return (
    <Container onClick={() => onClick && onClick()}>
      <Image src={urlImg}/>
      <Columns>
        <ColumnText>
          <Branch>{branch}</Branch>
          <Model>{model}</Model>
        </ColumnText>
        <Price>{price !== '' ? price + '€' : 'Consultar'} </Price>
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
  height: 280px;
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

const Branch = styled.span`
  font-size: 16px;
  font-family: Montserrat-Regular;
`;

const Model = styled(Branch)``;
const Price = styled(Branch)`
  margin: auto 0px;
  color: #06c;
  text-align: end;
`;
