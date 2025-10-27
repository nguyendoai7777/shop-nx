import { Fragment, ReactElement, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Prettify } from '@shop/type';
import { MotionNodeAnimationOptions, MotionNodeLayoutOptions } from 'motion';

export type MotionMergeAnimationProps = Prettify<MotionNodeLayoutOptions & MotionNodeAnimationOptions>;

type OnRender<L> = (item: L, index: number) => ReactNode;

export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: FCC<L> }): ReactElement;

export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: OnRender<L> }): ReactElement;

/**
 * @example
 * ```tsx
 *  <Renderer list={donationList} render={(item) => <DonateItem donate={item} />} />
 *  <Renderer list={donationList} render={DonateItem} />
 * ```
 *
 * */
export function Renderer<L extends Record<string, any>>(props: { list: L[]; render: FCC<L> | OnRender<L> }) {
  return (
    <>
      {props.list.map((item, index) => {
        const render = props.render as any;
        const id = 'id' in item ? item.id : index;
        return <Fragment key={id}>{render(item, index)}</Fragment>;
      })}
    </>
  );
}

type OnAnimateAction<L> = (item: L, index: number) => MotionMergeAnimationProps;

export function AnimateRenderer<L extends Record<string, any>>(props: {
  list: L[];
  render: FCC<L>;
  onAnimate?: OnAnimateAction<L>;
}): ReactElement;

export function AnimateRenderer<L extends Record<string, any>>(props: {
  list: L[];
  render: OnRender<L>;
  onAnimate?: OnAnimateAction<L>;
}): ReactElement;

// Implementation
export function AnimateRenderer<L extends Record<string, any>>(props: {
  list: L[];
  render: FCC<L> | OnRender<L>;
  onAnimate?: OnAnimateAction<L>;
}) {
  return (
    <AnimatePresence>
      {props.list.map((item, index) => {
        const render = props.render as any;
        const id = 'id' in item ? item.id : index;
        const motionProps: MotionMergeAnimationProps = props.onAnimate ? props.onAnimate(item, index) : {};

        return (
          <motion.div key={id} {...motionProps}>
            {render(item, index)}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
