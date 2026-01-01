import { ChevronRight } from "lucide-react";
import MatrixDisplay from "./MatrixDisplay";
import NavigationButtons from "./NavigationButtons";
import { gradientBg } from "../styles/commonStyles";

const QTransformedView = ({
  layers,
  onNext,
  onReset,
  onBackToInput,
  currentStep,
}) => {
  if (!layers || layers.length === 0) {
    return <div>No layer data available</div>;
  }

  return (
    <div style={gradientBg}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            Q' Matrices (Global Coordinates)
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px" }}>
            Transformed Stiffness Matrices for All Layers
          </p>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {layers.map((layer, index) => (
              <div key={index}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Layer {layer.k} (θ = {layer.theta}°)
                </div>
                <MatrixDisplay
                  matrix={layer.Q_prime}
                  title="Q'"
                  color="#8b5cf6"
                  unit="GPa"
                  useScientific={true}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onNext}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Continue
          <ChevronRight style={{ width: "24px", height: "24px" }} />
        </button>
      </div>
    </div>
  );
};

export default QTransformedView;
