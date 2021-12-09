/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useState } from "react";
import {
  ResponsiveScatterPlot,
  ScatterPlotMouseHandler,
  ScatterPlotTooltipProps,
} from "@nivo/scatterplot";
import { PlottedPly } from "../../types";
import GradientBar from "../gradientBar";
import { MappedMoveWithLastMove } from "../../hooks/maia";

const color1 = "FF8946";
const color2 = "53A7A2";

const negLogLinear = (value: number) => {
  if (value <= -0.25) {
    return 1 - Math.log2(Math.abs(value - 1)) / 3;
  }
  return 0.9 + 0.1 * (1 - Math.abs(value / 0.25));
};

const computeColor = (x: number, y: number) => {
  const hex = (color: number) => {
    return Math.round(color).toString(16).padStart(2, "0");
  };

  const r = Math.ceil(
    parseInt(color2.substring(0, 2), 16) * (negLogLinear(x) / 2) +
      parseInt(color1.substring(0, 2), 16) * (y / 2)
  );
  const g = Math.ceil(
    parseInt(color2.substring(2, 4), 16) * (negLogLinear(x) / 2) +
      parseInt(color1.substring(2, 4), 16) * (y / 2)
  );
  const b = Math.ceil(
    parseInt(color2.substring(4, 6), 16) * (negLogLinear(x) / 2) +
      parseInt(color1.substring(4, 6), 16) * (y / 2)
  );
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

interface Props {
  data: PlottedPly[];
  disabled?: boolean;
  onMouseEnter: ScatterPlotMouseHandler<PlottedPly>;
  onMouseLeave: ScatterPlotMouseHandler<PlottedPly>;
  onClick: ScatterPlotMouseHandler<PlottedPly>;
  currentMoveData: MappedMoveWithLastMove | null;
}

export const PlyPlot: React.FC<Props> = ({
  disabled,
  data,
  onMouseEnter,
  onMouseLeave,
  onClick,
  currentMoveData,
}: Props) => {
  const serializedData = useMemo(() => {
    const memo: { [key: string]: PlottedPly[] } = {};
    data.forEach((node) => {
      const { x, y } = node;
      const key = `${x.toString()}:${y.toString()}`;
      if (key in memo) {
        memo[key].push(node);
      } else {
        memo[key] = [node];
      }
    });
    return Object.entries(memo).map(([key, nodes]) => {
      return { id: key, data: nodes };
    });
  }, [data]);

  return (
    <>
      <div>
        <div className="row" style={{ height: "345px" }}>
          <div
            style={{
              width: "345px",
              height: "345px",
            }}
          >
            <ResponsiveScatterPlot
              theme={{
                background: "#141414",
                textColor: "white",
              }}
              margin={{ bottom: 30, right: 30, left: 30, top: 30 }}
              nodeSize={({ data: { x, y, from, to } }) => {
                if (
                  currentMoveData &&
                  from === currentMoveData.lastMove[0] &&
                  to === currentMoveData.lastMove[1]
                )
                  return 20;
                return Math.abs(Math.asin((negLogLinear(x) * y + 5) / 9)) * 18;
              }}
              data={disabled ? [] : serializedData}
              xScale={{ type: "log", base: 2, min: -8, max: -0.125 }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 4,
                tickValues: [-8, -4, -2, -1, -0.5, -0.25],
              }}
              yScale={{ type: "linear", min: 0, max: 1 }}
              axisRight={{
                tickSize: 5,
                tickPadding: 0,
                tickValues: [0, 0.25, 0.5, 0.75, 1],
              }}
              colors={({ serieId }) => {
                const [x, y] = serieId
                  .toString()
                  .split(":")
                  .map((e: string) => Number(e));
                return computeColor(x, y);
              }}
              useMesh={false}
              enableGridX={false}
              enableGridY={false}
              axisTop={null}
              axisLeft={null}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              tooltip={(props: ScatterPlotTooltipProps<PlottedPly>) => (
                <div>
                  <p>{props.node.data.ply}</p>
                </div>
              )}
              motionConfig="wobbly"
            />
          </div>
          {disabled && (
            <div
              style={{
                width: "345px",
                height: "345px",
                position: "absolute",
                marginRight: 5,
              }}
              className="disabled-container"
            >
              <h5 style={{ fontWeight: "normal" }}>
                MOVEMAP CURRENTLY DISABLED
              </h5>
              <p style={{ fontSize: 12 }}>
                Play an acceptable move or give up to unlock
              </p>
            </div>
          )}
          <GradientBar color="#FF8946" vertical />
        </div>
        <div className="row">
          <GradientBar color="#53A7A2" />
          <div style={{ width: 5 }} />
        </div>
      </div>
    </>
  );
};

PlyPlot.defaultProps = {
  disabled: true,
};

export default PlyPlot;
