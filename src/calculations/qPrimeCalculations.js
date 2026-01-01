import { multiplyMatrices } from "../utils/matrixOperations";

export const calculateLayerQPrime = (theta, Q11, Q22, Q12, Q66) => {
  try {
    const theta_rad = (theta * Math.PI) / 180;
    const c = Math.cos(theta_rad);
    const s = Math.sin(theta_rad);

    const Q11_p =
      Q11 * c ** 4 + 2 * (Q12 + 2 * Q66) * s ** 2 * c ** 2 + Q22 * s ** 4;
    const Q12_p =
      (Q11 + Q22 - 4 * Q66) * s ** 2 * c ** 2 + Q12 * (s ** 4 + c ** 4);
    const Q22_p =
      Q11 * s ** 4 + 2 * (Q12 + 2 * Q66) * s ** 2 * c ** 2 + Q22 * c ** 4;
    const Q16_p =
      (Q11 - Q12 - 2 * Q66) * s * c ** 3 + (Q12 - Q22 + 2 * Q66) * s ** 3 * c;
    const Q26_p =
      (Q11 - Q12 - 2 * Q66) * s ** 3 * c + (Q12 - Q22 + 2 * Q66) * s * c ** 3;
    const Q66_p =
      (Q11 + Q22 - 2 * Q12 - 2 * Q66) * s ** 2 * c ** 2 +
      Q66 * (s ** 4 + c ** 4);

    return [
      [Q11_p, Q12_p, Q16_p],
      [Q12_p, Q22_p, Q26_p],
      [Q16_p, Q26_p, Q66_p],
    ];
  } catch (error) {
    console.error("Layer Q' calculation error:", error);
    throw error;
  }
};
