import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Define the type of context value
interface LabelContextType {
  labels: string[];  // Store an array of labels
  setLabels: (labels: string[]) => void;  // Function to set labels
}

// Create the context with an empty array and a function to set labels
const LabelContext = createContext<LabelContextType | undefined>(undefined);

// Provider Component to manage the label state and provide context
export const LabelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [labels, setLabels] = useState<string[]>([]); // Manage labels in state

  // Memoize the labels so they're not recalculated unnecessarily
  const memoizedLabels = useMemo(() => labels, [labels]);

  return (
    <LabelContext.Provider value={{ labels: memoizedLabels, setLabels }}>
      {children}
    </LabelContext.Provider>
  );
};

// Custom hook to access the label context
export const useLabels = (): LabelContextType => {
  const context = useContext(LabelContext);
  if (!context) {
    throw new Error('useLabels must be used within a LabelProvider');
  }
  return context;
};
