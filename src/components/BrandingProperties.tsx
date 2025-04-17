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
        <label>Text Color:</label>
        <select
          value={selectedTextboxObj.branding.textColorBrandingType}
          onChange={(e) =>
            updateTextboxBranding(selectedTextboxObj.id, {
              type: "textColorBrandingType",
              value: e.target.value as "primary" | "secondary" | "additional" | "fixed",
            })
          }
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="additional">Additional</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      <div>
        <label>Background:</label>
        <select
          value={selectedTextboxObj.branding.containerColorBrandingType}
          onChange={(e) =>
            updateTextboxBranding(selectedTextboxObj.id, {
              type: "containerColorBrandingType",
              value: e.target.value as "primary" | "secondary" | "additional" | "fixed",
            })
          }
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="additional">Additional</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>
    </div>
  );
};
