import React, { useState } from "react";
import { useTextboxContext } from "../../context";
import { ChevronDown, ChevronRight } from "lucide-react";

export const SVGShapeProperties: React.FC = () => {
  const { parsedSvg, handleColorChange, handleSVGShapeBrandingTypeChange } = useTextboxContext();
  const [selectedElementId, setSelectedElementId] = useState<string>("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  if (!parsedSvg) return null;

  const toggleGroup = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(id)) {
      newExpandedGroups.delete(id);
    } else {
      newExpandedGroups.add(id);
    }
    setExpandedGroups(newExpandedGroups);
  };

  const handleSelect = (id: string) => {
    setSelectedElementId(id);
  };

  // Simplify ID for display
  const formatId = (id: string) => {
    if (!id) return "";
    return id.length > 15 ? `${id.substring(0, 12)}...` : id;
  };

  const renderSVGElement = (element: any, depth = 0) => {
    const hasChildren = element.children && element.children.length > 0;
    const isGroup = element.tag === "g" || element.tag === "svg";
    const isExpanded = expandedGroups.has(element.id);
    const isSelected = selectedElementId === element.id;

    return (
      <div key={element.id || `element-${depth}-${Math.random()}`}>
        <div
          className={`shape-entry ${isSelected ? "selected" : ""}`}
          onClick={() => handleSelect(element.id)}
          style={{
            marginLeft: `${depth * 12}px`,
            borderLeft: isGroup ? `4px solid ${isExpanded ? "#1976d2" : "#d0d0d0"}` : "none",
          }}
        >
          <div className="shape-info">
            {hasChildren && isGroup && (
              <button
                onClick={(e) => toggleGroup(element.id, e)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  marginRight: "4px",
                }}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}

            <input type="radio" name="svg-shape" checked={isSelected} onChange={() => handleSelect(element.id)} />

            <span>
              <strong>{element.tag}</strong>
              {element.id && (
                <span>
                  {" "}
                  <code>{formatId(element.id)}</code>
                </span>
              )}
            </span>
          </div>

          {isSelected && (
            <div className="property-element">
              <div className="color-picker">
                <label>Fill Color:</label>
                <input
                  type="color"
                  value={element.fill || "#000000"}
                  onChange={(e) => handleColorChange(element.id, e.target.value)}
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <label>Branding Type:</label>
                <select
                  value={element.type ?? "fixed"}
                  onChange={(e) =>
                    handleSVGShapeBrandingTypeChange(
                      element.id,
                      e.target.value as "primary" | "secondary" | "additional" | "fixed"
                    )
                  }
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="additional">Additional</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>

              {element.tag === "text" && (
                <div style={{ marginTop: "10px" }}>
                  <label>Font Size:</label>
                  <input
                    type="number"
                    value={element.fontSize || 16}
                    onChange={(e) => {
                      // Assuming you have a handler for this
                      // handleFontSizeChange(element.id, e.target.value)
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="nested-children">
            {element.children.map((child: any, index: number) => renderSVGElement(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <h4>SVG Elements</h4>
      <div className="svg-elements-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
        {parsedSvg.map((element: any) => renderSVGElement(element))}
      </div>
    </>
  );
};
