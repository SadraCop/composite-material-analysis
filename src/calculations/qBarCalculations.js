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