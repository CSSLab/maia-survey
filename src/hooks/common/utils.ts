import { useState, useEffect } from "react";

export const SHOW_TURING_INSTRUCTIONS = "preferences:show_turing_instructions";

export const useInnerWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

export type UseModalControllerHook = (
  key: string
) => [[boolean, (value: boolean) => void], [boolean, (value: boolean) => void]];

export const useModalController: UseModalControllerHook = (key: string) => {
  const [showModalPersistent, setShowModalPersistent] = useLocalStorage(
    key,
    true
  );
  const [showModal, setShowModal] = useState(showModalPersistent);

  return [
    [showModal, setShowModal],
    [showModalPersistent, setShowModalPersistent],
  ];
};
