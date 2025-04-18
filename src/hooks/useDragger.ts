import { useRef, useEffect } from "react";
import { useTextboxContext } from "../context";

export function useDragger(id: string): void {
  const { updateTextboxCoords } = useTextboxContext();
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const updateInitialPosition = () => {
      const rect = target.getBoundingClientRect();
      console.log({ rect });
      const x = target.offsetLeft;
      const y = target.offsetTop;
      coords.current.lastX = x;
      coords.current.lastY = y;
    };

    updateInitialPosition();

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;

      // Get the position of the element relative to the page or container
      coords.current.startX = e.clientX - target.offsetLeft;
      coords.current.startY = e.clientY - target.offsetTop;

      // Save current position as the last known position
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isClicked.current) return;

      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;

      // Update the parent component with new coordinates
      updateTextboxCoords(id, coords.current.lastX, coords.current.lastY);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return; // Prevent movement when not clicked

      // Calculate the new position by taking into account the starting offset
      const nextX = e.clientX - coords.current.startX;
      const nextY = e.clientY - coords.current.startY;

      target.style.left = `${nextX}px`;
      target.style.top = `${nextY}px`;

      console.log(`Dragged to: X: ${nextX}, Y: ${nextY}`);
    };

    // Add mouse event listeners to the target element and container
    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp); // Ensure the drag stops if mouse leaves

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id, updateTextboxCoords]);
}
