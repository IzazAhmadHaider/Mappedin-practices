/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import { useEffect, useMemo, useState } from 'react';
import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { Space } from '@mappedin/react-sdk/mappedin-js/src';
import WayFindingForm from './components/WayFindingForm';
import { AddPathOptions } from '@mappedin/react-sdk/geojson/src';

interface MyCustomComponentProps {
  Points: string[];
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({ Points }) => {
  const { mapData, mapView } = useMap();
  const [isLoopCompleted, setIsLoopCompleted] = useState(false);

  const [coordinatee, setCoordinatee] = useState(
    mapView.createCoordinate(43.4868876425416, -80.5926397158061)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

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
  
    const firstSpace = mapData.getByType('space').find((s) => s.name === 'Library');
    const secondSpace = mapData.getByType('space').find((s) => s.name === 'Gymnasium');
    console.log(firstSpace?.center, 'I am First Space');

    useEffect(() => {
      if (isLoopCompleted) return;
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % coordinatesList.length;
          const nextCoordinate = coordinatesList[nextIndex];
    
          const newCoordinate = mapView.createCoordinate(nextCoordinate.latitude, nextCoordinate.longitude);
          setCoordinatee(newCoordinate);
    
          console.log("Updated Coordinate:", newCoordinate.toJSON());
    
          // Check if coordinates match and trigger an alert or toast
          if (
            newCoordinate.latitude === firstSpace?.center.latitude && 
            newCoordinate.longitude === firstSpace?.center.longitude   
          ) {
            setIsLoopCompleted(true);
            toast.success('You Have Reached Your Destination');
            clearInterval(interval);
          }
          return nextIndex;
        });
      }, 3000);
    
      return () => clearInterval(interval);
    }, [coordinatee, mapView, firstSpace , coordinatesList]);
    

  const handler = (event: any) => {
    const { coordinate } = event;

    if (coordinate) {
      console.log('Full Coordinate Object:', coordinate);
    } else {
      console.error('No coordinate information available in the event.');
    }
  };
  mapView.on('click', handler);

  if (!firstSpace || !secondSpace) {
    console.error('One or both spaces are missing.');
    return;
  }

  const directions = mapData.getDirections(coordinatee, firstSpace);

  if (directions) {
    const pathOptions1: AddPathOptions = {
      color: "#FF5733",
      displayArrowsOnPath: true,
      animateArrowsOnPath: true,
    };
    mapView.Navigation.draw(directions, {
      pathOptions: pathOptions1,
    });
  } else {
    console.error('Failed to generate directions between the spaces.');
  }

  return (
    <>
      {mapData
        .getByType('space')
        .map((space: Space) => (
          <Label key={space.id} target={space.center} text={space.name} />
        ))}
    </>
  );
};

export default function App() {
  const [Points, setPoints] = useState<string[]>(['', '', '']);
  const { isLoading, error, mapData } = useMapData({
    key: 'mik_yeBk0Vf0nNJtpesfu560e07e5',
    secret: 'mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022',
    mapId: '65c12d9b30b94e3fabd5bb91',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <MapView className="relative" mapData={mapData}>
        <WayFindingForm Points={Points} setPoints={setPoints} />
        <MyCustomComponent Points={Points} />
      </MapView>
    </>
  ) : null;
}
