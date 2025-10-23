import { AnimatePresence, motion } from 'motion/react';

export interface ErrorHelperProps {}

export const ErrorHelper: FCC<ErrorHelperProps> = ({ children }) => {
  return (
    <div className="h-5 pl-3 flex items-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={children?.toString()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="text-red-500 text-xs"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
