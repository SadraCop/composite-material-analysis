export const calculateMaterialProperties = (E1, E2, v12, G12) => {
  try {
    if (E1 <= 0 || E2 <= 0 || G12 <= 0) {
      throw new Error('Material properties must be positive');
    }
    if (v12 < 0 || v12 >= 1) {
      throw new Error('Poisson\'s ratio must be between 0 and 1');
    }
    
    const v21 = (v12 * E2) / E1;
    const denominator = 1 - v12 * v21;
    
    if (Math.abs(denominator) < 1e-10) {
      throw new Error('Invalid Poisson\'s ratio - denominator too small');
    }
    
    const Q11 = E1 / denominator;
    const Q22 = E2 / denominator;
    const Q12 = (v12 * E2) / denominator;
    const Q66 = G12;
    
    return { Q11, Q22, Q12, Q66, v21 };
  } catch (error) {
    console.error('Material properties calculation error:', error);
    throw error;
  }
};