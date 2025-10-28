'use client';
import { XVGSrc } from './xvg.types';

export interface XvgProps {
  src: XVGSrc;

  size?: string;
}

export const Xvg: FCC<XvgProps> = ({ src, size = '24px', className = '' }) => {
  return (
    <>
      <svg className={className} style={{ '--size': size, width: size, height: size }}>
        <use href={`/icon.svg#${src}`} />
      </svg>
    </>
  );
};
