import React, { ReactNode } from "react";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 border-r w-[150px]">{children}</div>
  );
};
