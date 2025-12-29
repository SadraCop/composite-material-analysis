export const invertMatrix = (matrix) => {
  try {
    const n = matrix.length;
    const augmented = matrix.map((row, i) => [
      ...row,
      ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
    ]);

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

      const pivot = augmented[i][i];
      if (Math.abs(pivot) < 1e-10) {
        throw new Error('Matrix is singular and cannot be inverted');
      }

      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivot;
      }

      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
        }
      }
    }

    return augmented.map(row => row.slice(n));
  } catch (error) {
    console.error('Matrix inversion error:', error);
    throw error;
  }
};

export const multiplyMatrices = (a, b) => {
  try {
    if (!a || !b || !a.length || !b.length || !a[0] || !b[0]) {
      throw new Error('Invalid matrix dimensions');
    }
    
    const result = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  } catch (error) {
    console.error('Matrix multiplication error:', error);
    throw error;
  }
};

export const subtractMatrices = (a, b) => {
  try {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  } catch (error) {
    console.error('Matrix subtraction error:', error);
    throw error;
  }
};

export const scalarMultiply = (matrix, scalar) => {
  try {
    return matrix.map(row => row.map(val => val * scalar));
  } catch (error) {
    console.error('Scalar multiplication error:', error);
    throw error;
  }
};

export const addMatrices = (a, b) => {
  try {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  } catch (error) {
    console.error('Matrix addition error:', error);
    throw error;
  }
};