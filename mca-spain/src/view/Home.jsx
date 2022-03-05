import React, { useState } from 'react';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';
import Search from '../components/Search';

function Home() {
  const [value, setValue] = useState('');
  
  const onChangeSearch = e => {
    setValue(e);
  }
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
      <Search
        value={value}
        onChange={(e) => {
          onChangeSearch(e);
        }}
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
