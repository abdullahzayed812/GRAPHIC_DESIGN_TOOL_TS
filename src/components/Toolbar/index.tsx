import { useTextboxContext } from "../../context";

export const Toolbar: React.FC = () => {
  const {
    containerSize,
    handleContainerSizeChange,
    addTextbox,
    handleFileUpload,
    handleLogoUpload,
    saveTemplate,
    clearCanvas,
    loadTemplate,
  } = useTextboxContext();

  return (
    <aside className="toolbar">
      <h2>Elements</h2>
      <button onClick={addTextbox} className="toolbar-button">
        Add Textbox
      </button>

      <label htmlFor="svg-upload" className="file-label">
        Upload SVG
      </label>
      <input id="svg-upload" type="file" accept=".svg" className="upload-input" onChange={handleFileUpload} />

      <label htmlFor="logo-upload" className="file-label">
        Upload Logo
      </label>
      <input id="logo-upload" type="file" accept="image/*" className="upload-input" onChange={handleLogoUpload} />

      <label htmlFor="load-template" className="file-label">
        Load Template
      </label>
      <input id="load-template" type="file" accept=".json" className="upload-input" onChange={loadTemplate} />

      <button onClick={saveTemplate} className="toolbar-button">
        Save Template
      </button>
      <button onClick={clearCanvas} className="toolbar-button">
        Clear Canvas
      </button>

      <h2>Canvas Width & Height</h2>
      <div>
        <label>Width:</label>
        <input
          type="number"
          value={parseInt(containerSize.width, 10)}
          onChange={(e) => handleContainerSizeChange("width", `${e.target.value}px`)}
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={parseInt(containerSize.height, 10)}
          onChange={(e) => handleContainerSizeChange("height", `${e.target.value}px`)}
        />
      </div>
    </aside>
  );
};
