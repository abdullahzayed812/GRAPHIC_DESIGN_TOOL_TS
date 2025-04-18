import { useTextboxContext } from "../context";
import { Textbox } from "./Textbox";
import { Logo } from "./Logo";

export const CanvasArea = () => {
  const { containerSize, textboxes, svgContent, logos } = useTextboxContext();

  return (
    <section className="container-overlay">
      <section className="container" style={{ width: containerSize.width, height: containerSize.height }}>
        {svgContent ? <div className="svg-container">{svgContent}</div> : null}

        {textboxes.map(({ id, x, y, style }) => (
          <Textbox key={id} id={id} style={style} x={x} y={y} />
        ))}

        {logos.map(({ id, src }) => (
          <Logo key={id} id={id} src={src} />
        ))}
      </section>
    </section>
  );
};
