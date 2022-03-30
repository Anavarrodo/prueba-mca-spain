import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../components/Text';
import Mobile from '../assets/svg/Mobile';

const FilterContainer = ({ value }) => {
  return (
    <Container>
      <Mobile />
      <Text text={'SIN RESULTADOS DE BÚSQUEDA'} />
      <Text
        text={`NO SE HAN ENCONTRADO RESULTADOS PARA LA BÚSQUEDA: '${value}'`}
      />
    </Container>
  );
};

export default FilterContainer;

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
`;

FilterContainer.propTypes = {
  /**
   * Texto introducido en el buscador
   */
  value: PropTypes.string,
};
