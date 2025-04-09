import { SVGElement } from "./parseSVG";

export function splitSVGElements(elements: SVGElement[]): SVGElement[][] {
  // Function to recursively extract all shapes and their children
  function extractShapes(element: SVGElement): SVGElement[] {
    const shapes: SVGElement[] = [];

    if (element.tag === "svg") {
      // Recursively extract shapes from children
      for (const child of element.children || []) {
        shapes.push(...extractShapes(child));
      }
    } else {
      // This is a shape, add it to the list
      shapes.push(element);
    }

    return shapes;
  }

  const splitArrays: SVGElement[][] = [];

  // Iterate through the provided elements and extract shapes
  for (const element of elements) {
    if (element.tag === "svg") {
      // Add each shape within the SVG element to a new array
      splitArrays.push(...extractShapes(element).map((shape) => [shape]));
    } else {
      // For non-<svg> tags, treat as standalone shapes
      splitArrays.push([element]);
    }
  }

  return splitArrays;
}
