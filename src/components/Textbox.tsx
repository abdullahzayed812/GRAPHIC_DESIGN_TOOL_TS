import React, { useState } from "react";
import { useDragger } from "../hooks/useDragger";
import { useTextboxContext } from "../context";

interface TextboxProps {
  id: string;

  style: any;
  selected: boolean;
}

export const Textbox: React.FC<TextboxProps> = ({ id, style, selected }) => {
  const [inputValue, setInputValue] = useState(id);
  const { selectTextbox, updateTextboxCoords } = useTextboxContext();

  useDragger(id, updateTextboxCoords);

  return (
    <input
      id={id}
      value={inputValue}
      type="text"
      style={{
        borderStyle: style.borderStyle,
        borderColor: style.borderColor,
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
