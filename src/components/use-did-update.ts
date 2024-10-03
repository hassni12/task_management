import { useRef, useEffect } from 'react';

const useDidUpdate = (
  f: () => void | (() => void), 
  conditions: any[] 
): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    // Cleanup effects when f returns a function
    return f && f(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, conditions);
};

export default useDidUpdate;
