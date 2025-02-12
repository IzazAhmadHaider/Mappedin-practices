import { useEffect, useState, useCallback } from "react";
import { useMap } from "@mappedin/react-sdk";
import WayFindingForm from "./WayFindingForm";
import "@mappedin/react-sdk/lib/esm/index.css";

const MultiDirectionRouting: React.FC = () => {
    const [points, setPoints] = useState<string[]>(["", "", ""]);
    const { mapData, mapView } = useMap();

    // Function to find and draw multiple destination directions
    const findMultiDestinationDirections = useCallback(() => {
        if (!mapData || !mapView) {
            console.error("Map data or view is not available.");
            return;
        }

        const [departureName, ...destinationNames] = points;
        if (!departureName) {
            console.warn("No departure point specified.");
            return;
        }

        const departure = mapData.getByType("space").find((s) => s.id === departureName);
        if (!departure) {
            console.error(`Departure point "${departureName}" not found.`);
            return;
        }

        const destinations:any = destinationNames
            .map((name) => mapData.getByType("space").find((s) => s.id === name))
            .filter(Boolean);

        if (destinations.length === 0) {
            console.error("No valid destinations found.");
            return;
        }

        // Generate and visualize directions
        const directions = mapData.getDirectionsMultiDestination(departure, destinations, { zones: [] });
        if (!directions) {
            console.error("Could not generate directions.");
            return;
        }

        mapView.Navigation.draw(directions, {
            pathOptions: {
                color: "#10E0D7",
                displayArrowsOnPath: true,
                animateArrowsOnPath: true,
            },
            markerOptions: {
                departureColor: "#10E0D7",
                destinationColor: "#10E0D7",
            },
        });
    }, [mapData, mapView, points]);

    useEffect(() => {
        findMultiDestinationDirections();
    }, [findMultiDestinationDirections]);

    return <WayFindingForm Points={points} setPoints={setPoints} mapData={mapData} />;
};

export default MultiDirectionRouting;
