import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import BasicMatricesView from './components/BasicMatricesView';
import AdvancedMatricesView from './components/AdvancedMatricesView';
import ForceInputView from './components/ForceInputView';
import StrainCurvatureView from './components/StrainCurvatureView';
import StressResultsView from './components/StressResultsView';
import { calculateMaterialProperties } from './calculations/materialProperties';
import { calculateLayerW, calculateABDMatrices } from './calculations/layerCalculations';
import { calculateDerivedMatrices } from './calculations/derivedMatrices';
import { multiplyMatrices, addMatrices } from './utils/matrixOperations';

const STORAGE_KEY = 'composite_analysis_state';

const CompositeMaterialAnalysis = () => {
  const [step, setStep] = useState('input');
  const [inputs, setInputs] = useState({
    E1: '',
    E2: '',
    v12: '',
    G12: '',
    N: '',
    theta: '',
    thickness: ''
  });
  const [results, setResults] = useState(null);
  const [forces, setForces] = useState({
    N: [0, 0, 0],
    M: [0, 0, 0]
  });
  const [strainResults, setStrainResults] = useState(null);
  const [stressResults, setStressResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from sessionStorage on mount
  useEffect(() => {
    try {
      const savedState = sessionStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.step) setStep(parsed.step);
        if (parsed.inputs) setInputs(parsed.inputs);
        if (parsed.results) setResults(parsed.results);
        if (parsed.forces) setForces(parsed.forces);
        if (parsed.strainResults) setStrainResults(parsed.strainResults);
        if (parsed.stressResults) setStressResults(parsed.stressResults);
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        const stateToSave = {
          step,
          inputs,
          results,
          forces,
          strainResults,
          stressResults
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (error) {
        console.error('Error saving state:', error);
      }
    }
  }, [step, inputs, results, forces, strainResults, stressResults, isLoading]);

  // Reset everything
  const resetAnalysis = () => {
    setStep('input');
    setInputs({
      E1: '',
      E2: '',
      v12: '',
      G12: '',
      N: '',
      theta: '',
      thickness: ''
    });
    setResults(null);
    setForces({ N: [0, 0, 0], M: [0, 0, 0] });
    setStrainResults(null);
    setStressResults(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // Go back to last input page
  const goBackToLastInput = () => {
    if (step === 'stress' || step === 'strain') {
      setStep('forces');
    } else if (step === 'forces' || step === 'advanced' || step === 'basic') {
      setStep('input');
    }
  };

  const calculate = () => {
    try {
      // Validate all inputs
      if (!inputs.E1 || !inputs.E2 || !inputs.v12 || !inputs.G12 || !inputs.N || !inputs.theta || !inputs.thickness) {
        alert('Error: All fields are required. Please fill in all inputs.');
        return;
      }

      const E1 = parseFloat(inputs.E1);
      const E2 = parseFloat(inputs.E2);
      const v12 = parseFloat(inputs.v12);
      const G12 = parseFloat(inputs.G12);
      const N = parseInt(inputs.N);

      if (isNaN(E1) || isNaN(E2) || isNaN(v12) || isNaN(G12) || isNaN(N)) {
        alert('Error: Please enter valid numbers for all fields.');
        return;
      }

      if (E1 <= 0 || E2 <= 0 || G12 <= 0) {
        alert('Error: Material properties (E1, E2, G12) must be positive values.');
        return;
      }

      if (v12 < 0 || v12 >= 1) {
        alert('Error: Poisson\'s ratio must be between 0 and 1.');
        return;
      }

      if (N <= 0 || N > 100) {
        alert('Error: Number of layers must be between 1 and 100.');
        return;
      }
      
      const theta_values = inputs.theta.split(',').map(x => {
        const val = parseFloat(x.trim());
        if (isNaN(val)) throw new Error('Invalid theta value');
        return val;
      });
      
      const thickness_values = inputs.thickness.split(',').map(x => {
        const val = parseFloat(x.trim());
        if (isNaN(val) || val <= 0) throw new Error('Invalid thickness value');
        return val;
      });

      if (theta_values.length !== N || thickness_values.length !== N) {
        alert(`Error: You must enter exactly ${N} values for theta and thickness!`);
        return;
      }

      const { Q11, Q22, Q12, Q66 } = calculateMaterialProperties(E1, E2, v12, G12);

      const layers = theta_values.map((theta, i) => ({
        k: i + 1,
        theta: theta,
        thickness: thickness_values[i],
        W: calculateLayerW(theta, Q11, Q22, Q12, Q66)
      }));

      const { A, B, D } = calculateABDMatrices(layers, thickness_values);
      const derivedMatrices = calculateDerivedMatrices(A, B, D);

      setResults({ 
        A, B, D, 
        layers,
        ...derivedMatrices
      });
      setStep('basic');
    } catch (error) {
      alert('Error in calculation: ' + error.message);
      console.error(error);
    }
  };

  const calculateStrain = () => {
    try {
      const N_matrix = forces.N.map(v => [v]);
      const M_matrix = forces.M.map(v => [v]);
      
      const eps_part1 = multiplyMatrices(results.A_pr, N_matrix);
      const eps_part2 = multiplyMatrices(results.B_pr, M_matrix);
      const eps = addMatrices(eps_part1, eps_part2);
      
      const kap_part1 = multiplyMatrices(results.H_pr, N_matrix);
      const kap_part2 = multiplyMatrices(results.D_pr, M_matrix);
      const kap = addMatrices(kap_part1, kap_part2);
      
      setStrainResults({ eps, kap });
      setStep('strain');
    } catch (error) {
      alert('Error in calculation: ' + error.message);
      console.error(error);
    }
  };

  const calculateStress = () => {
    try {
      const W = results.layers[0].W;
      const sigma = multiplyMatrices(W, strainResults.eps);
      
      setStressResults({ sigma });
      setStep('stress');
    } catch (error) {
      alert('Error in stress calculation: ' + error.message);
      console.error(error);
    }
  };

  // Show loading or return null while loading
  if (isLoading) {
    return null;
  }

  // Common props for navigation
  const navigationProps = {
    onReset: resetAnalysis,
    onBackToInput: goBackToLastInput,
    currentStep: step
  };

  if (step === 'stress') {
    return <StressResultsView sigma={stressResults.sigma} {...navigationProps} />;
  }

  if (step === 'strain') {
    return <StrainCurvatureView eps={strainResults.eps} kap={strainResults.kap} onNext={calculateStress} {...navigationProps} />;
  }

  if (step === 'forces') {
    return <ForceInputView forces={forces} setForces={setForces} onCalculate={calculateStrain} {...navigationProps} />;
  }

  if (step === 'advanced') {
    return <AdvancedMatricesView results={results} onNext={() => setStep('forces')} {...navigationProps} />;
  }

  if (step === 'basic') {
    return <BasicMatricesView results={results} onNext={() => setStep('advanced')} {...navigationProps} />;
  }

  return <InputForm inputs={inputs} setInputs={setInputs} onCalculate={calculate} />;
};

export default CompositeMaterialAnalysis;
