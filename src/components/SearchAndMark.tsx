/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLabels } from '../context/Context';

type SearchAndMarkProps = {
    mapView: any;
    mapData: any;
};

const SearchAndMark: React.FC<SearchAndMarkProps> = ({ mapView, mapData }) => {
    const [searchValue, setSearchValue] = useState('');
    const [showFiltered, setShowFiltered] = useState(false);
    const { labels } = useLabels(); // Assuming useLabels provides the list of labels
    const [originalColor, setOriginalColor] = useState<string | null>(null); // Store original color
    const [currentSpace, setCurrentSpace] = useState<any>(null); // Store the currently selected space

    // Handle input change for search
    const handleInputChange = (value: string) => {
        setSearchValue(value);
        setShowFiltered(true); // Show filtered results when typing
    };

    // Get filtered labels based on search value
    const getFilteredLabels = (inputValue: string) => {
        return labels.filter((label) =>
            label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    // Handle label selection
    const handleLabelSelect = (label: string) => {
        setSearchValue(label); // Set the label as the search value
        setShowFiltered(false); // Hide the suggestions
    };

    // Handle the search and color change of the space
    const handleSearch = () => {
        if (!searchValue.trim()) return;

        // Find the space that matches the search value
        const space = mapData.getByType('space').find(
            (space: any) =>
                space.name && space.name.toLowerCase() === searchValue.trim().toLowerCase()
        );

        if (space) {
            console.log('Found space:', space);

            // Store the original color of the space
            setOriginalColor(space.color);

            // Change the color of the matched space
            const hexColor =
                '#' +
                Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, '0');

            // Update state and set color
            mapView.updateState(space, {
                color: hexColor,        // Set the color of the matched space
                interactive: true,       // Make it interactive (clickable, hoverable)
                hoverColor: hexColor,    // Set hover color as well
            });

            // Store the current space for resetting
            setCurrentSpace(space);
        } else {
            console.log('Space not found!');
        }
    };

    // Cleanup: Reset the color when the component unmounts
    useEffect(() => {
        // Function to reset color
        const resetColor = () => {
            if (currentSpace && originalColor) {
                mapView.updateState(currentSpace, {
                    color: originalColor,  // Reset color to original
                    interactive: true,
                    hoverColor: originalColor,  // Reset hover color
                });
            }
        };

        // Cleanup on component unmount or when the component is closed
        return () => {
            resetColor();
        };
    }, [currentSpace, originalColor, mapView]); // Dependencies to trigger cleanup

    return (
        <div className="bg-white w-80 z-50 shadow-lg rounded-lg p-5 max-md:w-[50vw]">
            <div className="relative">
                <label htmlFor="start-point" className="block text-sm font-medium text-gray-700">
                    Starting Point
                </label>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    id="start-point"
                    name="start-point"
                    placeholder="Enter start location"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div
                    className={`mt-2 absolute bg-white w-full shadow-2xl rounded-xl h-20 overflow-y-scroll z-50 ${
                        !showFiltered && 'hidden'
                    }`}
                >
                    {searchValue &&
                        showFiltered &&
                        getFilteredLabels(searchValue).map((label, index) => (
                            <div
                                key={index}
                                className="cursor-pointer p-2 hover:bg-gray-200"
                                onClick={() => handleLabelSelect(label)}
                            >
                                {label}
                            </div>
                        ))}
                </div>
            </div>
            <button
                onClick={handleSearch}
                className="bg-blue-500 mt-5 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Search & Mark
            </button>
        </div>
    );
};

export default SearchAndMark;
