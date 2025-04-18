import { createContext, ReactNode, useContext, useState, useMemo, useCallback } from "react";
import { TextboxManager, Textbox, Branding } from "../models/Textbox";
import { LogoManager, Logo } from "../models/Logo";
import { SVGService } from "../services/SVGService";
import { FileService } from "../services/FileService";
import { useFileUpload } from "../hooks/useFileUpload";
import { SVGElement } from "../utils/parseSVG";

interface TextboxContextProps {
  textboxes: Textbox[];
  svgContent: ReactNode | null;
  parsedSvg: SVGElement[];
  selectedTextbox: string | null;
  addTextbox: () => void;
  selectTextbox: (id: string) => void;
  updateTextboxStyle: (id: string, style: any) => void;
  updateTextboxCoords: (id: string, x: number, y: number) => void;
  logos: Logo[];
  addLogo: (src: string) => void;
  updateLogoCoords: (id: string, x: number, y: number) => void;
  updateTextboxMeta: (id: string, updates: { name?: string; tag?: string }) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorChange: (id: string, color: string) => void;
  containerSize: { width: string; height: string };
  handleContainerSizeChange: (prop: string, value: string) => void;
  updateTextboxBranding: (
    id: string,
    updates: { type: keyof Branding; value: "primary" | "secondary" | "additional" | "fixed" }
  ) => void;
  updateLogoSize: (id: string, width: number, height: number) => void;
  selectedLogo: string | null;
  selectLogo: (id: string) => void;
  updateLogoMeta: (id: string, updates: { label?: string }) => void;
  saveTemplate: () => void;
  loadTemplate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearCanvas: () => void;
  handleSVGShapeBrandingTypeChange: (id: string, newType: SVGElement["type"]) => void;
}

const TextboxContext = createContext<TextboxContextProps | undefined>(undefined);

interface TextboxProviderProps {
  children: ReactNode;
}

export const TextboxProvider: React.FC<TextboxProviderProps> = ({ children }) => {
  // Initialize services
  const textboxManager = useMemo(() => new TextboxManager(), []);
  const logoManager = useMemo(() => new LogoManager(), []);
  const svgService = useMemo(() => new SVGService(), []);
  const [containerSize, setContainerSize] = useState({ width: "800px", height: "1080px" });

  const fileService = useMemo(
    () => new FileService(textboxManager, logoManager, svgService, containerSize),
    [textboxManager, logoManager, svgService, containerSize]
  );

  // State to trigger re-renders
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force re-render when needed
  const triggerUpdate = useCallback(() => {
    setForceUpdate((prev) => prev + 1);
  }, []);

  // File upload hooks
  const { handleSVGUpload, handleLogoUpload, handleTemplateUpload } = useFileUpload(
    svgService,
    logoManager,
    fileService,
    triggerUpdate
  );

  // Methods that require state updates
  const addTextbox = useCallback(() => {
    textboxManager.add();
    triggerUpdate();
  }, [textboxManager, triggerUpdate]);

  const selectTextbox = useCallback(
    (id: string) => {
      textboxManager.select(id);
      logoManager.deselect();
      triggerUpdate();
    },
    [textboxManager, logoManager, triggerUpdate]
  );

  const updateTextboxStyle = useCallback(
    (id: string, style: any) => {
      textboxManager.updateStyle(id, style);
      triggerUpdate();
    },
    [textboxManager, triggerUpdate]
  );

  const updateTextboxCoords = useCallback(
    (id: string, x: number, y: number) => {
      textboxManager.updateCoords(id, x, y);
      triggerUpdate();
    },
    [textboxManager, triggerUpdate]
  );

  const updateTextboxMeta = useCallback(
    (id: string, updates: { name?: string; tag?: string }) => {
      textboxManager.updateMeta(id, updates);
      triggerUpdate();
    },
    [textboxManager, triggerUpdate]
  );

  const updateTextboxBranding = useCallback(
    (id: string, updates: { type: keyof Branding; value: "primary" | "secondary" | "additional" | "fixed" }) => {
      textboxManager.updateBranding(id, updates);
      triggerUpdate();
    },
    [textboxManager, triggerUpdate]
  );

  const addLogo = useCallback(
    (src: string) => {
      logoManager.add(src);
      triggerUpdate();
    },
    [logoManager, triggerUpdate]
  );

  const selectLogo = useCallback(
    (id: string) => {
      logoManager.select(id);
      textboxManager.deselect();
      triggerUpdate();
    },
    [logoManager, textboxManager, triggerUpdate]
  );

  const updateLogoCoords = useCallback(
    (id: string, x: number, y: number) => {
      logoManager.updateCoords(id, x, y);
      triggerUpdate();
    },
    [logoManager, triggerUpdate]
  );

  const updateLogoSize = useCallback(
    (id: string, width: number, height: number) => {
      logoManager.updateSize(id, width, height);
      triggerUpdate();
    },
    [logoManager, triggerUpdate]
  );

  const updateLogoMeta = useCallback(
    (id: string, updates: { label?: string }) => {
      logoManager.updateMeta(id, updates);
      triggerUpdate();
    },
    [logoManager, triggerUpdate]
  );

  const handleColorChange = useCallback(
    (id: string, color: string) => {
      svgService.updateElementColor(id, color);
      triggerUpdate();
    },
    [svgService, triggerUpdate]
  );

  const handleSVGShapeBrandingTypeChange = useCallback(
    (id: string, newType: SVGElement["type"]) => {
      svgService.updateBrandingType(id, newType);
      triggerUpdate();
    },
    [svgService, triggerUpdate]
  );

  const handleContainerSizeChange = useCallback(
    (prop: string, value: string) => {
      fileService.setContainerSize(prop, value);
      setContainerSize(fileService.getContainerSize());
    },
    [fileService]
  );

  const saveTemplate = useCallback(() => {
    fileService.saveTemplate();
  }, [fileService]);

  const clearCanvas = useCallback(() => {
    textboxManager.clear();
    logoManager.clear();
    svgService.clear();
    triggerUpdate();
  }, [textboxManager, logoManager, svgService, triggerUpdate]);

  // Provide context
  const contextValue: TextboxContextProps = {
    textboxes: textboxManager.getAll(),
    svgContent: svgService.getSvgContentNode(),
    parsedSvg: svgService.getParsedElements(),
    selectedTextbox: textboxManager.getSelected(),
    addTextbox,
    selectTextbox,
    updateTextboxStyle,
    updateTextboxCoords,
    logos: logoManager.getAll(),
    addLogo,
    updateLogoCoords,
    updateTextboxMeta,
    handleColorChange,
    handleFileUpload: handleSVGUpload,
    handleLogoUpload,
    containerSize,
    handleContainerSizeChange,
    updateTextboxBranding,
    updateLogoSize,
    selectedLogo: logoManager.getSelected(),
    selectLogo,
    updateLogoMeta,
    saveTemplate,
    loadTemplate: handleTemplateUpload,
    clearCanvas,
    handleSVGShapeBrandingTypeChange,
  };

  return <TextboxContext.Provider value={contextValue}>{children}</TextboxContext.Provider>;
};

export const useTextboxContext = () => {
  const context = useContext(TextboxContext);
  if (!context) {
    throw new Error("useTextboxContext must be used within a TextboxProvider");
  }
  return context;
};
