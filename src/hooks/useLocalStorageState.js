import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultVal) {
  const [state, setState] = useState(() => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem(key)) || defaultVal;
    } catch (e) {
      val = defaultVal;
    }
    return val;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}

export default useLocalStorageState;
