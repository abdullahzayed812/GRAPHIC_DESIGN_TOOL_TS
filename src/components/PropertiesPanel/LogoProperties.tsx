import { useTextboxContext } from "../../context";

export const LogoProperties: React.FC = () => {
  const { logos, selectedLogo, updateLogoSize, updateLogoMeta, updateLogoCoords } = useTextboxContext();

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

      <h4>Logo Coords</h4>
      <div>
        <label>X:</label>
        <input
          type="number"
          value={logo.x ?? 100}
          onChange={(e) => updateLogoCoords(logo.id, parseInt(e.target.value), logo.y ?? 100)}
        />
      </div>
      <div>
        <label>Y:</label>
        <input
          type="number"
          value={logo.y ?? 100}
          onChange={(e) => updateLogoCoords(logo.id, logo.x ?? 100, parseInt(e.target.value))}
        />
      </div>

      <div>
        <label>Logo Label:</label>
        <input
          type="text"
          value={logo.label || ""}
          onChange={(e) => updateLogoMeta(logo.id, { label: e.target.value })}
          placeholder="Enter label"
        />
      </div>
    </div>
  );
};
