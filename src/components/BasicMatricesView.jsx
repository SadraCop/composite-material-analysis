import { ChevronRight } from 'lucide-react';
import MatrixDisplay from './MatrixDisplay';
import NavigationButtons from './NavigationButtons';
import { gradientBg } from '../styles/commonStyles';

const BasicMatricesView = ({ results, onNext, onReset, onBackToInput, currentStep }) => (
  <div style={gradientBg}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
        }}>Basic Stiffness Matrices</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
          Extensional, Coupling, and Bending Stiffness
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        <MatrixDisplay matrix={results.A} title="Matrix A" color="#3b82f6" unit="N/mm" />
        <MatrixDisplay matrix={results.B} title="Matrix B" color="#8b5cf6" unit="N" />
        <MatrixDisplay matrix={results.D} title="Matrix D" color="#ec4899" unit="N·mm" />
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
        View Advanced Matrices
        <ChevronRight style={{ width: '24px', height: '24px' }} />
      </button>
    </div>
  </div>
);

export default BasicMatricesView;
