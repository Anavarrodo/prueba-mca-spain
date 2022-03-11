import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import useResponsive from '../utils/useResponsive';
import MiniCard from './MiniCard';

const DescriptionProduct = ({ nameProduct, dataDescription }) => {
  const mobile = useResponsive(931);

  return (
    <Container>
      <Title text={nameProduct} mobile={mobile} />
      <Subtitle mobile={mobile} text='Especificaciones' />
      <ContainerMiniCard mobile={mobile}>
        {dataDescription.map((element, index) => {
          let isObject = typeof element === 'object';
          return element === '' ||
            element === ' gr' ||
            element === '-' ? null : isObject ? (
            <CustomMiniCard key={'element' + index} separation disabled>
              {' '}
              {element.map((e, i) => (
                <Info key={'e' + i} text={e} />
              ))}
            </CustomMiniCard>
          ) : (
            <CustomMiniCard key={'element' + index} disabled>
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

const Title = styled(Text)`
  font-size: ${({ mobile }) => !mobile && '40px'};
  font-family: Montserrat-Bold;
  text-align: ${({ mobile }) => mobile && 'center'};
`;

const Subtitle = styled(Text)`
  margin: ${({ mobile }) => (mobile ? 'auto' : '17px')};
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
  ${({ separation }) => separation && `flex-direction: column;`}
`;

const Info = styled(Text)`
  margin: auto;
  text-align: center;
`;
