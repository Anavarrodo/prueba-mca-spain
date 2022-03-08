import { useState, useEffect } from 'react';

const useResponsive = (resolution = 680) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    // set initial value
    const mediaWatcher = window.matchMedia('(max-width:'+resolution+'px)');
    setMobile(mediaWatcher.matches);

    //watch for updates
    function updateIsNarrowScreen(e) {
      setMobile(e.matches);
    }
    if (mediaWatcher.addEventListener) {
      mediaWatcher.addEventListener('change', updateIsNarrowScreen);
      return function cleanup() {
        mediaWatcher.removeEventListener('change', updateIsNarrowScreen);
      };
    } else {
      mediaWatcher.addEventListener(updateIsNarrowScreen);
      return function cleanup() {
        mediaWatcher.removeEventListener(updateIsNarrowScreen);
      };
    }
  });

  return mobile;
};

export default useResponsive;
