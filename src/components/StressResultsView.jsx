import React from "react";
import MatrixDisplay from "./MatrixDisplay";
import NavigationButtons from "./NavigationButtons";
import { gradientBg } from "../styles/commonStyles";

const StressResultsView = ({
  sigma,
  onReset,
  onBackToInput,
  currentStep,
}) => {
  // Guard
  if (!sigma || !Array.isArray(sigma) || sigma.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        No stress results available
      </div>
    );
  }

  return (
    <div style={gradientBg}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <NavigationButtons
          onReset={onReset}
          onBackToInput={onBackToInput}
          currentStep={currentStep}
        />

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "8px",
              textShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            Stress Results
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px" }}>
            Global Stress Components (σx, σy, τxy)
          </p>
        </div>

        {sigma.map((layer) => (
          <div
            key={layer.layer}
            style={{
              marginBottom: "40px",
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "16px",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Layer {layer.layer} (θ = {layer.theta}°)
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <MatrixDisplay
                matrix={layer.top}
                title="Top Surface"
                labels={["σx", "σy", "τxy"]}
                unit="MPa"
                color="#dc2626"
                useScientific={true}
              />

              <MatrixDisplay
                matrix={layer.mid}
                title="Mid Surface"
                labels={["σx", "σy", "τxy"]}
                unit="MPa"
                color="#f97316"
                useScientific={true}
              />

              <MatrixDisplay
                matrix={layer.bottom}
                title="Bottom Surface"
                labels={["σx", "σy", "τxy"]}
                unit="MPa"
                color="#7c2d12"
                useScientific={true}
              />
            </div>
          </div>
        ))}

        <button
          onClick={onReset}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default StressResultsView;
