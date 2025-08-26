declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = FC<IconProps>;

  export const Home: Icon;
  export const User2: Icon;
  export const Wrench: Icon;
  export const GraduationCap: Icon;
  export const FolderKanban: Icon;
  export const Mail: Icon;
  export const ArrowUpRight: Icon;
  export const Github: Icon;
  export const Linkedin: Icon;
  export const Globe: Icon;
  export const Trophy: Icon;
  export const Star: Icon;
  export const Zap: Icon;
}
