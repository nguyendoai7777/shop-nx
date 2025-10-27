import { ReactElement, ReactNode, MouseEvent, KeyboardEvent, Context, RefObject } from 'react';
import { Prettify } from '@shop/type';
import { MotionNodeAnimationOptions, MotionNodeLayoutOptions } from 'motion';

declare global {
  export type PropsWithChildren<P> = P & { children?: ReactNode };

  export interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    displayName?: string | undefined;
  }

  export type FCC<P = {}> = FunctionComponent<P>;

  export type RMouseEvent<T> = MouseEvent<T>;
  export type RKeyboardEvent<R> = KeyboardEvent<R>;

  // App
}

declare module 'react' {
  function createContext<T>(defaultValue: T): Context<T>;
  function createContext<T = undefined>(): Context<T>;
  function useRef<T>(initialValue: T): RefObject<T>;
  function useRef<T = undefined>(): RefObject<T>;
}
