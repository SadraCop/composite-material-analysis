import React from 'react';
import { ArrowRight } from 'lucide-react';
import { gradientBg, whiteCard } from '../styles/commonStyles';

const ForceInputView = ({ forces, setForces, onCalculate }) => {
  const handleChange = (matrix, index, value) => {
    setForces(prev => ({
      ...prev,
      [matrix]: prev[matrix].map((v, i) => i === index ? (value === '' ? 0 : parseFloat(value)) : v)
    }));
  };

  return (
    <div style={gradientBg}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
            textShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>Enter Forces & Moments</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            Input the applied loads
          </p>
        </div>

        <div style={whiteCard}>
          <div style={{ marginBottom: '32px' }}>
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
                fontWeight: 'bold',
                fontSize: '18px'
              }}>N</div>
              Force Vector (N)
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { label: 'N_x', unit: 'N/mm', index: 0 },
                { label: 'N_y', unit: 'N/mm', index: 1 },
                { label: 'N_xy', unit: 'N/mm', index: 2 }
              ].map(({ label, unit, index }) => (
                <div key={label}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    {label} <span style={{ color: '#6b7280' }}>({unit})</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={forces.N[index] === 0 ? '' : forces.N[index]}
                    onChange={(e) => handleChange('N', index, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
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
                fontWeight: 'bold',
                fontSize: '18px'
              }}>M</div>
              Moment Vector (M)
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { label: 'M_x', unit: 'N', index: 0 },
                { label: 'M_y', unit: 'N', index: 1 },
                { label: 'M_xy', unit: 'N', index: 2 }
              ].map(({ label, unit, index }) => (
                <div key={label}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    {label} <span style={{ color: '#6b7280' }}>({unit})</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={forces.M[index] === 0 ? '' : forces.M[index]}
                    onChange={(e) => handleChange('M', index, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
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
            Calculate Strains & Curvatures
            <ArrowRight style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForceInputView;