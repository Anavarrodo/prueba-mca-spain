import React, { useState } from 'react';
import styled from 'styled-components';
import useResponsive from '../utils/useResponsive';
import Text from './Text';
import MiniCard from './MiniCard';

const ContainerStorage = ({ className, storages, title, onClick }) => {
  const mobile = useResponsive(931);
  const [circleSelected, setCircleSelected] = useState();
  const [defaultSelected] = useState(storages.length === 1 ? true : false);

  const clickSelected = (code, i) => {
    console.log(code);
    setCircleSelected(i);
    onClick && onClick(code, i);
  };

  return (
    <Storages className={className} mobile={mobile}>
      <TitleColor text={title} />
      <Container>
        {storages.map((storage, index) => (
          <CustomMiniCard
            mobile={mobile}
            key={'storage' + index}
            onClick={() => {
              clickSelected(storage.code, index);
            }}
          >
            <Info
              text={storage.name !== ' ' ? storage.name : '-'}
              defaultSelected={defaultSelected}
              selected={index === circleSelected}
            />
          </CustomMiniCard>
        ))}
      </Container>
    </Storages>
  );
};

export default ContainerStorage;

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
  width: ${({ mobile }) => mobile ? '70px' : '106px'};
  cursor: pointer;
`;

const Info = styled(Text)`
  margin: auto;
  text-align: center;
  ${({ selected, defaultSelected }) =>
    (defaultSelected || selected) &&
    ` font-size: 14px;
    font-family: Montserrat-Bold;
    color: #06c;`};
`;