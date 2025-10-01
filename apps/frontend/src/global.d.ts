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

  export type RMouseEvent<T> = MouseEvent<T>

  function createContext<T>(
    // If you thought this should be optional, see
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
    defaultValue: T,
  ): Context<T>;
}
