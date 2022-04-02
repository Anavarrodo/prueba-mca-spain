import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useResponsive from '../hooks/useResponsive';
import Text from '../components/Text';
import MiniCard from '../components/MiniCard';

const StoragesContainer = ({ className, storages, title, onClick, seleccion }) => {
  const mobile = useResponsive(931);
  const [circleSelected, setCircleSelected] = useState();
  const [defaultSelected] = useState(storages.length === 1 ? true : false);

  const clickSelected = (code, i) => {
    setCircleSelected(i);
    onClick && onClick(code, i);
  };

  return (
    <Storages className={className} mobile={mobile}>
      <TitleColor text={title} />
      <Container>
        {storages.map((storage, index) => (
          <CustomMiniCard
            disabled={defaultSelected}
            mobile={mobile}
            key={'storage' + index}
            onClick={() => {
              clickSelected(storage.code, index);
            }}
          >
            <Info
              text={storage.name !== ' ' ? storage.name : '-'}
              defaultSelected={defaultSelected}
              selected={storage.code === seleccion || index === circleSelected}
            />
          </CustomMiniCard>
        ))}
      </Container>
    </Storages>
  );
};

export default StoragesContainer;

const Storages = styled.div`
  margin: ${({ mobile }) => !mobile && '17px'};
`;

const TitleColor = styled(Text)``;
const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CustomMiniCard = styled(MiniCard)`
  height: 45px;
  width: ${({ mobile }) => (mobile ? '70px' : '106px')};
  cursor: pointer;
`;

const Info = styled(Text)`
  margin: auto;
  text-align: center;
  ${({ selected, defaultSelected }) => (defaultSelected || selected) &&
    ` font-size: 14px;
      font-family: Montserrat-Bold;
      color: #06c;
    `};
`;

StoragesContainer.propTypes = {
  /**
   * Array del objeto storage de cada producto
   */
  storages: PropTypes.array,
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
