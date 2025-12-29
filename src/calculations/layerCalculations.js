export const calculateLayerW = (theta, Q11, Q22, Q12, Q66) => {
  try {
    const theta_rad = (theta * Math.PI) / 180;
    const c = Math.cos(theta_rad);
    const s = Math.sin(theta_rad);
    
    const W11 = Q11 * c**4 + 2 * (Q12 + 2 * Q66) * s**2 * c**2 + Q22 * s**4;
    const W12 = (Q11 + Q22 - 4 * Q66) * s**2 * c**2 + Q12 * (s**4 + c**4);
    const W22 = Q11 * s**4 + 2 * (Q12 + 2 * Q66) * s**2 * c**2 + Q22 * c**4;
    const W16 = (Q11 - Q12 - 2 * Q66) * s * c**3 + (Q12 - Q22 + 2 * Q66) * s**3 * c;
    const W26 = (Q11 - Q12 - 2 * Q66) * s**3 * c + (Q12 - Q22 + 2 * Q66) * s * c**3;
    const W66 = (Q11 + Q22 - 2 * Q12 - 2 * Q66) * s**2 * c**2 + Q66 * (s**4 + c**4);
    
    return [
      [W11, W12, W16],
      [W12, W22, W26],
      [W16, W26, W66]
    ];
  } catch (error) {
    console.error('Layer W calculation error:', error);
    throw error;
  }
};

export const calculateABDMatrices = (layers, thickness_values) => {
  try {
    if (!layers || layers.length === 0) {
      throw new Error('No layers provided');
    }
    
    const total_thickness = thickness_values.reduce((a, b) => a + b, 0);
    if (total_thickness <= 0) {
      throw new Error('Total thickness must be positive');
    }
    
    const left_value = total_thickness / 2;
    
    const results_seq = [left_value];
    let current_value = left_value;
    for (let i = 0; i < layers.length; i++) {
      current_value -= thickness_values[i];
      results_seq.push(current_value);
    }

    const Z1 = [];
    for (let i = 0; i < results_seq.length - 1; i++) {
      Z1.push(results_seq[i] - results_seq[i + 1]);
    }

    const results_squared = results_seq.map(x => x**2);
    const Z2 = [];
    for (let i = 0; i < results_squared.length - 1; i++) {
      Z2.push(results_squared[i] - results_squared[i + 1]);
    }

    const results_cubed = results_seq.map(x => x**3);
    const Z3 = [];
    for (let i = 0; i < results_cubed.length - 1; i++) {
      Z3.push(results_cubed[i] - results_cubed[i + 1]);
    }

    const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const B = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const D = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (let i = 0; i < layers.length; i++) {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          A[r][c] += Z1[i] * layers[i].W[r][c];
          B[r][c] += (Z2[i] / 2) * layers[i].W[r][c];
          D[r][c] += (Z3[i] / 3) * layers[i].W[r][c];
        }
      }
    }

    return { A, B, D };
  } catch (error) {
    console.error('ABD matrices calculation error:', error);
    throw error;
  }
};