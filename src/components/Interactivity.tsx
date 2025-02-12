import { useEffect, useState } from 'react';
import { useMap } from '@mappedin/react-sdk';

const MarkerCycle: React.FC = () => {
    const { mapData, mapView } = useMap();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Define the list of coordinates
    const coordinates = [
        { id: '1f227d73-cfeb-4c19-a904-6421914b92f0', latitude: 50.105724013864105, longitude: 8.671247942475908 },
        { id: '17628b8e-bb5f-4bac-ac3d-6e39ec0fa763', latitude: 50.105824013864105, longitude: 8.671347942475908 },
        { id: '17628b8e-bb5f-4bac-ac3d-6e39ec0fa763', latitude: 50.105424013864105, longitude: 8.621347942475908 },
        
    ];

    useEffect(() => {
        if (!mapData || !mapView) {
            console.error("Map data or view is not available.");
            return;
        }

        // Create a MappedinCoordinate for the first location
        const createMarker = (coordinate: any) => {
            const markerTemplate = `
            <div>
                <style>
                    .marker {
                        display: flex;
                        align-items: center;
                        max-height: 64px;
                    }
                    .marker img {
                        width: 20px;
                        height: 20px;
                        margin-right: 8px;
                        border-radius: 50%;
                    }
                </style>
                <div class="marker">
                    <img src="location.png" alt="" />
                </div>
            </div>
            `;

            const mapCoordinate = mapView.createCoordinate(coordinate.latitude, coordinate.longitude);

            // Add the marker at the coordinate
            mapView.Markers.add(mapCoordinate, markerTemplate, {
                interactive: true,
                anchor: 'center',
                rank: 'always-visible',
            });

            return mapCoordinate;
        };

        // Create the initial marker at the first coordinate
        let currentMarker = createMarker(coordinates[currentIndex]);

        // Function to update the marker
        const updateMarker = () => {
            // Remove the previous marker
            mapView.Markers.remove(currentMarker);

            // Set the next marker in the coordinates list
            const nextIndex = (currentIndex + 1) % coordinates.length;
            const nextCoordinate = coordinates[nextIndex];

            // Create and add the new marker
            currentMarker = createMarker(nextCoordinate);

            // Update the current index for the next cycle
            setCurrentIndex(nextIndex);
        };

        // Set the interval to update the marker every 2 seconds
        const intervalId = setInterval(updateMarker, 2000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [mapData, mapView, currentIndex]);

    return null;
};

export default MarkerCycle;
