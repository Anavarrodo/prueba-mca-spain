import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = ({ src }) => {
  return <CustomImage src={src} />;
};

export default Image;

const CustomImage = styled.img``;

Image.propTypes = {
  /**
   * Ruta de la imagen
   */
  src: PropTypes.string,
};
