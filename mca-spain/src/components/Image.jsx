import React from "react";
import styled from "styled-components";

const Image = ({ src }) => {
  return <CustomImage src={src} />
};

export default Image;

const CustomImage = styled.img``;
