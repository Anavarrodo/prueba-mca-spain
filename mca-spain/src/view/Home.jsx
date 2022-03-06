import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BreadCrumbs from '../components/BreadCrumbs';
import Item from '../components/Item';
import { url } from '../utils/url';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getApiProduct();
  }, []);

  const getApiProduct = () => {
    axios
      .get(`${url}/api/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <BreadCrumbs
        selectLastBreadCrumb={true}
        crumbs={[
          {
            title: 'Store',
          },
        ]}
      />
      <ContainerItem>
        {products.length > 0 &&
          products.map((product, index) => (
            <Item
              key={'product' + index}
              urlImg={product.imgUrl}
              brand={product.brand}
              model={product.model}
              price={product.price}
            />
          ))}
      </ContainerItem>
    </Container>
  );
}

export default Home;

const Container = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  padding: 24px 42px;
`;

const ContainerItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
`;
