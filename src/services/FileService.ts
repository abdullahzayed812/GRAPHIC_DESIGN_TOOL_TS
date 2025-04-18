import { TextboxManager } from "../models/Textbox";
import { LogoManager } from "../models/Logo";
import { SVGService } from "./SVGService";

export class FileService {
  private textboxManager: TextboxManager;
  private logoManager: LogoManager;
  private svgService: SVGService;
  private containerSize: { width: string; height: string };

  constructor(
    textboxManager: TextboxManager,
    logoManager: LogoManager,
    svgService: SVGService,
    containerSize: { width: string; height: string }
  ) {
    this.textboxManager = textboxManager;
    this.logoManager = logoManager;
    this.svgService = svgService;
    this.containerSize = containerSize;
  }

  saveTemplate(): void {
    const template = {
      textboxes: this.textboxManager.getAll(),
      logos: this.logoManager.getAll(),
      containerSize: this.containerSize,
      svg: this.svgService.getParsedElements(),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "template.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  loadTemplate(fileContent: string): void {
    try {
      const loaded = JSON.parse(fileContent);
      this.textboxManager.setAll(loaded.textboxes);
      this.logoManager.setAll(loaded.logos);
      this.containerSize = loaded.containerSize;
      this.svgService.setParsedElements(loaded.svg);
    } catch (error) {
      console.error("Failed to parse template:", error);
      throw new Error("Invalid template file format");
    }
  }

  setContainerSize(prop: string, value: string): void {
    this.containerSize = { ...this.containerSize, [prop]: value };
  }

  getContainerSize(): { width: string; height: string } {
    return this.containerSize;
  }
}
