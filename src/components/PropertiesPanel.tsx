import { TextboxProperties } from "./TextboxProperties";
import { LogoProperties } from "./LogoProperties";
import { BrandingProperties } from "./BrandingProperties";
import { SVGShapeProperties } from "./SVGShapeProperties";

export const PropertiesPanel: React.FC = () => {
  return (
    <aside className="properties-panel">
      <h3>Properties Panel</h3>
      <TextboxProperties />
      <LogoProperties />
      <SVGShapeProperties />
      <BrandingProperties />
    </aside>
  );
};
