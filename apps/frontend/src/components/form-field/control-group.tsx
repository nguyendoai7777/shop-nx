'use client';
import { Children, cloneElement, isValidElement, ReactElement, useEffect } from 'react';

export interface ControlGroupProps {}

export const ControlGroup: FCC<ControlGroupProps> = ({ children }) => {
  const childArray = Children.toArray(children);
  const total = childArray.length;
  const enhancedChildren = childArray.map((child, index) => {
    if (!isValidElement(child)) return child;

    const isFirst = index === 0;
    const isLast = index === total - 1;
    const element = child as ReactElement<{ className?: string }>;
    const prevClass = element.props.className ?? '';
    const newClass =
      total > 0
        ? prevClass +
          ' ControlGroupItem' +
          (isFirst ? ' ControlGroupItemFirst' : '') +
          (isLast ? ' ControlGroupItemLast' : '')
        : '';
    return cloneElement(element, { className: newClass });
  });

  return <div className="ControlGroup flex">{enhancedChildren}</div>;
};
