import { useEffect, useState } from "react";
import { MapView, useMapData } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import SideBar from "./components/SideBar";
import MapNavigation from "./components/MapNavigation";
import SpaceLabeling from "./components/SpaceLabelling";
import MultiDirectionRouting from "./components/MultiDirectionRouting";
import SingleDirectionalWay from "./components/SingleDirectionalWay";
import MarkerOnClick from "./components/Interactivity";
import CameraControls from "./components/CameraControls";
import SearchAndMark from "./components/SearchAndMark";
import { LabelProvider } from "./context/Context";
import { mapConfig } from "./Config";
import { applyMapCustomizations } from "./components/InitialMapView"; // Import function

type ComponentState = {
  WayFindingForm: boolean;
  LiveNavigation: boolean;
  SpaceLabeling: boolean;
  MultiDirectionRouting: boolean;
  MarkerOnClick: boolean;
  IconMapPinSearch: boolean;
};

export default function App() {
  const [componentToOpen, setComponentToOpen] = useState<ComponentState>({
    WayFindingForm: false,
    LiveNavigation: false,
    SpaceLabeling: true,
    MultiDirectionRouting: false,
    MarkerOnClick: false,
    IconMapPinSearch: false,
  });

  const [mapView, setMapView] = useState<any>(null); // State to store mapView instance
  const options ={
    initialFloor: "m_f2786e5df102b3c5",
    shadingAndOutlines: false,
    outdoorView: {
      enabled: true,
      style: "https://tiles-cdn.mappedin.com/styles/starlight/style.json",
    }}

  const ToggleComponents = (name: keyof ComponentState) => {
    setComponentToOpen((prevState) => {
      const updatedState: ComponentState = { ...prevState };

      for (const key in prevState) {
        if (key === "SpaceLabeling") {
          updatedState[key as keyof ComponentState] =
            prevState[key as keyof ComponentState];
        } else {
          updatedState[key as keyof ComponentState] =
            key === name ? !prevState[key as keyof ComponentState] : false;
        }
      }

      return updatedState;
    });
  };

  const { isLoading, error, mapData } = useMapData({
    key: mapConfig.apiKey,
    secret: mapConfig.apiSecret,
    mapId: mapConfig.mapId,
  });
  useEffect(() => {
    if (mapView) {
      applyMapCustomizations(mapView , mapData);
    }
  }, [mapView]); // Call when mapView is set

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <LabelProvider>
      <MapView
        className="relative"
        mapData={mapData}
        onLoad={(view) => setMapView(view)}
        options={options}

      >
        <div className="flex space-x-1 absolute top-4 left-4 p-4">
          <SideBar
            ToggleComponents={ToggleComponents}
            componentToOpen={componentToOpen}
          />
          {componentToOpen.WayFindingForm && <SingleDirectionalWay />}
          {componentToOpen.LiveNavigation && (
            <MapNavigation destination="Library" />
          )}
          {componentToOpen.SpaceLabeling && <SpaceLabeling />}
          {componentToOpen.MultiDirectionRouting && <MultiDirectionRouting />}
          {componentToOpen.MarkerOnClick && <MarkerOnClick />}
          {componentToOpen.IconMapPinSearch && (
            <SearchAndMark mapView={mapView} mapData={mapData} />
          )}
        </div>
        {mapView && <CameraControls mapView={mapView} />}
      </MapView>
    </LabelProvider>
  ) : null;
}
