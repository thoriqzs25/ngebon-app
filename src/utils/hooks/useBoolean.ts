import { useRef, useState } from 'react';

const useBoolean = (
  initialValue: boolean
): {
  value: boolean;
  setValue: {
    toggle: () => void;
    true: () => void;
    false: () => void;
  };
} => {
  const [value, setVal] = useState<boolean>(initialValue);

  const setValue = useRef({
    toggle: () => setVal((oldValue) => !oldValue),
    true: () => setVal(true),
    false: () => setVal(false),
  }).current;

  return {
    value,
    setValue,
  };
};

export default useBoolean;
