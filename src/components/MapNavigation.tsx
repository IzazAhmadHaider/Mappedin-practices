import { useEffect, useMemo, useState } from 'react';
import { useMap } from '@mappedin/react-sdk';
import toast from 'react-hot-toast';
import { AddPathOptions } from '@mappedin/react-sdk/geojson/src';

interface MapNavigationProps {
  destination: string;
}
const RANKS = ['medium', 'high', 'always-visible'] as const;
let rank = 0 as number;

const MapNavigation: React.FC<MapNavigationProps> = ({ destination }) => {
  const { mapView, mapData } = useMap();

  const coordinatesList = useMemo(() => [
    { latitude: 43.4868876425416, longitude: -80.5926397158061, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48688745069577, longitude: -80.59273587695812, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.4868720223463, longitude: -80.59280178883733, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.4868514134653, longitude: -80.59284167041277, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.486822136125745, longitude: -80.59293022946895, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48680266702968, longitude: -80.5929872691173, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48673381853413, longitude: -80.59316502385983, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48667490818754, longitude: -80.59332729218747, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.486627919663114, longitude: -80.59347691909443, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48653794199464, longitude: -80.59360387047947, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48646225007387, longitude: -80.59344601543482, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.48650911050691, longitude: -80.59356398743166, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.486512246240686, longitude: -80.59353072045974, floorid: "m_0b6f6e39aef72a58" },
    { latitude: 43.486483397338006, longitude: -80.59342715308864, floorid: "m_0b6f6e39aef72a58" },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoopCompleted, setIsLoopCompleted] = useState(false);

  useEffect(() => {
    if (!mapView || !mapData || isLoopCompleted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % coordinatesList.length;
        const nextCoordinate = coordinatesList[nextIndex];
        const newCoordinate = mapView.createCoordinate(nextCoordinate.latitude, nextCoordinate.longitude);
        const lastCoordinate = mapView.createCoordinate(coordinatesList[coordinatesList.length - 1].latitude, coordinatesList[coordinatesList.length - 1].longitude);

        console.log(currentIndex)

        // Draw the path to the next coordinate
        // const destinationSpace = mapData.getByType('space').find((s) => s.name === destination);
        if (lastCoordinate) {
          const pathOptions: AddPathOptions = {
            color: "#FF5733",
            displayArrowsOnPath: true,
            animateArrowsOnPath: true,
          };

          const directions = mapData.getDirections(newCoordinate, lastCoordinate);
          if (directions) {
            mapView.Navigation.draw(directions, { pathOptions });
          }
          // Check if we reached the destination
        }

        const markerTemplate = `
        <div>
          <style>
            .marker {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #f7fafc; /* Light background */
              max-height: 80px;
              border-radius: 12px;
              padding: 8px 16px;
              font-weight: bold;
              font-family: 'Arial', sans-serif;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
              border: 1px solid #d1d5db; /* Subtle border */
              cursor: pointer;
            }
      
            .marker img {
              width: 20px;  /* Make the image a bit larger for better visibility */
              height: 20px;
              margin-right: 8px;  /* Space between image and text */
              border-radius: 50%; /* Circular image */
            }
      
            .marker p {
              color: green; /* Dark gray text color */
              font-size: 14px; /* Adjust font size */
              margin: 0; /* Remove any default margin */
            }
      
            .marker:hover {
              background-color: #e2e8f0; /* Slight hover effect */
              box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* Slight shadow on hover */
            }
          </style>
          <div class="marker">
            <img src="location.png" alt="" />
            <p>Reached Distination</p>
          </div>
        </div>
      `;




        if (lastCoordinate?.latitude === newCoordinate.latitude && coordinatesList[coordinatesList.length + 1] == undefined) {
          setIsLoopCompleted(true);
          mapView.Navigation.clear();
          mapView.Markers.add(lastCoordinate, markerTemplate, {
            rank: RANKS[rank], // Attach rank to the marker for future reference
          });

          // Cycle rank between 0, 1, 2 (medium -> high -> always-visible)
          rank++;
          if (rank === RANKS.length) {
            rank = 0; // Reset rank after 'always-visible'
          }
          toast.success('Destination Reached');
          clearInterval(interval);
          setTimeout(() => {
            mapView.Markers.removeAll();
          }, 10000);
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [coordinatesList, mapView, mapData, destination, isLoopCompleted, currentIndex]);

  return null;
};

export default MapNavigation;
