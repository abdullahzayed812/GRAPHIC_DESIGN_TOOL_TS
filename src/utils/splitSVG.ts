import { SVGElement } from "./parseSVG";

// This function is no longer needed as we're handling the hierarchy directly
// I'm keeping it for reference but it's not used in the enhanced component
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

// New interface to represent SVG element with extended properties
export interface EnhancedSVGElement extends SVGElement {
  depth?: number;
  parentId?: string;
  path?: string[];
}

// Helper function to assign depth and path information to SVG elements
export function enrichSVGElements(
  elements: SVGElement[],
  parentId?: string,
  path: string[] = []
): EnhancedSVGElement[] {
  return elements.map((element) => {
    const enhancedElement: EnhancedSVGElement = {
      ...element,
      parentId,
      path: [...path, element.id || "unnamed"],
    };

    if (element.children && element.children.length > 0) {
      enhancedElement.children = enrichSVGElements(element.children, element.id, enhancedElement.path);
    }

    return enhancedElement;
  });
}
