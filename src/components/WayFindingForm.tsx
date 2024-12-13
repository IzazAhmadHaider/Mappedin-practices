import React, { useState } from 'react';
import { useLabels } from '../context/Context';

interface WayFindingFormProps {
  Points?: string[];
  setPoints: React.Dispatch<React.SetStateAction<string[]>>;
  component?: string;
}

const WayFindingForm: React.FC<WayFindingFormProps> = ({ setPoints, component }) => {
  const [inputValues, setInputValues] = useState<string[]>(['', '', '']);
  const [showfiltered, setShowfiltered] = useState<boolean[]>([false, false, false]);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
  const { labels } = useLabels();

  const handleInputChange = (index: number, value: string): void => {
    setShowfiltered((prev) => {
      const newShowfiltered = [...prev];
      newShowfiltered[index] = true;
      return newShowfiltered;
    });
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPoints(inputValues);
    setIsSubmitted(true); // Set to true on submission
  };

  const getFilteredLabels = (inputValue: string) => {
    return labels.filter((label) => label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const handleLabelSelect = (index: number, label: string) => {
    setShowfiltered((prev) => {
      const newShowfiltered = [...prev];
      newShowfiltered[index] = false;
      return newShowfiltered;
    });
    const newValues = [...inputValues];
    newValues[index] = label;
    setInputValues(newValues);
  };

  if (isSubmitted) {
    return null
  }

  return (
    <div className="bg-white w-80 z-50 shadow-lg rounded-lg p-5 max-sm:w-[70vw]">
      <h2 className="text-xl font-semibold mb-4">Find Your Direction</h2>
      <form className="space-y-3" autoComplete="off" onSubmit={handleFormSubmit}>
        {/* Starting Point */}
        <div className="relative">
          <label htmlFor="start-point" className="block text-sm font-medium text-gray-700">
            Starting Point
          </label>
          <input
            type="text"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            id="start-point"
            name="start-point"
            placeholder="Enter start location"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className={`mt-2 absolute bg-white w-full shadow-2xl rounded-xl h-20 overflow-y-scroll z-50 ${!(inputValues[0] && showfiltered[0]) && 'hidden'}`}>
            {(inputValues[0] && showfiltered[0]) &&
              getFilteredLabels(inputValues[0]).map((label, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleLabelSelect(0, label)}
                >
                  {label}
                </div>
              ))}
          </div>
        </div>

        {/* Destination */}
        <div className="relative">
          <label htmlFor="end-point" className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <input
            type="text"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            id="end-point"
            name="end-point"
            placeholder="Enter destination"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className={`mt-2 absolute bg-white overflow-hidden w-full shadow-2xl rounded-xl h-20 overflow-y-scroll z-50 ${!(inputValues[1] && showfiltered[1]) && 'hidden'}`}>
            {(inputValues[1] && showfiltered[1]) &&
              getFilteredLabels(inputValues[1]).map((label, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleLabelSelect(1, label)}
                >
                  {label}
                </div>
              ))}
          </div>
        </div>

        {/* Third Point (optional) */}
        <div className={`${component && 'hidden'}`}>
          <label htmlFor="last-point" className="block text-sm font-medium text-gray-700">
            For MultiSpace Add 3rd Option
          </label>
          <input
            type="text"
            value={inputValues[2]}
            onChange={(e) => handleInputChange(2, e.target.value)}
            id="last-point"
            name="last-point"
            placeholder="Enter last point"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className={`mt-2 absolute bg-white overflow-hidden w-full shadow-2xl rounded-xl h-20 overflow-y-scroll z-50 ${!(inputValues[2] && showfiltered[2]) && 'hidden'}`}>
            {(inputValues[2] && showfiltered[2]) &&
              getFilteredLabels(inputValues[2]).map((label, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleLabelSelect(2, label)}
                >
                  {label}
                </div>
              ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WayFindingForm;
