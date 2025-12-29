import React from 'react';
import { ChevronRight } from 'lucide-react';
import MatrixDisplay from './MatrixDisplay';
import { gradientBg } from '../styles/commonStyles';

const StrainCurvatureView = ({ eps, kap, onNext }) => (
  <div style={gradientBg}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '8px',
          textShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>Strains and Curvatures</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
          Mid-plane strains and plate curvatures
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        <MatrixDisplay 
          matrix={eps} 
          title="ε (Strain)" 
          color="#10b981"
          labels={['ε_x', 'ε_y', 'γ_xy']}
          unit="mm/mm"
        />
        <MatrixDisplay 
          matrix={kap} 
          title="κ (Curvature)" 
          color="#3b82f6"
          labels={['κ_x', 'κ_y', 'κ_xy']}
          unit="1/mm"
        />
      </div>

      <button
        onClick={onNext}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Calculate Stress
        <ChevronRight style={{ width: '24px', height: '24px' }} />
      </button>
    </div>
  </div>
);

export default StrainCurvatureView;