import React from 'react';
import Lottie from 'react-lottie';
import * as cardSpinnerData from '../assets/animations/loading.json';

const Loading = ({width = 100, height = 100}) =>{

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cardSpinnerData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie style={{ height, width }} options={defaultOptions} />;
}
export default Loading;
