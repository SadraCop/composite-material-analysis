import React from 'react';
import { ChevronRight } from 'lucide-react';
import MatrixDisplay from './MatrixDisplay';
import { gradientBg } from '../styles/commonStyles';

const AdvancedMatricesView = ({ results, onNext }) => (
  <div style={gradientBg}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '8px',
          textShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>Advanced Derived Matrices</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
          Compliance Matrices (Star and Prime)
        </p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
          Star Matrices (Intermediate Compliance)
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <MatrixDisplay matrix={results.A_st} title="A*" color="#10b981" unit="mm/N" />
          <MatrixDisplay matrix={results.B_st} title="B*" color="#14b8a6" unit="1/N" />
          <MatrixDisplay matrix={results.H_st} title="H*" color="#06b6d4" unit="1/N" />
          <MatrixDisplay matrix={results.D_st} title="D*" color="#0ea5e9" unit="N·mm" />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
          Prime Matrices (Final Compliance)
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <MatrixDisplay matrix={results.A_pr} title="A'" color="#f59e0b" unit="mm/N" />
          <MatrixDisplay matrix={results.B_pr} title="B'" color="#f97316" unit="1/N" />
          <MatrixDisplay matrix={results.H_pr} title="H'" color="#ef4444" unit="1/N" />
          <MatrixDisplay matrix={results.D_pr} title="D'" color="#dc2626" unit="1/(N·mm)" />
        </div>
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
        Enter Forces and Moments
        <ChevronRight style={{ width: '24px', height: '24px' }} />
      </button>
    </div>
  </div>
);

export default AdvancedMatricesView;