import { useState, useEffect } from "react";

// Views
import InputForm from "./components/InputForm";
import MaterialPropertiesView from "./components/MaterialPropertiesView";
import BasicMatricesView from "./components/BasicMatricesView";
import AdvancedMatricesView from "./components/AdvancedMatricesView";
import ForceInputView from "./components/ForceInputView";
import StrainCurvatureView from "./components/StrainCurvatureView";
import StressResultsView from "./components/StressResultsView";

// Calculations
import { calculateMaterialProperties } from "./calculations/materialProperties";
import {
  calculateLayerQ,
  calculateABDMatrices,
} from "./calculations/layerCalculations";

import { calculateDerivedMatrices } from "./calculations/derivedMatrices";
import { calculateLayerQbar } from "./calculations/layerCalculations";

// Utils
import { multiplyMatrices, addMatrices } from "./utils/matrixOperations";
import { strainAtZ } from "./utils/strainUtils";

const STORAGE_KEY = "composite_analysis_state";

const CompositeMaterialAnalysis = () => {
  const [step, setStep] = useState("input");

  const [inputs, setInputs] = useState({
    E1: "",
    E2: "",
    v12: "",
    G12: "",
    N: "",
    theta: "",
    thickness: "",
  });

  const [results, setResults] = useState(null);

  const [forces, setForces] = useState({
    N: [0, 0, 0],
    M: [0, 0, 0],
  });

  const [strainResults, setStrainResults] = useState(null);
  const [stressResults, setStressResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ─────────────────────────────────────────────
  // Load / Save session
  // ─────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setStep(parsed.step || "input");
        setInputs(parsed.inputs || inputs);
        setResults(parsed.results || null);
        setForces(parsed.forces || forces);
        setStrainResults(parsed.strainResults || null);
        setStressResults(parsed.stressResults || null);
      }
    } catch (e) {
      console.error("Error loading state:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          inputs,
          results,
          forces,
          strainResults,
          stressResults,
        })
      );
    }
  }, [step, inputs, results, forces, strainResults, stressResults, isLoading]);

  // ─────────────────────────────────────────────
  // Reset
  // ─────────────────────────────────────────────
  const resetAnalysis = () => {
    setStep("input");
    setInputs({
      E1: "",
      E2: "",
      v12: "",
      G12: "",
      N: "",
      theta: "",
      thickness: "",
    });
    setResults(null);
    setForces({ N: [0, 0, 0], M: [0, 0, 0] });
    setStrainResults(null);
    setStressResults(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const goBackToLastInput = () => {
    if (step === "stress" || step === "strain") setStep("forces");
    else setStep("input");
  };

  // ─────────────────────────────────────────────
  // Main calculation (ABD)
  // ─────────────────────────────────────────────
  const calculate = () => {
    try {
      // Parse & validate
      const numLayers = parseInt(inputs.N, 10);
      if (!Number.isInteger(numLayers) || numLayers <= 0 || numLayers > 100) {
        alert("Number of layers must be a positive integer (1–100).");
        return;
      }

      const thetaValues = inputs.theta
        .split(",")
        .map((v) => parseFloat(v.trim()));
      const thicknessValues = inputs.thickness
        .split(",")
        .map((v) => parseFloat(v.trim()));

      if (
        thetaValues.length !== numLayers ||
        thicknessValues.length !== numLayers ||
        thicknessValues.some((t) => t <= 0)
      ) {
        alert("Theta and thickness values must match number of layers.");
        return;
      }

      // Material properties (unit conversion!)
      const E1 = parseFloat(inputs.E1);
      const E2 = parseFloat(inputs.E2);
      const G12 = parseFloat(inputs.G12);
      const v12 = parseFloat(inputs.v12);

      const { Q11, Q22, Q12, Q66 } = calculateMaterialProperties(
        E1,
        E2,
        v12,
        G12
      );

      // z coordinates
      const totalThickness = thicknessValues.reduce((a, b) => a + b, 0);
      let zCurrent = totalThickness / 2;

      const layers = thetaValues.map((theta, i) => {
        const t = thicknessValues[i];

        const zTop = zCurrent;
        const zBot = zCurrent - t;
        const zMid = (zTop + zBot) / 2;

        zCurrent = zBot;

        return {
          k: i + 1,
          theta,
          thickness: t,
          z_top: zTop,
          z_mid: zMid,
          z_bot: zBot,

          // Q in material coordinates (local)
          Q: calculateLayerQ(E1, E2, v12, G12),

          // Q̄ in global coordinates
          Qbar: calculateLayerQbar(theta, Q11, Q22, Q12, Q66),
        };
      });

      const { A, B, D } = calculateABDMatrices(layers, thicknessValues);
      const derived = calculateDerivedMatrices(A, B, D);

      setResults({ A, B, D, layers, ...derived });
      setStep("material");
    } catch (e) {
      alert("Calculation error: " + e.message);
      console.error(e);
    }
  };

  if (!forces.N.every(Number.isFinite) || !forces.M.every(Number.isFinite)) {
    alert("Forces and moments must be valid numbers.");
    return;
  }

  // ─────────────────────────────────────────────
  // Strain & curvature
  // ─────────────────────────────────────────────
  const calculateStrain = () => {
    try {
      const Nmat = forces.N.map((v) => [v]);
      const Mmat = forces.M.map((v) => [v]);

      const eps = addMatrices(
        multiplyMatrices(results.A_pr, Nmat),
        multiplyMatrices(results.B_pr, Mmat)
      );

      const kap = addMatrices(
        multiplyMatrices(results.H_pr, Nmat),
        multiplyMatrices(results.D_pr, Mmat)
      );

      setStrainResults({ eps, kap });
      setStep("strain");
    } catch (e) {
      alert("Strain calculation error: " + e.message);
      console.error(e);
    }
  };

  // ─────────────────────────────────────────────
  // Stress (full CLT: ε0 + zκ)
  // ─────────────────────────────────────────────
  const calculateStress = () => {
    try {
      const stresses = results.layers.map((layer) => ({
        layer: layer.k,
        theta: layer.theta,
        top: multiplyMatrices(
          layer.Qbar,
          strainAtZ(strainResults.eps, strainResults.kap, layer.z_top)
        ),
        mid: multiplyMatrices(
          layer.Qbar,
          strainAtZ(strainResults.eps, strainResults.kap, layer.z_mid)
        ),
        bottom: multiplyMatrices(
          layer.Qbar,
          strainAtZ(strainResults.eps, strainResults.kap, layer.z_bot)
        ),
      }));

      setStressResults(stresses);
      setStep("stress");
    } catch (e) {
      alert("Stress calculation error: " + e.message);
      console.error(e);
    }
  };

  if (isLoading) return null;

  // ─────────────────────────────────────────────
  // Routing
  // ─────────────────────────────────────────────
  const navProps = {
    onReset: resetAnalysis,
    onBackToInput: goBackToLastInput,
    currentStep: step,
  };

  if (step === "stress")
    return <StressResultsView sigma={stressResults} {...navProps} />;

  if (step === "strain")
    return (
      <StrainCurvatureView
        eps={strainResults.eps}
        kap={strainResults.kap}
        onNext={calculateStress}
        {...navProps}
      />
    );

  if (step === "forces")
    return (
      <ForceInputView
        forces={forces}
        setForces={setForces}
        onCalculate={calculateStrain}
        {...navProps}
      />
    );

  if (step === "advanced")
    return (
      <AdvancedMatricesView
        results={results}
        onNext={() => setStep("forces")}
        {...navProps}
      />
    );

  if (step === "basic")
    return (
      <BasicMatricesView
        results={results}
        onNext={() => setStep("advanced")}
        {...navProps}
      />
    );

  if (step === "material")
    return (
      <MaterialPropertiesView
        layers={results.layers}
        onNext={() => setStep("basic")}
        {...navProps}
      />
    );

  return (
    <InputForm inputs={inputs} setInputs={setInputs} onCalculate={calculate} />
  );
};

export default CompositeMaterialAnalysis;
