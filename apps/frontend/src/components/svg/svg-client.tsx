import { CastString } from '@shop/type';

type SVGClientSource = 'Verified';

export interface SvgClientProps {
  href: CastString<SVGClientSource>
  className?: string
}

export const SvgClient: FCC<SvgClientProps> = ({ href, className }) => {

  return (
    <svg className={`icon ${className ? className : ''}`}>
      <use href={`/icon.svg#${href}`} />
    </svg>
  );
};