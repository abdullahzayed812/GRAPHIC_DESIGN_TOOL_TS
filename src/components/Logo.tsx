import React from "react";
import { useDragger } from "../hooks/useDragger";
import { useTextboxContext } from "../context";

interface LogoProps {
  id: string;
  src: string;
}

export const Logo: React.FC<LogoProps> = ({ id, src }) => {
  const { logos, selectLogo, selectedLogo } = useTextboxContext();
  const logo = logos.find((l) => l.id === id);

  useDragger(id);

  return (
    <img
      id={id}
      src={src}
      alt="Logo"
      className={`logo ${selectedLogo === id ? "selected" : ""}`}
      style={{
        width: logo?.width,
        height: logo?.height,
      }}
      onClick={() => selectLogo(id)}
    />
  );
};
