import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../components/Box';
import Circle from '../components/Circle';
import Text from '../components/Text';
import useResponsive from '../hooks/useResponsive';
import { getColor } from '../utils/functions';

const ColorsContainer = ({ className, colors, title, onClick, seleccion }) => {
  const mobile = useResponsive(931);
  const [circleSelected, setCircleSelected] = useState();
  const [defaultSelected] = useState(colors.length === 1 ? true : false);

  const clickSelected = (code, i) => {
    setCircleSelected(i);
    onClick && onClick(code, i);
  };

  return (
    <ContainerColor className={className} mobile={mobile}>
      <TitleColor text={title} />
      <Container>
        {colors.map((color, index) => (
          <CustomBox
            defaultSelected={defaultSelected}
            key={'color' + index}
            selected={color.code === seleccion || index === circleSelected}
            onClick={() => {
              clickSelected(color.code, index);
            }}
          >
            <Circle
              color={getColor(color.name.toLowerCase())}
              nameColor={color.name}
            ></Circle>
          </CustomBox>
        ))}
      </Container>
    </ContainerColor>
  );
};

export default ColorsContainer;

const ContainerColor = styled.div`
  margin: ${({ mobile }) => (mobile ? 'auto' : '17px')};
`;
const TitleColor = styled(Text)``;

const Container = styled.div`
  display: flex;
  margin-top: 34px;
`;

const CustomBox = styled(Box)`
  ${({ selected, defaultSelected }) => (defaultSelected || selected) &&
    ` background: #ffffff;
      border: 1px solid #daddf2;
      box-shadow: 0px 1px 2px 1px rgb(37 75 208 / 5%);
      border-radius: 6px;
    `};
`;

ColorsContainer.propTypes = {
  /**
   * Array del objeto colors de cada producto
   */
  colors: PropTypes.array,
  /**
   * Título del contenedor
   */
  title: PropTypes.string,
  /**
   * Función onClick
   */
  onClick: PropTypes.func,
  /**
   * Selección por defecto
   */
  seleccion: PropTypes.number,
};
