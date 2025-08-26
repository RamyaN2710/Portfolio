declare module 'framer-motion' {
  import { ComponentType, CSSProperties, ReactElement } from 'react';

  export interface AnimatePresenceProps {
    children: ReactElement | ReactElement[];
    mode?: 'sync' | 'wait' | 'popLayout';
  }

  export interface MotionProps {
    children?: React.ReactNode;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    style?: CSSProperties;
    className?: string;
    key?: any;
    'data-testid'?: string;
    'aria-live'?: string;
  }

  export const motion: {
    div: ComponentType<MotionProps>;
    article: ComponentType<MotionProps>;
    li: ComponentType<MotionProps>;
  };

  export const AnimatePresence: ComponentType<AnimatePresenceProps>;
}
