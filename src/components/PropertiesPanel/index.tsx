import { TextboxProperties } from "./TextboxProperties";
import { LogoProperties } from "./LogoProperties";
import { BrandingProperties } from "../Branding/BrandingProperties";
// import { SVGShapeProperties } from "./SVGShapeProperties";
import { SVGPanel } from "./SVGPanel";

export const PropertiesPanel: React.FC = () => {
  return (
    <aside className="properties-panel">
      <h3>Properties Panel</h3>
      <TextboxProperties />
      <BrandingProperties />
      <LogoProperties />
      <SVGPanel />
    </aside>
  );
};
