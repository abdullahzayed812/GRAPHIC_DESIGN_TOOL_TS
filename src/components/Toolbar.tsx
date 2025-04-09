interface ToolbarProps {
  addSvg: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ addSvg }) => {
  return (
    <div className="toolbar">
      <button onClick={addSvg}>Add SVG</button>
    </div>
  );
};
