import { ReactElement, ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';

export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: FCC<L> }): ReactElement;

export function Renderer<L extends Record<string, any>>(props: {
  list: L[];
  render: (item: L, index: number) => ReactNode;
}): ReactElement;

// Implementation
export function Renderer<L extends Record<string, any>>(props: {
  list: L[];
  render: FCC<L> | ((item: L, index: number) => ReactNode);
}) {
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

export function AnimateRenderer<L extends Record<string, any>>(props: {
  list: L[];
  render: FCC<L>;
  emptyComponent?: ReactElement;
}): ReactElement;

export function AnimateRenderer<L extends Record<string, any>>(props: {
  list: L[];
  render: (item: L, index: number) => ReactNode;
  emptyComponent?: ReactElement;
}): ReactElement;

// Implementation
export function AnimateRenderer<L extends Record<string, any>>(props: {
  list: L[];
  render: FCC<L> | ((item: L, index: number) => ReactNode);
  emptyComponent?: ReactElement;
}) {
  const { emptyComponent } = props;
  return (
    <AnimatePresence>
      {props.list.map((item, index) => {
        const render = props.render as any;
        if (render.length > 0) {
          return render(item, index);
        }
        const Component = render as FCC<L>;
        return <Component key={index} {...item} />;
      })}
      {!props.list.length && emptyComponent ? emptyComponent : <></>}
    </AnimatePresence>
  );
}
