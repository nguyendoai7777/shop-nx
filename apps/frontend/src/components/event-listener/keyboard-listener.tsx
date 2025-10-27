import { KeyboardEvent } from 'react';

interface KeydownListener {
  enter?(e: KeyboardEvent): void;
}

const KeydownBase: FCC<KeydownListener> = ({ children, enter }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enter?.(e);
    }
  };

  return <div onKeyDown={handleKeyDown}>{children}</div>;
};

// Tạo Keydown.enter như một property
const KeydownEnter: FCC<KeydownListener> = ({ children, enter }) => {
  return <KeydownBase enter={enter}>{children}</KeydownBase>;
};

export const Keydown = {
  enter: KeydownEnter,
};
