import React from "react";
import styled from "styled-components";
import Text from "./Text";
import useResponsive from "../utils/useResponsive";

const DescriptionProduct = ({ nameProduct, dataDescription }) => {
  console.log(dataDescription);
  const mobile = useResponsive(931);
  return (
    <Container>
      <Title text={nameProduct} mobile={mobile} />
      <Subtitle mobile={mobile} text="Especificaciones" />
      <ContainerMiniCard mobile={mobile}>
        {dataDescription.map((element, index) => {
          let isObject = typeof element === "object";
          return element === "" ||
            element === " gr" ||
            element === "-" ? null : isObject ? (
            <MiniCard key={"element" + index} separation mobile={mobile}>
              {element.map((e, i) => (
                <Info key={"e" + i} text={e} />
              ))}
            </MiniCard>
          ) : (
            <MiniCard key={"element" + index} mobile={mobile}>
              <Info text={element} />
            </MiniCard>
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
  font-size: ${({ mobile }) => !mobile && "40px"};
  font-family: Montserrat-Bold;
  text-align: ${({ mobile }) => mobile && "center"};
`;

const Subtitle = styled(Text)`
  margin: ${({ mobile }) => (mobile ? "auto" : "17px")};
`;

const ContainerMiniCard = styled.div`
  display: grid;
  grid-template-columns: ${({ mobile }) =>
    mobile
      ? "repeat(auto-fit, minmax(98px, 1fr))"
      : "repeat(auto-fit, minmax(234px, 1fr))"};
  align-items: center;
`;
const MiniCard = styled.div`
  background: #ffffff;
  border: 1px solid #daddf2;
  box-shadow: 0px 1px 2px 1px rgb(37 75 208 / 5%);
  border-radius: 6px;
  height: ${({ mobile }) => (mobile ? "55px" : "76px")};
  width: ${({ mobile }) => (mobile ? "98px" : "220px")};
  align-items: center;
  display: flex;
  margin: 12px;
  padding: ${({ mobile }) => (mobile && '4px')};
  box-sizing: content-box;
  ${({ separation }) => separation && `flex-direction: column;`}
`;

const Info = styled(Text)`
  margin: auto;
  text-align: center;
`;