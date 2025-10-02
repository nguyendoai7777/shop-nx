import {
  ReactElement,
  ReactNode,
  MouseEvent,
  createContext,
  Context,
} from 'react';

declare global {
  export type PropsWithChildren<P> = P & { children?: ReactNode };

  export interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    displayName?: string | undefined;
  }

  export type FCC<P = {}> = FunctionComponent<P>;

  export type RMouseEvent<T> = MouseEvent<T>;

}

declare module 'react' {

  function createContext<T>(defaultValue: T): Context<T>;
  function createContext<T = undefined>(): Context<T>;
}