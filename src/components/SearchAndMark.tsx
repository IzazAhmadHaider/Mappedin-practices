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
    const [isFormVisible, setIsFormVisible] = useState(true); // State to toggle form visibility

    const handleInputChange = (value: string) => {
        setSearchValue(value);
        setShowFiltered(true);
    };

    const getFilteredLabels = (inputValue: string) => {
        return labels.filter((label) =>
            label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handleLabelSelect = (label: string) => {
        setSearchValue(label);
        setShowFiltered(false);
    };

    const handleSearch = () => {
        if (!searchValue.trim()) return;

        const space = mapData.getByType('space').find(
            (space: any) =>
                space.name && space.name.toLowerCase() === searchValue.trim().toLowerCase()
        );

        if (space) {
            console.log('Found space:', space);

            setOriginalColor(space.color);

            const hexColor =
                '#' +
                Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, '0');

            mapView.updateState(space, {
                color: hexColor,
                interactive: true,
                hoverColor: hexColor,
            });

            setCurrentSpace(space);
        } else {
            console.log('Space not found!');
        }

        // Hide the form after searching
        setIsFormVisible(false);
    };

    useEffect(() => {
        const resetColor = () => {
            if (currentSpace && originalColor) {
                mapView.updateState(currentSpace, {
                    color: originalColor,
                    interactive: true,
                    hoverColor: originalColor,
                });
            }
        };

        return () => {
            resetColor();
        };
    }, [currentSpace, originalColor, mapView]);

    return (
        isFormVisible && (
            <div className="bg-white w-80 z-50 shadow-lg rounded-lg p-5 max-md:w-[50vw]">
                <div className="relative">
                    <label htmlFor="start-point" className="block text-sm font-medium text-gray-700">
                        Find a Space
                    </label>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        id="start-point"
                        name="start-point"
                        placeholder="Enter Space Name To Find"
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
                    Search
                </button>
            </div>
        )
    );
};

export default SearchAndMark;
