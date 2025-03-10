import React, { ReactNode } from "react";

const WrapperContent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-xl bg-[hsl(var(--muted-custom))]">
          {children}
        </div>
      </div>
    </>
  );
};

export default WrapperContent;
