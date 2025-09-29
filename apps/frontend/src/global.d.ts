import { ReactElement, ReactNode } from 'react';

declare global {
  export type PropsWithChildren<P> = P & { children: ReactNode };

  export interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    displayName?: string | undefined;
  }

  export type FCC<P = {}> = FunctionComponent<P>;
}
