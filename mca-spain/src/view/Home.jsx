import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';
import Item from '../components/Item';

function Home() {

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
      <Item
        branch="Acer"
        model="Predator v8"
        urlImg={'https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg'}
        price="150"
      />
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