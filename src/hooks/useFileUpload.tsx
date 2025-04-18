import { useCallback } from "react";
import { SVGService } from "../services/SVGService";
import { LogoManager } from "../models/Logo";
import { FileService } from "../services/FileService";

export function useFileUpload(
  svgService: SVGService,
  logoManager: LogoManager,
  fileService: FileService,
  triggerUpdate: () => void
) {
  const handleSVGUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || file.type !== "image/svg+xml") {
        alert("Please upload an SVG file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        svgService.parseSVGContent(reader.result as string);
        triggerUpdate();
      };
      reader.readAsText(file);
    },
    [svgService, triggerUpdate]
  );

  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        logoManager.add(reader.result as string);
        triggerUpdate();
      };
      reader.readAsDataURL(file);
    },
    [logoManager, triggerUpdate]
  );

  const handleTemplateUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        fileService.loadTemplate(event.target?.result as string);
      };
      reader.readAsText(file);
    },
    [fileService]
  );

  return {
    handleSVGUpload,
    handleLogoUpload,
    handleTemplateUpload,
  };
}
