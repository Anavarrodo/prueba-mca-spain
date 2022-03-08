import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROOT_PATH } from '../utils/paths';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';

function Detail() {
  const history = useHistory();
  return (
    <Container>
      <BreadCrumbs
        selectLastBreadCrumb={true}
        crumbs={[
          {
            title: 'Store',
            onClick: () => history.push(ROOT_PATH),
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
