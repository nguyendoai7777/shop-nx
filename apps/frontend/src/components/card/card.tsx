'use client';
import './card.css';
export interface CardProps {
  index: number;
}

export const XCard: FCC<CardProps> = ({ className = '', children, index }) => {
  const StyleMap: Record<number, string> = {
    0: 'XCard1',
    1: 'XCard2',
    2: 'XCard3',
  };
  const StyleMap1: Record<number, string> = {
    0: 'XCard1',
    1: 'XCard2',
    2: 'XCard3',
  };
  const StyleXMap1: Record<number, string> = {
    0: 'XTxt1',
    1: 'XTxt2',
    2: 'XTxt3',
  };
  const _x = StyleMap[index] ?? 'bg-gray-300/10';
  const _x1 = StyleMap1[index] ?? '';
  const _t = StyleXMap1[index] ?? '';
  return (
    /*<div className={`XCard aspect-[9/14] py-4 relative rounded-xl overflow-hidden ${className}`}>
      <div className="idle inset-0 w-[100px] h-[100px] absolute rotate-45"></div>
      {children}
    </div>*/
    <article className={`XCard aspect-[9/14] overflow-hidden p-0.5 relative rounded-xl ${className}`}>
      <div className="absolute top-0 left-0 z-100 pl-2 py-1 ranking-order">
        {[0].includes(index) ? (
          <svg className={_t}>
            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
              {index + 1}
            </text>
          </svg>
        ) : (
          <>{index + 1}</>
        )}
      </div>
      <div className="idle inset-0 w-full aspect-square absolute">
        <div className={`w-full h-full rotate-45 rx ${_x1}`}></div>
      </div>
      <div className={`block space-y-2 rounded-[11px] z-10 relative px-5 py-2 h-full ${_x}`}>{children}</div>
    </article>
  );
};
