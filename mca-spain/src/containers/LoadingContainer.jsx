import React from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';

const LoadingContainer = () => {
  return (
    <Container>
      <Loading />
    </Container>
  );
};

export default LoadingContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 50px);
`;
