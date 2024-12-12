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
                                max-height: 64px;
                            }
                                
                            .marker img {
                                width: 20px; /* Make the image a bit larger for better visibility */
                                height: 20px;
                                margin-right: 8px; /* Space between image and text */
                                border-radius: 50%; /* Circular image */
                            }
                        </style>
                        <div class="marker">
                             <img src="location.png" alt="" />
                        </div>
                    </div>
                `;

                // Add marker at the clicked position with high priority
                mapView.Markers.add(event.coordinate, markerTemplate, {
                    interactive: true,
                    anchor: 'left',
                    rank: 'always-visible', // Set marker rank to high
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

    return null;
};

export default MarkerOnClick;
