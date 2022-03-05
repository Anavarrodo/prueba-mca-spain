import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';

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