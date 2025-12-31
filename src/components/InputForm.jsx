import React from 'react';
import { ArrowRight } from 'lucide-react';
import { gradientBg, whiteCard } from '../styles/commonStyles';

const InputForm = ({ inputs, setInputs, onCalculate }) => {
  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={gradientBg}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '5px',
              paddingBottom: '1px',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
            }}>
              <img src='/logo.png' height='135' width='132' alt='logo' />
            </div>
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
            textShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            Composite Material Analysis
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            Enter material properties and layer configuration
          </p>
        </div>

        <div style={whiteCard}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#3b82f6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>1</div>
              Material Properties
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {[
                { field: 'E1', label: 'E1 (Longitudinal Modulus)', placeholder: 'e.g., 181000', unit: 'MPa' },
                { field: 'E2', label: 'E2 (Transverse Modulus)', placeholder: 'e.g., 10300', unit: 'MPa' },
                { field: 'v12', label: 'v12 (Poisson\'s Ratio)', placeholder: 'e.g., 0.28', unit: '' },
                { field: 'G12', label: 'G12 (Shear Modulus)', placeholder: 'e.g., 7170', unit: 'MPa' }
              ].map(({ field, label, placeholder, unit }) => (
                <div key={field}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>{label} {unit && <span style={{ color: '#6b7280' }}>({unit})</span>}</label>
                  <input
                    type="number"
                    step="any"
                    value={inputs[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#8b5cf6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>2</div>
              Layer Configuration
            </h2>
            {[
              { field: 'N', label: 'Number of Layers (N)', placeholder: 'e.g., 4', unit: '' },
              { field: 'theta', label: 'Theta Values (comma separated)', placeholder: 'e.g., 0, 45, -45, 90', unit: '°' },
              { field: 'thickness', label: 'Thickness Values (comma separated)', placeholder: 'e.g., 0.125, 0.125, 0.125, 0.125', unit: 'mm' }
            ].map(({ field, label, placeholder, unit }) => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>{label} {unit && <span style={{ color: '#6b7280' }}>({unit})</span>}</label>
                <input
                  type={field === 'N' ? 'number' : 'text'}
                  value={inputs[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          <button
            onClick={onCalculate}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Calculate Matrices
            <ArrowRight style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
