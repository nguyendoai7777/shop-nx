import { KeyboardEvent } from 'react';

/**
 * Interface cho các listener của Keydown
 */
interface KeydownListener {
  enter?(e: KeyboardEvent): void;
}

/**
 * Component cơ bản bắt phím Enter
 */
const KeydownBase: FCC<KeydownListener> = ({ children, enter }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enter?.(e);
    }
  };

  return <div onKeyDown={handleKeyDown}>{children}</div>;
};

/**
 * Keydown.enter — bắt phím Enter
 */
const KeydownEnter: FCC<KeydownListener> = ({ children, enter }) => {
  return <KeydownBase enter={enter}>{children}</KeydownBase>;
};

/**
 * Hàm tạo component lắng nghe tổ hợp phím
 * Dùng để tái sử dụng logic, ví dụ meta+Enter, meta+Shift,...
 */
function createKeydownCombo(checkFn: (e: KeyboardEvent) => boolean): FCC<KeydownListener> {
  return ({ children, enter }) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (checkFn(e)) {
        e.preventDefault();
        enter?.(e);
      }
    };
    return <div onKeyDown={handleKeyDown}>{children}</div>;
  };
}

/**
 * Định nghĩa nhóm tổ hợp phím meta (Ctrl trên Win/Linux, Cmd trên macOS)
 */
const KeydownMeta = {
  enter: createKeydownCombo((e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter'),
  shift: createKeydownCombo((e) => (e.metaKey || e.ctrlKey) && e.key === 'Shift'),
  escape: createKeydownCombo((e) => (e.metaKey || e.ctrlKey) && e.key === 'Escape'),
};

/**
 * Export chính
 * Keydown.enter  → chỉ Enter
 * Keydown.meta.* → tổ hợp với Ctrl/Cmd
 */
export const Keydown = {
  enter: KeydownEnter,
  meta: KeydownMeta,
};
