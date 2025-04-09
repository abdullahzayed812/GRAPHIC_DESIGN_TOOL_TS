import { createContext, ReactNode, useContext, useState } from "react";

interface Textbox {
  id: string;
  x: number;
  y: number;
  style: {
    borderStyle: string;
    borderColor: string;
    fontSize: string;
    fontFamily: string;
    backgroundColor: string;
    textColor: string;
  };
}

interface TextboxContextProps {
  textboxes: Textbox[];
  selectedTextbox: string | null;
  addTextbox: () => void;
  selectTextbox: (id: string) => void;
  updateTextboxStyle: (id: string, style: any) => void;
  updateTextboxCoords: (id: string, x: number, y: number) => void;
}

const TextboxContext = createContext<TextboxContextProps | undefined>(undefined);

interface TextboxProviderProps {
  children: ReactNode;
}

export const TextboxProvider: React.FC<TextboxProviderProps> = ({ children }) => {
  const [textboxes, setTextboxes] = useState<Textbox[]>([]);
  const [selectedTextbox, setSelectedTextbox] = useState<string | null>(null);

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
        textColor: "#000000",
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

  return (
    <TextboxContext.Provider
      value={{ textboxes, selectedTextbox, addTextbox, selectTextbox, updateTextboxStyle, updateTextboxCoords }}
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
