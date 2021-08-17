import { useEffect, useState } from "react";

export const buildUrl = (path: string) =>
  process.env.REACT_APP_API_BASE_URL + path;

export const useInnerWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};
