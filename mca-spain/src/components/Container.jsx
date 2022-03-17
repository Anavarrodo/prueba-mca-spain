import React from 'react';
import styled from 'styled-components';

const Container = ({ children }) => {
    return <Section>{children}</Section>
}

export default Container;

const Section = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  padding: 24px 42px;
`;