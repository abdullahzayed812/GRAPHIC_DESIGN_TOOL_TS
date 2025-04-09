import React, { useState } from "react";
import { useTextboxContext } from "../context";
import { SVGElement } from "../utils/parseSVG";

interface PropertiesPanelProps {
  parsedSvg: SVGElement[]; // Pass parsed SVG elements to the panel
  onColorChange: (id: string, color: string) => void;
}

const renderSVGElements = (
  elements: SVGElement[],
  handleSelect: (id: string) => void,
  selectedId: string,
  onColorChange: (id: string, color: string) => void
) => {
  return elements.map((element) => (
    <div key={element.id} className="propertyElement">
      <div>
        {/* Select this element to modify */}
        <label>
          <input type="radio" checked={selectedId === element.id} onChange={() => handleSelect(element.id)} />
          {element.tag} (ID: {element.id})
        </label>

        {selectedId === element.id && (
          <>
            <br />
            <label>Color:</label>
            <input type="color" onChange={(e) => onColorChange(element.id, e.target.value)} />
          </>
        )}
      </div>

      {/* Recursively render children if they exist */}
      {element.children && element.children.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {renderSVGElements(element.children, handleSelect, selectedId, onColorChange)}
        </div>
      )}
    </div>
  ));
};

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ parsedSvg, onColorChange }) => {
  const { selectedTextbox, textboxes, updateTextboxStyle } = useTextboxContext();
  const [selectedElementId, setSelectedElementId] = useState<string>("");

  // Make sure selectedTextbox is not null before proceeding
  if (!selectedTextbox) return null; // If no textbox is selected, don't render the panel

  const selectedTextboxObj = textboxes.find((textbox: any) => textbox.id === selectedTextbox);

  // If no matching textbox is found, return null
  if (!selectedTextboxObj) return null;

  const handleStyleChange = (property: string, value: string) => {
    updateTextboxStyle(selectedTextbox, {
      ...selectedTextboxObj.style,
      [property]: value,
    });
  };

  const handleSelect = (id: string) => {
    setSelectedElementId(id);
  };

  return (
    <div className="propertiesPanel">
      <h3>Properties Panel</h3>

      {/* Textbox properties */}
      <div>
        <h4>Textbox Styles</h4>
        <div>
          <label>Border Style:</label>
          <select
            value={selectedTextboxObj.style.borderStyle}
            onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>
        <div>
          <label>Border Color:</label>
          <input
            type="color"
            value={selectedTextboxObj.style.borderColor}
            onChange={(e) => handleStyleChange("borderColor", e.target.value)}
          />
        </div>
        <div>
          <label>Font Size:</label>
          <input
            type="number"
            value={parseInt(selectedTextboxObj.style.fontSize, 10)}
            onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
          />
        </div>
        <div>
          <label>Font Family:</label>
          <select
            value={selectedTextboxObj.style.fontFamily}
            onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={selectedTextboxObj.style.backgroundColor}
            onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
          />
        </div>
        <div>
          <label>Text Color:</label>
          <input
            type="color"
            value={selectedTextboxObj.style.textColor}
            onChange={(e) => handleStyleChange("textColor", e.target.value)}
          />
        </div>
      </div>

      {/* SVG elements */}
      <div>
        <h4>SVG Element Styles</h4>
        {renderSVGElements(parsedSvg, handleSelect, selectedElementId, onColorChange)}
      </div>
    </div>
  );
};
