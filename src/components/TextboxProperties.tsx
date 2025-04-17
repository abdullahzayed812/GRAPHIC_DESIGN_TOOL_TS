import { Textbox, useTextboxContext } from "../context";

export const TextboxProperties: React.FC = () => {
  const { textboxes, selectedTextbox, updateTextboxStyle, updateTextboxMeta, updateTextboxCoords, containerSize } =
    useTextboxContext();

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

      <div>
        <label>Padding Top:</label>
        <input
          type="number"
          value={parseInt(selectedTextboxObj.style.paddingTop, 10)}
          onChange={(e) => handleStyleChange("paddingTop", `${e.target.value}px`)}
        />
      </div>
      <div>
        <label>Padding Left:</label>
        <input
          type="number"
          value={parseInt(selectedTextboxObj.style.paddingLeft, 10)}
          onChange={(e) => handleStyleChange("paddingLeft", `${e.target.value}px`)}
        />
      </div>
      <div>
        <label>Padding Bottom:</label>
        <input
          type="number"
          value={parseInt(selectedTextboxObj.style.paddingBottom, 10)}
          onChange={(e) => handleStyleChange("paddingBottom", `${e.target.value}px`)}
        />
      </div>
      <div>
        <label>Padding Right:</label>
        <input
          type="number"
          value={parseInt(selectedTextboxObj.style.paddingRight, 10)}
          onChange={(e) => handleStyleChange("paddingRight", `${e.target.value}px`)}
        />
      </div>

      <h4>Alignment</h4>
      <div>
        <label>Horizontal Align:</label>
        <select
          onChange={(e) => {
            const containerWidth = parseInt(containerSize.width, 10);
            const textboxWidth = 150;
            const value = e.target.value;

            let x = selectedTextboxObj.x;
            if (value === "left") x = 0;
            else if (value === "center") x = containerWidth / 2 - textboxWidth / 2;
            else if (value === "right") x = containerWidth - textboxWidth;

            updateTextboxCoords(selectedTextboxObj.id, x, selectedTextboxObj.y);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label>Vertical Align:</label>
        <select
          onChange={(e) => {
            const containerHeight = parseInt(containerSize.height, 10);
            const textboxHeight = 40; // Approximate or calculate dynamically
            const value = e.target.value;

            let y = selectedTextboxObj.y;
            if (value === "top") y = 0;
            else if (value === "center") y = containerHeight / 2 - textboxHeight / 2;
            else if (value === "bottom") y = containerHeight - textboxHeight;

            updateTextboxCoords(selectedTextboxObj.id, selectedTextboxObj.x, y);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
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
  );
};
