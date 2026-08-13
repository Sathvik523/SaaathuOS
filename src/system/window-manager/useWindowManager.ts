"use client";

import { useContext } from "react";

import { WindowContext } from "./WindowContext";

export default function useWindowManager() {
  const context = useContext(WindowContext);

  if (!context) {
    throw new Error(
      "useWindowManager must be used inside WindowProvider."
    );
  }

  return context;
}