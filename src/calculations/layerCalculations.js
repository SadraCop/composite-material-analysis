// تابع اصلاح‌شده calculateLayerQbar
export const calculateLayerQbar = (theta, Q11, Q22, Q12, Q66) => {
  const rad = (theta * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  if ([Q11, Q22, Q12, Q66].some(v => typeof v !== "number" || isNaN(v))) {
    throw new Error("Invalid material stiffness values in calculateLayerQbar");
  }

  const c2 = c * c;
  const s2 = s * s;
  const c4 = c2 * c2;
  const s4 = s2 * s2;

  const Q11b = Q11 * c4 + 2 * (Q12 + 2 * Q66) * s2 * c2 + Q22 * s4;
  const Q22b = Q11 * s4 + 2 * (Q12 + 2 * Q66) * s2 * c2 + Q22 * c4;
  const Q12b = (Q11 + Q22 - 4 * Q66) * s2 * c2 + Q12 * (s4 + c4);
  const Q16b = (Q11 - Q12 - 2 * Q66) * c * c2 * s + (Q12 - Q22 + 2 * Q66) * s * s2 * c;
  const Q26b = (Q11 - Q12 - 2 * Q66) * s * s2 * c + (Q12 - Q22 + 2 * Q66) * c * c2 * s;
  const Q66b = (Q11 + Q22 - 2 * Q12 - 2 * Q66) * s2 * c2 + Q66 * (s4 + c4);

  const Qbar = [
    [Q11b, Q12b, Q16b],
    [Q12b, Q22b, Q26b],
    [Q16b, Q26b, Q66b],
  ];

  // بررسی صحت Qbar
  if (!Array.isArray(Qbar) || Qbar.length !== 3 || Qbar.some(row => !Array.isArray(row) || row.length !== 3)) {
    throw new Error("Invalid Qbar matrix format");
  }

  return Qbar;
};

// اصلاحات در تابع calculateABDMatrices:
export const calculateABDMatrices = (layers, thickness_values) => {
  try {
    if (!layers || layers.length === 0) {
      throw new Error("No layers provided");
    }

    const total_thickness = thickness_values.reduce((a, b) => a + b, 0);
    if (total_thickness <= 0) {
      throw new Error("Total thickness must be positive");
    }

    const left_value = total_thickness / 2;
    const results_seq = [left_value];
    let current_value = left_value;

    for (let i = 0; i < layers.length; i++) {
      current_value -= thickness_values[i];
      results_seq.push(current_value);
    }

    const Z1 = results_seq.map((val, index, array) => val - array[index + 1]);
    const Z2 = results_seq.map((val, index, array) => val ** 2 - array[index + 1] ** 2);
    const Z3 = results_seq.map((val, index, array) => val ** 3 - array[index + 1] ** 3);

    const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const B = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const D = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (let i = 0; i < layers.length; i++) {
      const Qbar = layers[i].Qbar;  // دریافت Qbar از لایه

      if (!Qbar) {
        throw new Error(`Layer ${i + 1} does not have a valid Qbar matrix`);
      }

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          A[r][c] += Z1[i] * Qbar[r][c];
          B[r][c] += (Z2[i] / 2) * Qbar[r][c];
          D[r][c] += (Z3[i] / 3) * Qbar[r][c];
        }
      }
    }

    return { A, B, D };
  } catch (error) {
    console.error("ABD matrices calculation error:", error);
    throw error;
  }
};


// Q matrix in material coordinates (local)
export const calculateLayerQ = (E1, E2, v12, G12) => {
  const v21 = (v12 * E2) / E1;
  const denom = 1 - v12 * v21;

  if (Math.abs(denom) < 1e-12) {
    throw new Error("Invalid Poisson ratio combination (denominator ~ 0)");
  }

  const Q11 = E1 / denom;
  const Q22 = E2 / denom;
  const Q12 = (v12 * E2) / denom;
  const Q66 = G12;

  return [
    [Q11, Q12, 0],
    [Q12, Q22, 0],
    [0, 0, Q66],
  ];
};
