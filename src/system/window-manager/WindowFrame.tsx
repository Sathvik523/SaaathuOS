"use client";

import { ReactNode, useCallback, useRef } from "react";

interface WindowFrameProps {
  active: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing?: boolean;
  isMinimizing?: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onFocus: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: (dragHandleProps: { onMouseDown: (e: React.MouseEvent) => void }) => ReactNode;
}

export default function WindowFrame({
  active,
  isMinimized,
  isMaximized,
  isClosing = false,
  isMinimizing = false,
  position,
  size,
  zIndex,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
}: WindowFrameProps) {
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, windowX: 0, windowY: 0 });

  const isResizingRef = useRef(false);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Handle Dragging
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      onFocus();
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        windowX: position.x,
        windowY: position.y,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDraggingRef.current) return;
        const deltaX = moveEvent.clientX - dragStartRef.current.x;
        const deltaY = moveEvent.clientY - dragStartRef.current.y;

        const newX = Math.max(10, dragStartRef.current.windowX + deltaX);
        const newY = Math.max(38, dragStartRef.current.windowY + deltaY);

        onPositionChange({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [isMaximized, position, onFocus, onPositionChange]
  );

  // Handle Resizing
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMaximized) return;
      onFocus();
      isResizingRef.current = true;
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isResizingRef.current) return;
        const deltaX = moveEvent.clientX - resizeStartRef.current.x;
        const deltaY = moveEvent.clientY - resizeStartRef.current.y;

        const newWidth = Math.max(450, resizeStartRef.current.width + deltaX);
        const newHeight = Math.max(300, resizeStartRef.current.height + deltaY);

        onSizeChange({ width: newWidth, height: newHeight });
      };

      const handleMouseUp = () => {
        isResizingRef.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [isMaximized, size, onFocus, onSizeChange]
  );

  if (isMinimized && !isMinimizing) {
    return null;
  }

  // Maximized bounds vs Normal bounds
  const style: React.CSSProperties = isMaximized
    ? {
        position: "fixed",
        top: "42px",
        left: "8px",
        right: "8px",
        bottom: "84px",
        zIndex,
        boxShadow: active
          ? "0 25px 65px -10px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12)"
          : "0 15px 40px -10px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
      }
    : {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
        boxShadow: active
          ? "0 28px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12)"
          : "0 16px 45px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
      };

  return (
    <div
      onClick={onFocus}
      style={style}
      className={`
        flex flex-col overflow-hidden rounded-[14px]
        bg-[#18191E]/95 backdrop-blur-3xl border border-white/[0.08]
        transition-all duration-200 ease-out origin-bottom
        ${isClosing ? "scale-90 opacity-0 pointer-events-none" : ""}
        ${isMinimizing ? "scale-50 translate-y-72 opacity-0 pointer-events-none" : ""}
        ${!isClosing && !isMinimizing ? "animate-in fade-in zoom-in-95 duration-150" : ""}
        ${active ? "opacity-100 ring-1 ring-white/10" : "opacity-95 border-white/[0.04]"}
      `}
    >
      {children({ onMouseDown: handleDragStart })}

      {/* Resize handle (bottom right) */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize select-none"
        />
      )}
    </div>
  );
}