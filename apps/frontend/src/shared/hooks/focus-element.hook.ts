import { useEffect, useState } from 'react';

export const useFocusElement = <
  E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(
  selectors: string,
  options?: FocusOptions
) => {
  const [element, setElement] = useState<E>();
  useEffect(() => {
    const elm = document.querySelector<E>(selectors);
    elm?.focus(options);
    setElement(elm as E);
  }, []);
  return { element };
};
