"use client";

import { ReactNode } from "react";

interface WindowContentProps {
  children: ReactNode;
}

export default function WindowContent({
  children,
}: WindowContentProps) {
  return (
    <div
      className="
        flex-1
        overflow-hidden
        bg-neutral-950
      "
    >
      {children}
    </div>
  );
}