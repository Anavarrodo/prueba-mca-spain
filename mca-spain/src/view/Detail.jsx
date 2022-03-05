import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';
import { HOME_PATH } from '../utils/paths';
import { useNavigate } from 'react-router-dom';

function Detail() {
  const navigate = useNavigate();
  return (
    <Container>
      <BreadCrumbs
        selectLastBreadCrumb={true}
        crumbs={[
          {
            title: 'Store',
            onClick: () => navigate(HOME_PATH),
          }, {title: 'Detalle del producto'}
        ]}
      />
    </Container>
  );
}

export default Detail;

const Container = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  padding: 24px 42px;
`;
