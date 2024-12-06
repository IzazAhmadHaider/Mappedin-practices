import React, { useState } from 'react';
interface WayFindingFormProps {
    Points?: string[];
    setPoints: React.Dispatch<React.SetStateAction<string[]>>;
}

const WayFindingForm: React.FC<WayFindingFormProps> = ({ setPoints }) => {
    const [isFormVisible, setFormVisible] = useState<boolean>(false);
    const [inputValues, setInputValues] = useState<string[]>(['', '', '']);

    const handleToggleForm = (): void => {
        setFormVisible((prev) => !prev);
        setPoints([]); 
    };

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
            <div className="z-50 absolute top-4 left-4 p-4 bg-white shadow-lg rounded-lg w-80">
                <button
                    onClick={handleToggleForm}
                    className="absolute w-4 h-4 top-5 right-5"
                >
                    <span className={`w-4 h-1 rotate-45 fixed bg-[#4c4c4c] -translate-y-2.5 rounded-lg transition-all ${isFormVisible && '-translate-y-1.5'}`}></span>
                    <span className={`w-4 h-1 -rotate-45 fixed bg-[#4c4c4c] rounded-lg transition-all ${isFormVisible && '-translate-y-1.5'}`}></span>
                </button>
                <h2 className="text-xl font-semibold mb-4">Find Your Way</h2>
                {isFormVisible && (
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
                        <div>
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
                )}
            </div>
        </>
    );
};

export default WayFindingForm;
