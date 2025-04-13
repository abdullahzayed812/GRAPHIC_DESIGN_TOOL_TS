import { useTextboxContext } from "../context";

export const LogoProperties: React.FC = () => {
  const { logos, selectedLogo, updateLogoSize } = useTextboxContext();

  if (!selectedLogo) return null;

  const logo = logos.find((l) => l.id === selectedLogo);
  if (!logo) return null;

  return (
    <div>
      <h4>Logo Properties</h4>
      <div>
        <label>Width:</label>
        <input
          type="number"
          value={logo.width ?? 100}
          onChange={(e) => updateLogoSize(logo.id, parseInt(e.target.value), logo.height ?? 100)}
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={logo.height ?? 100}
          onChange={(e) => updateLogoSize(logo.id, logo.width ?? 100, parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};
