/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import { useState } from 'react';
import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { Space, TDirectionZone } from '@mappedin/react-sdk/mappedin-js/src';
import WayFindingForm from './components/WayFindingForm';
import circle from "@turf/circle";
import { Feature, Polygon } from "@turf/turf";
// import { AddPathOptions } from '@mappedin/react-sdk/geojson/src/components/path';

interface MyCustomComponentProps {
  Points: string[];
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({ Points }) => {
  const { mapData, mapView } = useMap();
  // const firstSpace = Points[0] ? mapData.getByType('space').find((s) => s.name === Points[0]) : undefined;
  // const secondSpace = Points[1] ? mapData.getByType('space').find((s) => s.name === Points[1]) : undefined;
  // const ThirdSpace = Points[2] ? mapData.getByType('space').find((s) => s.name === Points[2]) : undefined;


  // if (!firstSpace || !secondSpace) {
  //   console.error('One or both spaces are missing.');
  //   return;
  // }
  // const destinationSpaces: any = ThirdSpace ? [secondSpace, ThirdSpace] : secondSpace;

  // console.log("Third Space", ThirdSpace)

  // const directions = ThirdSpace ? mapData.getDirectionsMultiDestination(firstSpace, destinationSpaces) : mapData.getDirections(firstSpace, destinationSpaces)
  // if (directions) {
  //   const pathOptions1: AddPathOptions = {
  //     color: "#FF5733",
  //     // animateDrawing: true,
  //     displayArrowsOnPath: true,
  //     animateArrowsOnPath: true,
  //     // drawDuration: 2000,
  //   };
  //   mapView.Navigation.draw(directions, {
  //     pathOptions: pathOptions1,  // Use first set of path options
  //   });
  // } else {
  //   console.error('Failed to generate directions between the spaces.');
  // }
  function addCircleWithHeight(
    point: [number, number],
    radius = 2, // in meters
    height = 0.5 // height in meters for altitude of the polygon
  ): Feature<Polygon> {
    // Generate circle geometry using @turf/circle
    const geometry = circle(point, radius, { units: "meters" }).geometry;

    // Return the polygon feature with specified height and color
    return {
      type: "Feature",
      geometry,
      properties: {
        height: height, // Set the height of the polygon
      },
    } as Feature<Polygon>;
  }

  const zones: TDirectionZone[] = [];

  mapView.on("click", async (event) => {
    if (!event) return;

    const center: [number, number] = [
      event.coordinate.longitude,
      event.coordinate.latitude,
    ];
    // const center: [number, number] = [43.486884871599905,-80.5927221896818];

    // On left click, add an orange circle that should be avoided if possible.
    if (event.pointerEvent.button === 0) {
      // Specify a radius and height for the circle
      const polygon = addCircleWithHeight(center, 3, 0.5); // Example radius: 3 meters, height: 0.5 meters

      // Add the polygon to the map
      mapView.Shapes.add(
        {
          type: "FeatureCollection",
          features: [polygon],
        },
        {
          color: "orange",
          altitude: polygon.properties.height,
          height: polygon.properties.height,
          opacity: 0.3,
        },
        mapView.currentFloor
      );

      // Push the polygon into the zones array (to be avoided)
      zones.push({
        geometry: polygon,
        cost: Infinity, // Set high cost (infinity) to avoid the area entirely
        floor: mapView.currentFloor,
      });
      console.log("We are event Coordinates" ,event.coordinate)

      // Add an "Avoid" marker
      mapView.Markers.add(
        event.coordinate,
        `<div class="zone avoid">avoid</div>`,
        {
          rank: "always-visible",
        }
      );
    }
  });

  mapView.on('click', async (event) => {
    const clickedLocationc = event.coordinate;
    console.log(clickedLocationc);

    const clickedLocation = mapData.getByType('space').find((s) => s.name === 'Library');
    const destination = mapData.getByType('space').find((s) => s.name === 'Gymnasium');

    if (destination) {
      // Get new directions considering the updated zones
      const directions = mapData.getDirections(clickedLocation, destination, { zones });

      if (directions) {
        // Remove any previous paths
        mapView.Paths.removeAll();

        // Draw the new directions, avoiding the zones
        mapView.Navigation.draw(directions, {
          pathOptions: {
            nearRadius: 1,
            farRadius: 1,
          },
        });
      }
    }
  });


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
