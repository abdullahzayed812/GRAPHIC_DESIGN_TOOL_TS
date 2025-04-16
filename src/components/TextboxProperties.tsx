import { Textbox, useTextboxContext } from "../context";

export const TextboxProperties: React.FC = () => {
  const { textboxes, selectedTextbox, updateTextboxStyle, updateTextboxMeta } = useTextboxContext();

  if (!selectedTextbox) return null;

  const selectedTextboxObj = textboxes.find((textbox: Textbox) => textbox.id === selectedTextbox);

  if (!selectedTextboxObj) return null;

  const handleStyleChange = (property: string, value: string) => {
    updateTextboxStyle(selectedTextboxObj.id, { ...selectedTextboxObj.style, [property]: value });
  };

  return (
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

      <div className="">
        <div>
          <label>Padding:</label>
        </div>
        <div className="padding-section">
          <select
            value={selectedTextboxObj.style.textDecoration}
            onChange={(e) => handleStyleChange("textDecoration", e.target.value)}
          >
            <option value="top">Top</option>
            <option value="left">Left</option>
            <option value="bottom">Bottom</option>
            <option value="right">Right</option>
          </select>
          <input
            type="number"
            value={parseInt(selectedTextboxObj.style.padding || "0", 10)}
            onChange={(e) => handleStyleChange("padding", `${e.target.value}px`)}
          />
        </div>
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
  );
};
