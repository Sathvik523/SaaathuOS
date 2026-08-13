"use client";

import Window from "./Window";
import useWindowManager from "./useWindowManager";

export default function WindowManager() {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          windowId={window.id}
        />
      ))}
    </>
  );
}