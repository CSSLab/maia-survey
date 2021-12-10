import React from "react";

import "./styles.scss";

interface Props {
  range: [number, number]; // [min, max]
  value?: number;
  color?: string;
  disabled?: boolean;
}

const PercentageBar: React.FC<Props> = ({
  value = 0,
  color,
  range: [min, max],
  disabled,
}: Props) => {
  if (value < min || value > max)
    throw new Error(`${value} out of range [${min}, ${max}]`);
  const height = ((value - min) / (max - min)) * 100;
  return (
    <>
      <div className="bar-container-vertical">
        {disabled && (
          <div
            style={{
              backgroundColor: color,
              opacity: 0.2,
              width: "100%",
            }}
            className="bar-content"
          />
        )}
        {!disabled && (
          <p
            style={{
              position: "absolute",
              fontSize: 14,
              padding: 0,
              top: 0,
              margin: 0,
            }}
          >
            {max}
          </p>
        )}
        <div
          style={{ height: `${disabled ? 0 : height}%`, width: "15px" }}
          className="bar-content-container"
        >
          <div
            className="bar-content"
            style={{
              boxShadow: `0px 0px 3px ${color}`,
              backgroundColor: color,
              flexDirection: "column",
            }}
          >
            {!disabled && (
              <p style={{ fontSize: 10, padding: 0, margin: 0 }}>
                {" "}
                {value.toFixed(2)}
              </p>
            )}
            {!disabled && (
              <p
                style={{
                  fontSize: 14,
                  padding: 0,
                  margin: 0,
                  bottom: 0,
                  marginTop: "auto",
                }}
              >
                {min}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

PercentageBar.defaultProps = {
  value: 0,
  color: "#53a7a2",
  disabled: false,
};

export default PercentageBar;
