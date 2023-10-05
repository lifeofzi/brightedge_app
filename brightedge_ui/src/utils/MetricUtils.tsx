export const calculateHistogramAverage = (histogram: Histogram) => {
  if (histogram && histogram.length > 0) {
    const values = histogram[0].densities.map((density: string) =>
      parseFloat(density)
    );
    const sum = values.reduce((acc: number, value: number) => acc + value, 0);
    return sum / values.length;
  }
  return 0; // Return 0 if data is missing
};

export const calculateAverageP75 = (p75Array: number[]): number => {
  // Check if the array is empty or contains non-numeric values
  if (p75Array.length === 0 || !p75Array.every(Number.isFinite)) {
    return 0; // or return another default value or null
  }
  return (
    p75Array.reduce((acc: number, value: number) => acc + value, 0) /
    p75Array.length
  );
};
