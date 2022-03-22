import React from 'react';

const useSessionStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        setInterval(() => {
          sessionStorage.clear(keyName);
        }, 3600000);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
