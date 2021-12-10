import React from "react";

interface Props {
  vertical?: boolean;
  color: string;
}

const GradientBar: React.FC<Props> = ({ vertical, color }: Props) => {
  return (
    <div
      className={vertical ? "col" : "row"}
      style={
        vertical
          ? {
              height: "100%",
              width: 5,
              background: `linear-gradient(0deg, rgba(36,36,36,1) 0%, ${color} 100%)`,
            }
          : {
              flex: 1,
              height: 5,
              background: `linear-gradient(90deg, rgba(36,36,36,1) 0%, ${color} 100%)`,
            }
      }
    />
  );
};

GradientBar.defaultProps = {
  vertical: false,
};

export default GradientBar;
