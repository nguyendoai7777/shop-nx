import { ReactElement, ReactNode } from 'react';

/*
export interface RendererProps<L extends Record<string, any>> {
  list: L[];
  render(item: L, index: number): FCC<L>;
}

export const Renderer = <L extends Record<string, any>,>(props: RendererProps<L>) => {
  return props.list.map((item, index) => props.render(item, index))
};

*/

export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: FCC<L> }): ReactElement;

export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: (item: L, index: number) => ReactNode }): ReactElement;

// Implementation
export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: FCC<L> | ((item: L, index: number) => ReactNode) }) {
  return (
    <>
      {props.list.map((item, index) => {
        const render = props.render as any;
        if (render.length > 0) {
          return render(item, index);
        }
        const Component = render as FCC<L>;
        return <Component key={index} {...item} />;
      })}
    </>
  );
}
