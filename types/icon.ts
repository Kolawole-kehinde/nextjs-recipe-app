import { SVGProps } from "react";

export interface CustomSVGProps extends SVGProps<SVGSVGElement> {
  color?: string;
  multi_colors?: string[];
  active?: boolean;
}