import React, { useState } from "react";
import styled from "styled-components";
import Box from "./Box";
import Circle from "./Circle";
import useResponsive from "../utils/useResponsive";
import Text from "./Text";
import { getColor } from '../utils/functions';

const ContainerColors = ({ className, colors, title, onClick }) => {
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
            key={"color" + index}
            selected={index === circleSelected}
            onClick={() => {
              clickSelected(color.code, index);
            }}
          >
            <Circle color={getColor(color.name.toLowerCase())} nameColor={color.name}></Circle>
          </CustomBox>
        ))}
      </Container>
    </ContainerColor>
  );
};

export default ContainerColors;

const ContainerColor = styled.div`
  margin: ${({ mobile }) => (mobile ? "auto" : "17px")};
`;
const TitleColor = styled(Text)``;

const Container = styled.div`
  display: flex;
  margin-top: 34px;
`;

const CustomBox = styled(Box)`
  ${({ selected, defaultSelected }) =>
    (defaultSelected || selected) &&
    ` background: #ffffff;
  border: 1px solid #daddf2;
  box-shadow: 0px 1px 2px 1px rgb(37 75 208 / 5%);
  border-radius: 6px;`};
`;
