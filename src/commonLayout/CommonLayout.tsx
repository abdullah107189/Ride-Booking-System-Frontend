import type { ReactNode } from "react";

export interface IProps {
  children: ReactNode;
}
export default function CommonLayout({ children }: IProps) {
  return <div>{children} </div>;
}
