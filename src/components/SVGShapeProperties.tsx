// SVGShapeProperties.tsx
import React, { useState } from "react";
import { useTextboxContext } from "../context";
import { splitSVGElements } from "../utils/splitSVG";
import { SVGElement } from "../utils/parseSVG";

export const SVGShapeProperties: React.FC = () => {
  const { parsedSvg, handleColorChange, handleSVGShapeBrandingTypeChange } = useTextboxContext();

  const [selectedElementId, setSelectedElementId] = useState<string>("");

  if (!parsedSvg) return null;

  const handleSelect = (id: string) => {
    setSelectedElementId(id);
  };

  return (
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
            <>
              <div className="color-picker">
                <label>Fill Color:</label>
                <input type="color" onChange={(e) => handleColorChange(shape.id, e.target.value)} />
              </div>
              <div className="branding-type-selector">
                <label>Branding Type:</label>
                <select
                  value={shape.type ?? "fixed"}
                  onChange={(e) => handleSVGShapeBrandingTypeChange(shape.id, e.target.value as SVGElement["type"])}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="additional">Additional</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
