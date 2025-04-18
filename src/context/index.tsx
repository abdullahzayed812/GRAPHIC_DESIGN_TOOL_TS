import { createContext, ReactNode, useContext, useState } from "react";
import { parseSVG, SVGElement } from "../utils/parseSVG";
import { serializeSVG } from "../utils/serializeSVG";
import { updateSvgElementBrandingType } from "../utils/addSVGProp";

export interface TextboxStyle {
  borderStyle: string;
  borderColor: string;
  fontSize: string;
  fontFamily: string;
  backgroundColor: string;
  backgroundOpacity: string;
  textColor: string;
  borderRadius: string;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline";
  paddingTop: string;
  paddingLeft: string;
  paddingRight: string;
  paddingBottom: string;
  opacity: number;
}

interface Branding {
  [index: string]: "primary" | "secondary" | "additional" | "fixed";
  textColorBrandingType: "primary" | "secondary" | "additional" | "fixed";
  containerColorBrandingType: "primary" | "secondary" | "additional" | "fixed";
}

export interface Textbox {
  id: string;
  x: number;
  y: number;
  style: TextboxStyle;
  branding: Branding;
  name?: string;
  tag?: string;
}

interface Logo {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

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
  const [textboxes, setTextboxes] = useState<Textbox[]>([]);
  const [selectedTextbox, setSelectedTextbox] = useState<string | null>(null);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<ReactNode | null>(null);
  const [parsedSvg, setParsedSvg] = useState<SVGElement[]>([]);
  const [containerSize, setContainerSize] = useState({ width: "800px", height: "1080px" });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const svgContent = reader.result as string;

        const parsedElements = parseSVG(svgContent);
        setParsedSvg(parsedElements);

        const updatedSvg = serializeSVG(parsedElements);
        setSvgContent(<div dangerouslySetInnerHTML={{ __html: updatedSvg }} />);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload an SVG file.");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        addLogo(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  const handleColorChange = (id: string, color: string) => {
    const updateElementColor = (element: SVGElement): SVGElement => {
      // Check if this element is the one we're updating
      if (element.id === id) {
        // Update the color (fill) of the element
        element.props["fill"] = color;
      }

      // If the element has children, recursively update their color as well
      if (element.children && element.children.length > 0) {
        element.children = element.children.map(updateElementColor); // Recursively apply to children
      }

      return element;
    };

    // Map over the parsed SVG to update each element (including nested ones)
    const updatedElements = parsedSvg.map(updateElementColor);

    // Serialize the updated SVG elements to string
    const updatedSvg = serializeSVG(updatedElements);

    // Log the changes (for debugging)
    console.log({ id, color, updatedElements });

    // Update state with the modified SVG elements and the new content to render
    setParsedSvg(updatedElements);
    setSvgContent(<div dangerouslySetInnerHTML={{ __html: updatedSvg }} />);
  };

  const handleSVGShapeBrandingTypeChange = (id: string, newType: SVGElement["type"]) => {
    setParsedSvg((prevElements) => updateSvgElementBrandingType(prevElements, id, newType));
  };

  const addTextbox = () => {
    const newTextbox: Textbox = {
      id: `textbox-${textboxes.length + 1}`,
      x: 50,
      y: 50,
      style: {
        borderStyle: "solid",
        borderColor: "#000000",
        fontSize: "16px",
        fontFamily: "Arial",
        backgroundColor: "#FFFFFF",
        backgroundOpacity: "1",
        textColor: "#000000",
        borderRadius: "5px",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        paddingTop: "2px",
        paddingLeft: "2px",
        paddingBottom: "2px",
        paddingRight: "2px",
        opacity: 1,
      },
      branding: {
        textColorBrandingType: "fixed",
        containerColorBrandingType: "fixed",
      },
    };
    setTextboxes((prev) => [...prev, newTextbox]);
  };

  const selectTextbox = (id: string) => {
    setSelectedTextbox(id);
  };

  const updateTextboxStyle = (id: string, style: any) => {
    setTextboxes((prev) => prev.map((textbox) => (textbox.id === id ? { ...textbox, style } : textbox)));
  };

  const updateTextboxCoords = (id: string, x: number, y: number) => {
    setTextboxes((prev) => prev.map((textbox) => (textbox.id === id ? { ...textbox, x, y } : textbox)));
  };

  const updateTextboxMeta = (id: string, updates: { name?: string; tag?: string }) => {
    setTextboxes((prev) => prev.map((textbox) => (textbox.id === id ? { ...textbox, ...updates } : textbox)));
  };

  const updateTextboxBranding = (
    id: string,
    updates: { type: keyof Branding; value: "primary" | "secondary" | "additional" | "fixed" }
  ) => {
    setTextboxes((prev) =>
      prev.map((textbox: Textbox) =>
        textbox.id === id ? { ...textbox, branding: { ...textbox.branding, [updates.type]: updates.value } } : textbox
      )
    );
  };

  const addLogo = (src: string) => {
    const newLogo: Logo = {
      id: `logo-${logos.length + 1}`,
      src,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      label: "",
    };
    setLogos((prev) => [...prev, newLogo]);
  };

  const selectLogo = (id: string) => {
    setSelectedTextbox(null); // Deselect textbox
    setSelectedLogo(id);
  };

  const updateLogoCoords = (id: string, x: number, y: number) => {
    setLogos((prev) => prev.map((logo) => (logo.id === id ? { ...logo, x, y } : logo)));
  };

  const updateLogoSize = (id: string, width: number, height: number) => {
    setLogos((prev) => prev.map((logo) => (logo.id === id ? { ...logo, width, height } : logo)));
  };

  const updateLogoMeta = (id: string, updates: { label?: string }) => {
    setLogos((prev) => prev.map((logo) => (logo.id === id ? { ...logo, ...updates } : logo)));
  };

  const handleContainerSizeChange = (prop: string, value: string) => {
    setContainerSize((prev) => ({ ...prev, [prop]: value }));
  };

  const saveTemplate = () => {
    const template = {
      textboxes,
      logos,
      containerSize,
      svg: serializeSVG(parsedSvg),
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "template.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const loadTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const loaded = JSON.parse(event.target?.result as string);
      setTextboxes(loaded.textboxes);
      setLogos(loaded.logos);
      setContainerSize(loaded.containerSize);
      setParsedSvg(loaded.svg);
      setSvgContent(<div dangerouslySetInnerHTML={{ __html: serializeSVG(loaded.svg) }} />);
    };
    reader.readAsText(file);
  };

  const clearCanvas = () => {
    setTextboxes([]);
    setLogos([]);
    setSvgContent(null);
    setParsedSvg([]);
  };

  return (
    <TextboxContext.Provider
      value={{
        textboxes,
        svgContent,
        selectedTextbox,
        addTextbox,
        selectTextbox,
        updateTextboxStyle,
        updateTextboxCoords,
        logos,
        addLogo,
        updateLogoCoords,
        updateTextboxMeta,
        handleColorChange,
        handleFileUpload,
        handleLogoUpload,
        parsedSvg,
        handleContainerSizeChange,
        containerSize,
        updateTextboxBranding,
        updateLogoSize,
        selectedLogo,
        selectLogo,
        updateLogoMeta,
        saveTemplate,
        loadTemplate,
        clearCanvas,
        handleSVGShapeBrandingTypeChange,
      }}
    >
      {children}
    </TextboxContext.Provider>
  );
};

export const useTextboxContext = () => {
  const context = useContext(TextboxContext);
  if (!context) {
    throw new Error("useTextboxContext must be used within a TextboxProvider");
  }
  return context;
};
