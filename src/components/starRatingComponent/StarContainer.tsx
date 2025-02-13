import { CSSProperties } from "react";

const StarContainer = ({
  children,
  hoverLeave,
}: {
  children: React.ReactNode;
  hoverLeave: () => void;
}) => {
  const starContainerStyle: CSSProperties = {
    display: "flex",
    gap: "4px",
  };
  return (
    <div style={starContainerStyle} onMouseLeave={hoverLeave}>
      {children}
    </div>
  );
};

export default StarContainer;
