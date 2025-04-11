import { useState, ReactNode } from "react";
import "./App.css";
import { TextboxProvider, useTextboxContext } from "./context";
import { Textbox } from "./components/Textbox";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { serializeSVG } from "./utils/serializeSVG";
import { parseSVG, SVGElement } from "./utils/parseSVG";
import { Logo } from "./components/Logo";

const App: React.FC = () => {
  const { textboxes, addTextbox, logos, addLogo } = useTextboxContext();
  const [svgContent, setSvgContent] = useState<ReactNode | null>(null);
  const [parsedSvg, setParsedSvg] = useState<SVGElement[]>([]);

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

  return (
    <main>
      <button onClick={addTextbox}>Add Textbox</button>

      <label htmlFor="svg-upload" className="file-label">
        Upload SVG
      </label>
      <input id="svg-upload" type="file" accept=".svg" className="upload-input" onChange={(e) => handleFileUpload(e)} />

      <label htmlFor="logo-upload" className="file-label">
        Upload Logo Image
      </label>
      <input id="logo-upload" type="file" accept="image/*" className="upload-input" onChange={handleLogoUpload} />

      <div className="container">
        {svgContent ? <div className="svg-container">{svgContent}</div> : null}

        {textboxes.map(({ id, x, y, style }) => (
          <Textbox
            key={id}
            id={id}
            x={x}
            y={y}
            style={style}
            selected={false} // logic to highlight the selected box will go here
          />
        ))}

        {logos.map(({ id, src }) => (
          <Logo key={id} id={id} src={src} />
        ))}
      </div>

      <PropertiesPanel parsedSvg={parsedSvg} onColorChange={handleColorChange} />
    </main>
  );
};

export default function AppWithProvider() {
  return (
    <TextboxProvider>
      <App />
    </TextboxProvider>
  );
}
