import React from 'react';
import styled from 'styled-components';
import XError from '../assets/svg/XError';
import Text from '../components/Text';

const BugContainer = () => {
  return (
    <Container>
      <XError />
      <Text text={'UPS...'} />
      <Text text={'¡PARECE QUE ALGO HA IDO MAL!'} />
      <Text
        text={'VUELVE A INTENTARLO PASADOS UNOS SEGUNDOS'}
      />
    </Container>
  );
};

export default BugContainer;

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
