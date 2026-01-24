import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <section className={`max-w-400 mx-auto  ${className}`}>{children}</section>
  );
};

export default Container;
