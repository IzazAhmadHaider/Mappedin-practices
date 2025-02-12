import { WALLS } from "@mappedin/mappedin-js";

export function applyMapCustomizations(mapView: any, mapData: any) {
  if (!mapView) return;

  mapView.Camera.set({
    pitch: 0,
    bearing: 159,
    zoomLevel: 16.5,
  });
  console.log("I am Display Map And i am called.")
  mapView.updateState(WALLS.Exterior, {
    color: "#294457",
    topColor: "#3E5A6D",
  });

  mapView.updateState(WALLS.Interior, {
    color: "#294457",
    topColor: "#3E5A6D",
  });
  const spaces = mapData
    .getByType("space")
    .filter((space: any) => space.floor.id === "m_f2786e5df102b3c5");
  for (const space of spaces) {
    const description = space.description.toLowerCase();
    if (description.includes("red")) {
      // Security check
      mapView.updateState(space, {
        color: "#F88E86",
      });
    } else {
      //Floors
      mapView.updateState(space, {
        color: "#00080A",
      });
    }
  }

  mapData.getByType("object").forEach((object: any) => {
    mapView.updateState(object, {
      color: "#294457",
      topColor: "#3E5A6D",
    });
  });
}
