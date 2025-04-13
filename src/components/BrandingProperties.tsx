import { useTextboxContext } from "../context";

export const BrandingProperties: React.FC = () => {
  const { textboxes, selectedTextbox, updateTextboxBranding } = useTextboxContext();

  if (!selectedTextbox) return null;

  const selectedTextboxObj = textboxes.find((textbox: any) => textbox.id === selectedTextbox);

  if (!selectedTextboxObj) return null;

  return (
    <div>
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
    </div>
  );
};
