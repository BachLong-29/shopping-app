import React, { ReactNode } from "react";

interface ISecion {
  title: string;
  children?: ReactNode;
}

const Section = ({ title, children }: ISecion) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </>
  );
};

export default Section;
