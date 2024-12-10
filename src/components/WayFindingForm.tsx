import React, { useState } from 'react';
interface WayFindingFormProps {
    Points?: string[];
    setPoints: React.Dispatch<React.SetStateAction<string[]>>;
    component?: string;
}

const WayFindingForm: React.FC<WayFindingFormProps> = ({ setPoints , component }) => {
    const [inputValues, setInputValues] = useState<string[]>(['', '', '']);

    const handleInputChange = (index: number, value: string): void => {
        setInputValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        setPoints(inputValues); 
    };

    return (
        <>
            <div className="bg-white w-80 shadow-lg rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">Find Your Way</h2>
                    <form className="space-y-3" onSubmit={handleFormSubmit}>
                        <div>
                            <label
                                htmlFor="start-point"
                                className="block text-sm font-medium text-gray-700"
                            >
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
                        </div>
                        <div>
                            <label
                                htmlFor="end-point"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Destination
                            </label>
                            <input
                                type="text"
                                id="end-point"
                                value={inputValues[1]}
                                onChange={(e) => handleInputChange(1, e.target.value)}
                                name="end-point"
                                placeholder="Enter destination"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className={`${component && 'hidden'}`}>
                            <label
                                htmlFor="Last-point"
                                className="block text-sm font-medium text-gray-700"
                            >
                                For MultiSpace Add 3rd Option
                            </label>
                            <input
                                type="text"
                                id="Last-point"
                                value={inputValues[2]}
                                onChange={(e) => handleInputChange(2, e.target.value)}
                                name="Last-point"
                                placeholder="Enter last point"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
            </div>
        </>
    );
};

export default WayFindingForm;
