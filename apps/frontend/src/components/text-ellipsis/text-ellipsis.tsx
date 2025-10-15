'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode, useEffect, useRef, useState } from 'react';

interface TextTruncateDetectorProps<T extends ElementType = 'div'> {
  as?: T;
  children: ReactNode;
  onEllipsis?: (e?: RMouseEvent<HTMLElement>) => void;
  className?: string;
}

type PolymorphicProps<T extends ElementType> = TextTruncateDetectorProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextTruncateDetectorProps<T>>;

export const TextEllipsis = <T extends ElementType = 'div'>({
  as,
  children,
  onEllipsis: ellipsis,
  className = '',
  ...props
}: PolymorphicProps<T>) => {
  const Component = as || 'div';
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = (): void => {
      if (textRef.current) {
        const el = textRef.current;
        setIsOverflowing(el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  return (
    <Component
      ref={textRef}
      className={`line-clamp-1 ${isOverflowing ? 'cursor-pointer mask-right' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
