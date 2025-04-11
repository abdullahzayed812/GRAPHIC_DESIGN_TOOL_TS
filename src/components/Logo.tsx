import React from "react";
import { useDragger } from "../hooks/useDragger";
import { useTextboxContext } from "../context";

interface LogoProps {
  id: string;
  src: string;
}

export const Logo: React.FC<LogoProps> = ({ id, src }) => {
  const { updateLogoCoords } = useTextboxContext();
  useDragger(id, updateLogoCoords);

  return <img id={id} src={src} alt="Logo" className="logo" />;
};
