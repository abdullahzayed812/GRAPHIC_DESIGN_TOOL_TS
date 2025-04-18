import { ReactNode } from "react";
import { parseSVG, SVGElement } from "../utils/parseSVG";
import { serializeSVG } from "../utils/serializeSVG";
import { updateSvgElementBrandingType } from "../utils/addSVGProp";

export class SVGService {
  private parsedElements: SVGElement[] = [];
  private svgContentNode: ReactNode | null = null;

  getParsedElements(): SVGElement[] {
    return this.parsedElements;
  }

  getSvgContentNode(): ReactNode | null {
    return this.svgContentNode;
  }

  parseSVGContent(svgContent: string): void {
    const parsedElements = parseSVG(svgContent);
    this.parsedElements = parsedElements;

    const updatedSvg = serializeSVG(parsedElements);
    this.svgContentNode = <div dangerouslySetInnerHTML={{ __html: updatedSvg }} />;
  }

  updateElementColor(id: string, color: string): void {
    const updateElementColorRecursive = (element: SVGElement): SVGElement => {
      if (element.id === id) {
        element.props["fill"] = color;
      }

      if (element.children && element.children.length > 0) {
        element.children = element.children.map(updateElementColorRecursive);
      }

      return element;
    };

    this.parsedElements = this.parsedElements.map(updateElementColorRecursive);
    const updatedSvg = serializeSVG(this.parsedElements);
    this.svgContentNode = <div dangerouslySetInnerHTML={{ __html: updatedSvg }} />;
  }

  updateBrandingType(id: string, newType: SVGElement["type"]): void {
    this.parsedElements = updateSvgElementBrandingType(this.parsedElements, id, newType);
    const updatedSvg = serializeSVG(this.parsedElements);
    this.svgContentNode = <div dangerouslySetInnerHTML={{ __html: updatedSvg }} />;
  }

  clear(): void {
    this.parsedElements = [];
    this.svgContentNode = null;
  }

  serialize(): string {
    return serializeSVG(this.parsedElements);
  }

  setParsedElements(elements: SVGElement[]): void {
    this.parsedElements = elements;
    const updatedSvg = serializeSVG(elements);
    this.svgContentNode = <div dangerouslySetInnerHTML={{ __html: updatedSvg }} />;
  }
}
