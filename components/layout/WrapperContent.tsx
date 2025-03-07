import React, { ReactNode } from "react";

const WrapperContent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-xl bg-muted/50">{children}</div>
      </div>
    </>
  );
};

export default WrapperContent;
