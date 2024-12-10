import { useEffect, useMemo, useState } from 'react';
import { useMap } from '@mappedin/react-sdk';
import toast from 'react-hot-toast';
import { AddPathOptions } from '@mappedin/react-sdk/geojson/src';

interface MapNavigationProps {
  destination: string;
}

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

        console.log(currentIndex)

        // Draw the path to the next coordinate
        const destinationSpace = mapData.getByType('space').find((s) => s.name === destination);
        if (destinationSpace) {
          const pathOptions: AddPathOptions = {
            color: "#FF5733",
            displayArrowsOnPath: true,
            animateArrowsOnPath: true,
          };

          const directions = mapData.getDirections(newCoordinate, destinationSpace.center);
          if (directions) {
            mapView.Navigation.draw(directions, { pathOptions });
          }
        }

        // Check if we reached the destination
        if (destinationSpace?.center.latitude === newCoordinate.latitude) {
          setIsLoopCompleted(true);
          toast.success('Destination Reached');
          clearInterval(interval);
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [coordinatesList, mapView, mapData, destination, isLoopCompleted, currentIndex]);

  return null;
};

export default MapNavigation;
