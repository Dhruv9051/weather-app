// Helper function for formatting temperature
export const formatTemp = (temp, unit) => {
  return `${Math.round(temp)}°${unit}`;
};

// Helper function for formatting date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};