import { ChevronRight } from "lucide-react";
import MatrixDisplay from "./MatrixDisplay";
import NavigationButtons from "./NavigationButtons";
import { gradientBg } from "../styles/commonStyles";

const AdvancedMatricesView = ({
  results,
  onNext,
  onReset,
  onBackToInput,
  currentStep,
}) => (
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
          Advanced Derived Matrices
        </h1>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <MatrixDisplay
            matrix={results.A_pr}
            title="A'"
            color="#f59e0b"
            unit="mm/N"
            useScientific={true}
          />
          <MatrixDisplay
            matrix={results.B_pr}
            title="B'"
            color="#f97316"
            unit="1/N"
            useScientific={true}
          />
          <MatrixDisplay
            matrix={results.H_pr}
            title="H'"
            color="#ef4444"
            unit="1/N"
            useScientific={true}
          />
          <MatrixDisplay
            matrix={results.D_pr}
            title="D'"
            color="#dc2626"
            unit="1/(N·mm)"
            useScientific={true}
          />
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
        Enter Forces and Moments
        <ChevronRight style={{ width: "24px", height: "24px" }} />
      </button>
    </div>
  </div>
);

export default AdvancedMatricesView;
