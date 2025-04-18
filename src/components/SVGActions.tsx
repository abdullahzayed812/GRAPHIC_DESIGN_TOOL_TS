import React, { useState } from "react";
import { useTextboxContext } from "../context";
import { Layers, Download, Upload, ZoomIn, ZoomOut } from "lucide-react";

export const SVGActions: React.FC = () => {
  const { parsedSvg } = useTextboxContext();
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!parsedSvg) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleExportSVG = () => {
    // Implementation for exporting SVG
    console.log("Export SVG");
  };

  return (
    <div className="svg-actions" style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Layers size={16} style={{ marginRight: "5px" }} />
          <h3 style={{ margin: 0, fontSize: "16px" }}>SVG Editor</h3>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="toolbar-button"
            style={{ margin: 0, padding: "6px", width: "auto" }}
            onClick={handleZoomIn}
          >
            <ZoomIn size={16} />
          </button>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "0 8px" }}>{zoomLevel}%</span>
          <button
            className="toolbar-button"
            style={{ margin: 0, padding: "6px", width: "auto" }}
            onClick={handleZoomOut}
          >
            <ZoomOut size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          className="toolbar-button"
          style={{ margin: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
          onClick={handleExportSVG}
        >
          <Download size={16} /> Export
        </button>
        <label
          className="file-label"
          style={{ margin: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
        >
          <Upload size={16} /> Import
          <input type="file" className="upload-input" accept=".svg" />
        </label>
        {/* <button 
          className="toolbar-button" 
          style={{ margin: 0, padding: '6px', width: 'auto' }}
          onClick={resetSVG}
        >
          <RefreshCw size={16} />
        </button> */}
      </div>
    </div>
  );
};
