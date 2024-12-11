import { IconArrowBackUp, IconArrowForwardUp, IconRotate360, IconZoomInArea, IconZoomOutArea } from '@tabler/icons-react';
import React from 'react';

// Define the type for Camera control actions
type CameraControlAction = 'pitch-up' | 'pitch-down' | 'bearing-left' | 'bearing-right' | 'zoom-in' | 'zoom-out';

// Define the type for the mapView prop
interface CameraControlsProps {
  mapView: {
    Camera: {
      pitch: number;
      bearing: number;
      zoomLevel: number;
      animateTo: (transform: { pitch?: number; bearing?: number; zoomLevel?: number }) => void;
    };
  };
}

const CameraControls: React.FC<CameraControlsProps> = ({ mapView }) => {
  const handleControlClick = (action: CameraControlAction) => {
    if (!mapView) return;

    const transform: { pitch?: number; bearing?: number; zoomLevel?: number } = {};

    switch (action) {
      case 'pitch-up':
        transform.pitch = mapView.Camera.pitch + 10;
        break;
      case 'pitch-down':
        transform.pitch = mapView.Camera.pitch - 10;
        break;
      case 'bearing-left':
        transform.bearing = (mapView.Camera.bearing - 45) % 360;
        break;
      case 'bearing-right':
        transform.bearing = (mapView.Camera.bearing + 45) % 360;
        break;
      case 'zoom-in':
        transform.zoomLevel = mapView.Camera.zoomLevel + 0.5;
        break;
      case 'zoom-out':
        transform.zoomLevel = mapView.Camera.zoomLevel - 0.5;
        break;
      default:
        break;
    }

    mapView.Camera.animateTo(transform);
  };

  return (
    <div className="fixed bottom-8 right-6 p-5 bg-white z-50 flex flex-col gap-2 rounded-lg">
      <div className="group relative flex items-center">
        <IconRotate360
          size={30}
          className="border-[1.5px] p-1 rounded-lg cursor-pointer"
          onClick={() => handleControlClick('pitch-up')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Pitch Up
        </span>
      </div>
      <div className="group relative flex items-center">
        <IconRotate360
          size={30}
          className="border-[1.5px] p-1 rounded-lg cursor-pointer rotate-90"
          onClick={() => handleControlClick('pitch-down')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Pitch Down
        </span>
      </div>
      <div className="group relative flex items-center">
        <IconArrowBackUp
          size={30}
          className="border-[1.5px] p-1 rounded-lg cursor-pointer"
          onClick={() => handleControlClick('bearing-left')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Bearing Left
        </span>
      </div>
      <div className="group relative flex items-center">
        <IconArrowForwardUp
          size={30}
          className="border-[1.5px] p-1 rounded-lg cursor-pointer"
          onClick={() => handleControlClick('bearing-right')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Bearing Right
        </span>
      </div>
      <div className="group relative flex items-center">
        <IconZoomInArea
          size={30}
          className="border-[1.5px] p-1 rounded-lg cursor-pointer"
          onClick={() => handleControlClick('zoom-in')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Zoom In
        </span>
      </div>
      <div className="group relative flex items-center">
        <IconZoomOutArea
          size={30}
          className="border-[1.5px] p-1 rounded-lg cursor-pointer"
          onClick={() => handleControlClick('zoom-out')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Zoom Out
        </span>
      </div>
    </div>
  );
};

export default CameraControls;
