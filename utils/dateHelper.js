// Get current month and year in Indian format (e.g., "January 2024")
export const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.toLocaleString('en-IN', { month: 'long' });
  const year = now.getFullYear().toString();
  return `${month} ${year}`;
};

// Format month year string for display
export const formatMonthYear = (month, year) => {
  if (!month || !year) return '';
  return `${month} ${year}`;
};

