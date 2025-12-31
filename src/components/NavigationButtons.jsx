import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

const NavigationButtons = ({ onReset, onBackToInput, currentStep }) => {
  // Don't show navigation on input page
  if (currentStep === 'input') return null;

  const shouldShowBackToInput = currentStep === 'strain' || currentStep === 'stress' || currentStep === 'forces';

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      maxWidth: currentStep === 'basic' || currentStep === 'advanced' ? '1400px' : '900px',
      margin: '0 auto 20px auto'
    }}>
      <button
        onClick={onReset}
        style={{
          flex: 1,
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '15px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s',
          backdropFilter: 'blur(10px)',
          minHeight: '48px'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        <Home style={{ width: '18px', height: '18px' }} />
        Reset Analysis
      </button>

      {shouldShowBackToInput && (
        <button
          onClick={onBackToInput}
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '15px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            backdropFilter: 'blur(10px)',
            minHeight: '48px'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
          {currentStep === 'forces' ? 'Edit Materials' : 'Edit Forces'}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
