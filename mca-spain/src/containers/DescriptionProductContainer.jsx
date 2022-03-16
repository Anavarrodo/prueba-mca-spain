import React from 'react';
import styled from 'styled-components';
import Text from '../components/Text';
import useResponsive from '../hooks/useResponsive';
import MiniCard from '../components/MiniCard';

const DescriptionProduct = ({ dataDescription }) => {
  const mobile = useResponsive(931);

  return (
    <Container>
      <ContainerMiniCard mobile={mobile}>
        {dataDescription.map((element, index) => {
          let isObject = typeof element === 'object';
          return element === '' ||
            element === ' gr' ||
            element === '-' ? null : isObject ? (
            <CustomMiniCard
              mobile={mobile}
              key={'element' + index}
              separation
              disabled
            >
              {' '}
              {element.map((e, i) => (
                <Info key={'e' + i} text={e} />
              ))}
            </CustomMiniCard>
          ) : (
            <CustomMiniCard mobile={mobile} key={'element' + index} disabled>
              <Info text={element} />
            </CustomMiniCard>
          );
        })}
      </ContainerMiniCard>
    </Container>
  );
};

export default DescriptionProduct;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ContainerMiniCard = styled.div`
  display: grid;
  grid-template-columns: ${({ mobile }) =>
    mobile
      ? 'repeat(auto-fit, minmax(98px, 1fr))'
      : 'repeat(auto-fit, minmax(234px, 1fr))'};
  align-items: center;
`;
const CustomMiniCard = styled(MiniCard)`
  ${({ separation }) => separation && `flex-direction: column;`};
  height: ${({ mobile }) => mobile && 'height: auto;'};
`;

const Info = styled(Text)`
  margin: auto;
  text-align: center;
`;
