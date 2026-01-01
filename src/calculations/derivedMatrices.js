import { invertMatrix, multiplyMatrices, subtractMatrices, scalarMultiply } from '../utils/matrixOperations';

export const calculateDerivedMatrices = (A, B, D) => {
  try {
    const A_st = invertMatrix(A);
    const B_st = scalarMultiply(multiplyMatrices(A_st, B), -1);
    const H_st = multiplyMatrices(B, A_st);
    
    const B_A_st_B = multiplyMatrices(multiplyMatrices(B, A_st), B);
    const D_st = subtractMatrices(D, B_A_st_B);
    
    const D_st_inv = invertMatrix(D_st);
    
    const B_st_D_st_inv_H_st = multiplyMatrices(multiplyMatrices(B_st, D_st_inv), H_st);
    const A_pr = subtractMatrices(A_st, B_st_D_st_inv_H_st);
    
    const B_pr = multiplyMatrices(B_st, D_st_inv);
    const H_pr = scalarMultiply(multiplyMatrices(D_st_inv, H_st), -1);
    const D_pr = D_st_inv;
    
    return { A_st, B_st, H_st, D_st, A_pr, B_pr, H_pr, D_pr };
  } catch (error) {
    console.error('Derived matrices calculation error:', error);
    throw error;
  }
};