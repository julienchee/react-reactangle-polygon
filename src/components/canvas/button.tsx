import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

const DrawButton: React.FC<Props> = ({
    children,
    onClick,
  }) => {
  return (
    <button
      onClick={onClick}
      style={{
      }}
    >
    {children}
    </button>
  );
}

export default DrawButton;
