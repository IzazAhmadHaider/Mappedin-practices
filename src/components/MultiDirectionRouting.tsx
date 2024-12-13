import { useEffect, useState } from 'react';
import { Path, useMap } from '@mappedin/react-sdk';
import { TDirectionZone } from '@mappedin/react-sdk/mappedin-js/src';
import WayFindingForm from './WayFindingForm';
import '@mappedin/react-sdk/lib/esm/index.css';



const MultiDirectionRouting: React.FC = () => {
    const [Points, setPoints] = useState<string[]>(['', '', '']);
    const { mapData, mapView } = useMap();
    const zones: TDirectionZone[] = [];

    useEffect(() => {
        const findMultiDestinationDirections = () => {
            if (!mapData || !mapView) {
                console.error("Map data or view is not available.");
                return;
            }

            // Extract the departure point and destinations
            const [departureName, ...destinationNames] = Points;

            const departure = mapData.getByType("space").find((s) => s.name === departureName);
            if (!departure) {
                console.error(`Departure point "${departureName}" not found.`);
                return;
            }
            
            const destinations = destinationNames
            .map((name) => mapData.getByType("space").find((s) => s.name === name))
            .filter((destination) => destination !== undefined);
            
            if (destinations.length === 0) {
                console.error("No valid destinations found.");
                return;
            }

            // Generate directions
            const directions = mapData.getDirectionsMultiDestination(departure, destinations, { zones });
            if (!directions) {
                console.error("Could not generate directions.");
                return;
            }

            console.log("Generated Directions:", directions);

            // Visualize the directions on the map
            mapView.Navigation.draw(directions, {
                pathOptions: {
                    color: "#FF5733",
                    displayArrowsOnPath: true,
                    animateArrowsOnPath: true,
                },
                markerOptions: {
                    departureColor: '#9033ff',
                    destinationColor: '#FFFFFF',
                },
            });
        };

        // Call the function
        findMultiDestinationDirections();
    }, [mapData, mapView, Points]);

    return (<>
        <WayFindingForm Points={Points} setPoints={setPoints} />
    </>)
};

export default MultiDirectionRouting;
