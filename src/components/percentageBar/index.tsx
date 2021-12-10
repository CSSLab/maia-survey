import React, { useCallback, useEffect, useState } from "react";

import "./styles.scss";

interface Props {
  range: [number, number]; // [min, max]
  value?: number;
  color?: string;
  disabled?: boolean;
}

const PercentageBar: React.FC<Props> = ({
  range: [min, max],
  value = 0,
  color,
  disabled,
}: Props) => {
  if (value < min || value > max)
    throw new Error(`${value} out of range [${min}, ${max}]`);

  const width = ((value - min) / (max - min)) * 100;
  return (
    <>
      <div className="bar-container">
        {disabled && (
          <div
            style={{
              backgroundColor: color,
              opacity: 0.2,
              width: "100%",
              height: 15,
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
              margin: 0,
            }}
          >
            {min}
          </p>
        )}

        <div
          style={{ width: `${disabled ? 0 : width}%`, height: "15px" }}
          className="bar-content-container"
        >
          <div
            className="bar-content"
            style={{
              boxShadow: `0px 0px 3px ${color}`,
              backgroundColor: color,
              textAlign: "right",
            }}
          >
            {!disabled && (
              <p
                style={{
                  fontSize: 14,
                  padding: 0,
                  margin: 0,
                  marginLeft: "auto",
                  lineHeight: 1,
                }}
              >
                {value > 0 ? "+" : ""}
                {value.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {!disabled && (
          <p
            style={{
              position: "absolute",
              fontSize: 14,
              padding: 0,
              marginLeft: "auto",
              right: 0,
            }}
          >
            {max}
          </p>
        )}
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
