// SVGShapeProperties.tsx
import React, { useState } from "react";
import { useTextboxContext } from "../context";
import { splitSVGElements } from "../utils/splitSVG";

export const SVGShapeProperties: React.FC = () => {
  const { parsedSvg, handleColorChange } = useTextboxContext();

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
            <div className="color-picker">
              <label>Fill Color:</label>
              <input type="color" onChange={(e) => handleColorChange(shape.id, e.target.value)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
