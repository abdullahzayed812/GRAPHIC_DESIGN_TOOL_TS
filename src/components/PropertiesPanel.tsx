import React, { useState } from "react";
import { useTextboxContext } from "../context";
import { splitSVGElements } from "../utils/splitSVG";

export const PropertiesPanel: React.FC = () => {
  const {
    selectedTextbox,
    parsedSvg,
    textboxes,
    updateTextboxStyle,
    updateTextboxMeta,
    updateTextboxBranding,
    handleColorChange,
  } = useTextboxContext();
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
    <aside className="properties-panel">
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
          <label>Border Radius:</label>
          <input
            type="number"
            value={parseInt(selectedTextboxObj.style.borderRadius, 10)}
            onChange={(e) => handleStyleChange("borderRadius", `${e.target.value}px`)}
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
          <label>Font Weight:</label>
          <select
            value={selectedTextboxObj.style.fontWeight}
            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <div>
          <label>Font Style:</label>
          <select
            value={selectedTextboxObj.style.fontStyle}
            onChange={(e) => handleStyleChange("fontStyle", e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>

        <div>
          <label>Text Decoration:</label>
          <select
            value={selectedTextboxObj.style.textDecoration}
            onChange={(e) => handleStyleChange("textDecoration", e.target.value)}
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
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

        <div>
          <label>Background Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={selectedTextboxObj.style.backgroundOpacity}
            onChange={(e) => handleStyleChange("backgroundOpacity", e.target.value)}
          />
          <span>{Math.round(+selectedTextboxObj.style.backgroundOpacity * 100)}%</span>
        </div>

        <h4>Textbox Metadata</h4>
        <div>
          <input
            type="text"
            value={selectedTextboxObj.name || ""}
            onChange={(e) => updateTextboxMeta(selectedTextboxObj.id, { name: e.target.value })}
            placeholder="Enter label..."
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            value={selectedTextboxObj.tag || ""}
            onChange={(e) => updateTextboxMeta(selectedTextboxObj.id, { tag: e.target.value })}
            placeholder="Enter tag..."
          />
        </div>
      </div>

      <h4>Branding Mask</h4>
      <div>
        <label>Branding Type:</label>
        <select
          value={selectedTextboxObj.branding?.type || "primary"}
          onChange={(e) => updateTextboxBranding(selectedTextboxObj.id, { type: e.target.value as any })}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="additional">Additional</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      <div>
        <label>Color:</label>
        <input
          type="color"
          value={selectedTextboxObj.branding?.color || "#000000"}
          onChange={(e) => updateTextboxBranding(selectedTextboxObj.id, { color: e.target.value })}
        />
      </div>

      {/* SVG elements */}
      <div>
        <h4>SVG Shapes</h4>
        {splitSVGElements(parsedSvg).map(([shape]) => (
          <div
            key={shape.id}
            className={`shape-entry ${selectedElementId === shape.id ? "selected" : ""}`}
            onClick={() => handleSelect(shape.id)}
          >
            <div className="shape-info">
              <input
                type="radio"
                name="svg-shape"
                checked={selectedElementId === shape.id}
                onChange={() => handleSelect(shape.id)}
              />
              <span>
                <strong>{shape.tag}</strong> (ID: <code>{shape.id}</code>)
              </span>
            </div>

            {selectedElementId === shape.id && (
              <div className="color-picker">
                <label>Fill Color:</label>
                <input type="color" onChange={(e) => handleColorChange(shape.id, e.target.value)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
