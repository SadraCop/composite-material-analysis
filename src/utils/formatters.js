export const formatNumber = (num) => {
  if (num === 0) return '0';
  if (!num || isNaN(num)) return '0';
  const formatted = num.toFixed(3);
  return formatted.replace(/\.?0+$/, '');
};