import React from "react";
import { formatNumber, formatScientific } from "../utils/formatters";

const MatrixDisplay = ({
  matrix,
  title,
  color,
  labels,
  unit,
  useScientific = false,
}) => {
  if (!matrix || !matrix.length || !matrix[0]) {
    return <div>Invalid matrix data</div>;
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        padding: "24px",
        border: `3px solid ${color}`,
      }}
    >
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: color,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            background: color,
          }}
        >
          {title.charAt(0)}
        </div>
        {title}
        {unit && (
          <span
            style={{ fontSize: "16px", color: "#6b7280", fontWeight: "normal" }}
          >
            ({unit})
          </span>
        )}
      </h3>
      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          borderRadius: "12px",
          padding: "16px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
            gap: "12px",
          }}
        >
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  background: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: "1px solid #e5e7eb",
                }}
              >
                {labels && labels[i] && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#4b5563",
                      marginBottom: "4px",
                      fontWeight: "600",
                    }}
                  >
                    {labels[i]}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "10px",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  [{i + 1},{j + 1}]
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  {useScientific ? formatScientific(val) : formatNumber(val)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixDisplay;
