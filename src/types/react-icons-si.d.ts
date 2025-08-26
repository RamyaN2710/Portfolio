declare module 'react-icons/si' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    title?: string;
  }

  export type Icon = FC<IconProps>;

  export const SiHtml5: Icon;
  export const SiCss3: Icon;
  export const SiJavascript: Icon;
  export const SiTypescript: Icon;
  export const SiReact: Icon;
  export const SiNextdotjs: Icon;
  export const SiNestjs: Icon;
  export const SiOracle: Icon;
  export const SiOpenjdk: Icon;
  export const SiPython: Icon;
}
