import React, { useState } from 'react';
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

  const calculate = () => {
    try {
      const E1 = parseFloat(inputs.E1);
      const E2 = parseFloat(inputs.E2);
      const v12 = parseFloat(inputs.v12);
      const G12 = parseFloat(inputs.G12);
      const N = parseInt(inputs.N);
      
      const theta_values = inputs.theta.split(',').map(x => parseFloat(x.trim()));
      const thickness_values = inputs.thickness.split(',').map(x => parseFloat(x.trim()));

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
      alert('Error in calculation. Please check your inputs.');
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
      alert('Error in calculation. Please check your inputs.');
      console.error(error);
    }
  };

  const calculateStress = () => {
    try {
      // Use first layer's W matrix for stress calculation
      const W = results.layers[0].W;
      const sigma = multiplyMatrices(W, strainResults.eps);
      
      setStressResults({ sigma });
      setStep('stress');
    } catch (error) {
      alert('Error in stress calculation.');
      console.error(error);
    }
  };

  if (step === 'stress') {
    return <StressResultsView sigma={stressResults.sigma} setStep={setStep} />;
  }

  if (step === 'strain') {
    return <StrainCurvatureView eps={strainResults.eps} kap={strainResults.kap} onNext={calculateStress} />;
  }

  if (step === 'forces') {
    return <ForceInputView forces={forces} setForces={setForces} onCalculate={calculateStrain} />;
  }

  if (step === 'advanced') {
    return <AdvancedMatricesView results={results} onNext={() => setStep('forces')} />;
  }

  if (step === 'basic') {
    return <BasicMatricesView results={results} onNext={() => setStep('advanced')} />;
  }

  return <InputForm inputs={inputs} setInputs={setInputs} onCalculate={calculate} />;
};

export default CompositeMaterialAnalysis;