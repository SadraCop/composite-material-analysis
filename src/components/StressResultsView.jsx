import React from 'react';
import MatrixDisplay from './MatrixDisplay';
import NavigationButtons from './NavigationButtons';
import { gradientBg } from '../styles/commonStyles';

const StressResultsView = ({ sigma, onReset, onBackToInput, currentStep }) => (
  <div style={gradientBg}>
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <NavigationButtons 
        onReset={onReset} 
        onBackToInput={onBackToInput}
        currentStep={currentStep}
      />

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '8px',
          textShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>Stress Results</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
          Final Stress Values in Material Coordinates
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <MatrixDisplay 
          matrix={sigma} 
          title="σ (Stress)" 
          color="#dc2626"
          labels={['σ_x', 'σ_y', 'τ_xy']}
          unit="MPa"
        />
      </div>

      <button
        onClick={onReset}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '18px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        New Analysis
      </button>
    </div>
  </div>
);

export default StressResultsView;
