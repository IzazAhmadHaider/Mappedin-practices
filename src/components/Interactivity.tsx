/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useMap } from '@mappedin/react-sdk';

const MarkerOnClick: React.FC = () => {
    const { mapData, mapView } = useMap();

    useEffect(() => {
        const handleMapClick = (event: any) => {
            if (!mapData || !mapView) {
                console.error("Map data or view is not available.");
                return;
            }

            // Check if there are any markers clicked
            if (event.markers.length > 0) {
                console.log("Clicked on marker: " + event.markers[0].id);
                mapView.Markers.remove(event.markers[0]);
            } else {
                // If no marker is clicked, create a new marker at the clicked location
                const markerTemplate = `
                    <div>
                        <style>
                            .marker {
                                display: flex;
                                align-items: center;
                                background-color: #fff;
                                max-height: 64px;
                                border: 2px solid #293136;
                                border-radius: 4px;
                                padding: 4px 12px;
                                font-weight: bold;
                                font-family: sans-serif;
                                color: #ffffff;
                                background: #293136;
                            }
                        </style>
                        <div class="marker">
                            <p>New Marker</p>
                        </div>
                    </div>
                `;

                // Add marker at the clicked position
                mapView.Markers.add(event.coordinate, markerTemplate, {
                    interactive: true,
                    anchor: 'left',
                });
            }
        };

        // Attach the click event listener to the map view
        if (mapView) {
            mapView.on('click', handleMapClick);
        }

        // Clean up the event listener when the component unmounts or when mapView changes
        return () => {
            if (mapView) {
                mapView.off('click', handleMapClick);
            }
        };
    }, [mapData, mapView]);

    return null
};

export default MarkerOnClick;
