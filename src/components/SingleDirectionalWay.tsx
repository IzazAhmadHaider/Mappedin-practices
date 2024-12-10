import React, { useEffect, useState } from "react";
import { useMap } from "@mappedin/react-sdk";
import WayFindingForm from "./WayFindingForm";


const SingleDirectionalWay: React.FC = () => {
    const [Points, setPoints] = useState<string[]>(['', '', '']);
  const { mapData, mapView } = useMap();

  useEffect(() => {
    const findSingleDirection = () => {
      if (!mapData || !mapView) {
        console.error("Map data or view is not available.");
        return;
      }

      // Extract start and end points
      const [start, end] = Points;

      if (!start || !end) {
        console.error("Both start and end points must be provided.");
        return;
      }

      // Find the start and end spaces
      const departure = mapData.getByType("space").find((s) => s.name === start);
      const destination = mapData.getByType("space").find((s) => s.name === end);

      if (!departure || !destination) {
        console.error(
          `Could not find spaces: ${!departure ? `Start: ${start}` : ""} ${
            !destination ? `End: ${end}` : ""
          }`
        );
        return;
      }

      // Generate directions
      const directions = mapData.getDirections(departure, destination);

      if (!directions) {
        console.error("Could not generate directions.");
        return;
      }

      console.log("Generated Directions:", directions);

      // Visualize the directions on the map
      mapView.Navigation.draw(directions, {
        pathOptions: {
          color: "#00FF00", // Green for single direction
          displayArrowsOnPath: true,
          animateArrowsOnPath: true,
        },
      });
    };

    findSingleDirection();
  }, [mapData, mapView, Points]);

  return (<>
  <WayFindingForm Points={Points} setPoints={setPoints} component="single" />
  </>)
};

export default SingleDirectionalWay;
