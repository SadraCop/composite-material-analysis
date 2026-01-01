const ZERO_THRESHOLD = 1e-10; // اگر عدد از این کوچک‌تر باشد، به صفر تبدیل می‌شود

export const formatNumber = (num) => {
  if (num === 0) return "0";
  if (!num || isNaN(num)) return "0";
  // اگر عدد بسیار کوچک باشد (تقریباً صفر)، آن را به صفر تبدیل کن
  if (Math.abs(num) < ZERO_THRESHOLD) return "0";
  const formatted = num.toFixed(3);
  return formatted.replace(/\.?0+$/, "");
};

export const formatScientific = (num, precision = 4) => {
  if (num === 0) return "0";
  // اگر عدد بسیار کوچک باشد (تقریباً صفر)، آن را به صفر تبدیل کن
  if (Math.abs(num) < ZERO_THRESHOLD) return "0";
  if (Math.abs(num) === 1) return num.toString();

  const absNum = Math.abs(num);
  if (absNum >= 0.001 && absNum < 1000) {
    return num.toFixed(precision);
  }

  const exponent = Math.floor(Math.log10(absNum));
  const mantissa = num / Math.pow(10, exponent);

  return `${mantissa.toFixed(precision)} × 10${toSuperscript(exponent)}`;
};

const toSuperscript = (num) => {
  const superscripts = {
    "-": "⁻",
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };

  return num
    .toString()
    .split("")
    .map((char) => superscripts[char] || char)
    .join("");
};

export const formatMatrix = (matrix, precision = 4) => {
  return matrix.map((row) =>
    row.map((cell) => formatScientific(cell, precision))
  );
};

export const formatMatrixScientific = (matrix, precision = 4) => {
  if (!matrix || !Array.isArray(matrix)) return matrix;
  return matrix.map((row) =>
    row.map((cell) => formatScientific(cell, precision))
  );
};
