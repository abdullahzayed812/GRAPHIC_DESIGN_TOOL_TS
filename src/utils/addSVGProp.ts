import { SVGElement } from "./parseSVG";

export function updateSvgElementBrandingType(
  elements: SVGElement[],
  id: string,
  newType: SVGElement["type"]
): SVGElement[] {
  return elements.map((el) => {
    if (el.id === id) {
      return { ...el, type: newType };
    }

    if (el.children && el.children.length > 0) {
      return {
        ...el,
        children: updateSvgElementBrandingType(el.children, id, newType),
      };
    }

    return el;
  });
}
