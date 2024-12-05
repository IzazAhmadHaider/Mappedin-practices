/* eslint-disable @typescript-eslint/no-explicit-any */
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import { useEffect, useState } from 'react';
import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { Space } from '@mappedin/react-sdk/mappedin-js/src';
import WayFindingForm from './components/WayFindingForm'

interface MyCustomComponentProps {
  Points: string[];
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({ Points }) => {
  const { mapData, mapView } = useMap();

  useEffect(() => {
    if (!mapView || !mapData) return;

    const spaces: Space[] = mapData.getByType('space');
    spaces.forEach((space) => {
      const randomLightColor = () => {
        const r = Math.floor(200 + Math.random() * 50);
        const g = Math.floor(200 + Math.random() * 50);
        const b = Math.floor(200 + Math.random() * 50);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      };

      const hexColor = randomLightColor();

      mapView.updateState(space, {
        color: hexColor,
        interactive: true,
        hoverColor: hexColor,
      });

      // if (space.name) {
      //   mapView.Labels.add(space, space.name, {
      //     interactive: true,
      //   });

      //   mapView.Markers.add(space, `<div>${space.name}</div>`, {
      //     interactive: true,
      //   });
      // }
    });
  }, [mapView, mapData]);



  useEffect(() => {
    const handleClick = async (e: any) => {
      if (e.labels.length > 0) {
        toast.success(`Clicked on label: ${e.labels[0].text}`);
        mapView.Labels.remove(e.labels[0]);
      } else if (e.markers.length > 0) {
        toast.success(`Clicked on marker: ${e.markers[0].id}`);
        mapView.Markers.remove(e.markers[0]);
      }
    };

    if (mapView) {
      mapView.on('click', handleClick);
    }

    return () => {
      if (mapView) {
        mapView.off('click', handleClick);
      }
    };
  }, [mapView]);

  // Check if any of the Points are empty before trying to find a match.
  const firstSpace = Points[0] ? mapData.getByType('space').find((s) => s.name === Points[0]) : undefined;
  const secondSpace = Points[1] ? mapData.getByType('space').find((s) => s.name === Points[1]) : undefined;
  const ThirdSpace = Points[2] ? mapData.getByType('space').find((s) => s.name === Points[2]) : undefined;


  if (!firstSpace || !secondSpace) {
    console.error('One or both spaces are missing.');
    return;
  }
  const destinationSpaces: any = ThirdSpace ? [secondSpace, ThirdSpace] : secondSpace;

  console.log("Third Space", ThirdSpace)

  const directions = ThirdSpace ? mapData.getDirectionsMultiDestination(firstSpace, destinationSpaces) : mapData.getDirections(firstSpace, destinationSpaces)
  if (directions) {
    const pathOptions1: AddPathOptions = {
      color: "#FF5733",
      animateDrawing: true,
      displayArrowsOnPath: true,
      animateArrowsOnPath: true,
      drawDuration: 2000,
    };
    mapView.Navigation.draw(directions, {
      pathOptions: pathOptions1,  // Use first set of path options
    });
  } else {
    console.error('Failed to generate directions between the spaces.');
  }

  // mapView.on('click', async (event) => {
  //   const clickedLocation = event.coordinate;
  //   const destination = mapData.getByType('space').find((s) => s.name === 'Gymnasium');

  //   // If the destination is found, navigate to it.
  //   if (destination) {
  //     const directions = mapData.getDirections(clickedLocation, destination);

  //     if (directions) {
  //       // Navigate from the clicked location to the gymnasium.
  //       mapView.Navigation.draw(directions, {
  //         pathOptions: {
  //           nearRadius: 1,
  //           farRadius: 1,
  //         },
  //       });
  //     }
  //   }
  // });

  return (
    <>
      {mapData
        .getByType('space')
        .map((space: Space) => (
          <Label key={space.id} target={space.center} text={space.name} />
        ))}
    </>
  );
}

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
