/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import { useEffect, useState } from 'react';
import { MapView, useMapData } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import SideBar from './components/SideBar';
import MapNavigation from './components/MapNavigation';
import SpaceLabeling from './components/SpaceLabelling';
import MultiDirectionRouting from './components/MultiDirectionRouting';
import SingleDirectionalWay from './components/SingleDirectionalWay';
import MarkerOnClick from './components/Interactivity';
import CameraControls from './components/CameraControls';
import SearchAndMark from './components/SearchAndMark';
import { LabelProvider } from './context/Context';

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

  const ToggleComponents = (name: keyof ComponentState) => {
    setComponentToOpen((prevState) => {
      const updatedState: ComponentState = { ...prevState }; // Start with the previous state

      for (const key in prevState) {
        // Preserve the state of SpaceLabeling
        if (key === 'SpaceLabeling') {
          updatedState[key as keyof ComponentState] = prevState[key as keyof ComponentState];
        } else {
          // Toggle the target component and set others to false
          updatedState[key as keyof ComponentState] =
            key === name ? !prevState[key as keyof ComponentState] : false;
        }
      }

      return updatedState;
    });
  };
  const clearMap = () => {
    if (mapView) {
      mapView.Markers.removeAll();
      mapView.Paths.removeAll();
      console.log('Map cleared');
    }
  };
  useEffect(() => {
    clearMap();
  }, [componentToOpen]);





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
      <LabelProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
        <MapView
          className="relative"
          mapData={mapData}
          onLoad={(view) => setMapView(view)} // Capture the mapView instance
        >
          <div className="flex space-x-1 absolute top-4 left-4 p-4">
            <SideBar ToggleComponents={ToggleComponents} componentToOpen={componentToOpen} />
            {componentToOpen.WayFindingForm && <SingleDirectionalWay />}
            {componentToOpen.LiveNavigation && <MapNavigation destination="Library" />}
            {componentToOpen.SpaceLabeling && <SpaceLabeling />}
            {componentToOpen.MultiDirectionRouting && <MultiDirectionRouting />}
            {componentToOpen.MarkerOnClick && <MarkerOnClick />}
            {componentToOpen.IconMapPinSearch && <SearchAndMark mapView={mapView} mapData={mapData} />}
          </div>
          {/* Render CameraControls component and pass mapView */}
          {mapView && <CameraControls mapView={mapView} />}
        </MapView>
      </LabelProvider>
    </>
  ) : null;
}
