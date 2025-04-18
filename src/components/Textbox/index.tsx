import React, { useState } from "react";
import { useDragger } from "../../hooks/useDragger";
import { useTextboxContext } from "../../context";
import { TextboxStyle } from "../../models/Textbox";

interface TextboxProps {
  id: string;
  style: TextboxStyle;
  x: number;
  y: number;
}

function hexToRGBA(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const Textbox: React.FC<TextboxProps> = ({ id, style, x, y }) => {
  const [inputValue, setInputValue] = useState(id);
  const { selectTextbox, selectedTextbox } = useTextboxContext();

  useDragger(id);

  return (
    <input
      id={id}
      value={inputValue}
      type="text"
      className={`${selectedTextbox === id ? "selected" : ""}`}
      style={{
        left: x,
        top: y,
        borderStyle: style.borderStyle,
        borderColor: style.borderColor,
        borderRadius: style.borderRadius,
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        backgroundColor: hexToRGBA(style.backgroundColor, +style.backgroundOpacity),
        color: style.textColor,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        textDecoration: style.textDecoration,
        paddingTop: style.paddingTop,
        paddingLeft: style.paddingLeft,
        paddingBottom: style.paddingBottom,
        paddingRight: style.paddingRight,
        opacity: style.opacity,
        width: `${inputValue.length + 1}ch`,
      }}
      onClick={() => selectTextbox(id)}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
