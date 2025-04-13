import React, { useState } from "react";
import { useDragger } from "../hooks/useDragger";
import { useTextboxContext } from "../context";

interface TextboxProps {
  id: string;
  style: any;
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
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        width: `${inputValue.length + 1}ch`,
      }}
      onClick={() => selectTextbox(id)}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
