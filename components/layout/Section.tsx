import React, { ReactNode } from "react";

interface IProps {
  title: string;
  children?: ReactNode;
}

const Section = ({ title, children }: IProps) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </>
  );
};

export default Section;
