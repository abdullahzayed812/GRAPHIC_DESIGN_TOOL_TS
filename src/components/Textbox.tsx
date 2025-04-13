import React, { useState } from "react";
import { useDragger } from "../hooks/useDragger";
import { useTextboxContext } from "../context";

interface TextboxProps {
  id: string;
  style: any;
}

function hexToRGBA(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const Textbox: React.FC<TextboxProps> = ({ id, style }) => {
  const [inputValue, setInputValue] = useState(id);
  const { selectTextbox, updateTextboxCoords } = useTextboxContext();

  useDragger(id, updateTextboxCoords);

  return (
    <input
      id={id}
      value={inputValue}
      type="text"
      className="draggable-textbox"
      style={{
        borderStyle: style.borderStyle,
        borderColor: style.borderColor,
        borderRadius: style.borderRadius,
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        backgroundColor: hexToRGBA(style.backgroundColor, style.backgroundOpacity),
        color: style.textColor,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        textDecoration: style.textDecoration,
        padding: style.padding,
        opacity: style.opacity,
        width: `${inputValue.length + 1}ch`,
      }}
      onClick={() => selectTextbox(id)}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
