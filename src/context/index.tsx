import { createContext, ReactNode, useContext, useState } from "react";
import { parseSVG, SVGElement } from "../utils/parseSVG";
import { serializeSVG } from "../utils/serializeSVG";

interface TextboxStyle {
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
  padding: string;
  opacity: number;
}

interface Branding {
  type: "primary" | "secondary" | "additional" | "fixed";
  color: string;
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
    updates: { type?: "primary" | "secondary" | "additional" | "fixed"; color?: string }
  ) => void;
  updateLogoSize: (id: string, width: number, height: number) => void;
  selectedLogo: string | null;
  selectLogo: (id: string) => void;
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
  const [containerSize, setContainerSize] = useState({ width: "800px", height: "800px" });

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
        padding: "4px",
        opacity: 1,
      },
      branding: {
        type: "primary",
        color: "#000000",
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
    updates: { type?: "primary" | "secondary" | "additional" | "fixed"; color?: string }
  ) => {
    setTextboxes((prev) =>
      prev.map((textbox) =>
        textbox.id === id ? { ...textbox, branding: { ...textbox.branding, ...updates } } : textbox
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

  const handleContainerSizeChange = (prop: string, value: string) => {
    setContainerSize((prev) => ({ ...prev, [prop]: value }));
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
