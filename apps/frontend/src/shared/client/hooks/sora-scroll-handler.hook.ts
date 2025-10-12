import { useState } from 'react';
import type { OverlayScrollbars } from 'overlayscrollbars';

export const ESoraScrollDistance = {
  /**
   * đang ở top, còn bottom
   *
   * @value:  0
   **/
  Top: 'Top',
  /**
   * đang ở bottom, còn top
   *
   * @value: 1
   **/
  Bottom: 'Bottom',
  /**
   * lăn đến giữa,
   *  còn cả top và bottom
   *
   *  @value: 2
   * */
  Middle: 'Middle',
  /**
   * không có scroll
   *
   * @value: 3
   * */
  None: 'None',
} as const;

export type SoraScrollDistanceType = keyof typeof ESoraScrollDistance;

export const useSoraScrollbar = () => {
  const [scrollPosition, setScrollPosition] = useState<SoraScrollDistanceType>(ESoraScrollDistance.None);

  const handleScroll = (instance: OverlayScrollbars) => {
    const { viewport } = instance.elements();
    const scrollTop = viewport.scrollTop;
    const scrollHeight = viewport.scrollHeight;
    const clientHeight = viewport.clientHeight;

    const distanceFromTop = scrollTop;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const distance = 1;
    if (viewport.scrollHeight === viewport.clientHeight) {
      setScrollPosition(ESoraScrollDistance.None);
      return;
    }
    if (distanceFromTop <= distance) {
      setScrollPosition(ESoraScrollDistance.Top);
    } else if (distanceFromBottom <= distance) {
      setScrollPosition(ESoraScrollDistance.Bottom);
    } else {
      setScrollPosition(ESoraScrollDistance.Middle);
    }
  };

  return {
    handleScroll,
    scrollPosition,
  };
};
