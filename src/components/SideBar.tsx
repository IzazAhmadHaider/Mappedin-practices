import {
  IconMapCode,
  IconMapPin,
  IconMapPins,
  IconNavigationBolt,
  IconRouteSquare,
} from '@tabler/icons-react';
import React from 'react';

type ComponentState = {
  WayFindingForm: boolean;
  LiveNavigation: boolean;
  SpaceLabeling: boolean;
  MultiDirectionRouting: boolean;
  MarkerOnClick: boolean;
};

// Define props for the SideBar component
interface SideBarProps {
  ToggleComponents: (name: keyof ComponentState) => void;
  componentToOpen: ComponentState;
}

const SideBar: React.FC<SideBarProps> = ({ ToggleComponents, componentToOpen }) => {

  return (
    <div className="h-fit flex flex-col space-y-2 shadow-2xl bg-white rounded-lg p-5">
      <div className="group relative flex items-center space-x-2">
        <IconRouteSquare
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${
            (componentToOpen.WayFindingForm) && 'border-blue-500'
          }`}
          onClick={() => ToggleComponents('WayFindingForm')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Way Finding Form
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconMapPins
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${
            (componentToOpen.MultiDirectionRouting) && 'border-blue-500'
          }`}
          onClick={() => ToggleComponents('MultiDirectionRouting')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Multi Destination Path Finding
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconNavigationBolt
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${
            (componentToOpen.LiveNavigation ) && 'border-blue-500'
          }`}
          onClick={() => ToggleComponents('LiveNavigation')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Live Navigation Example
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconMapCode
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${
            (componentToOpen.SpaceLabeling ) && 'border-blue-500'
          }`}
          onClick={() => ToggleComponents('SpaceLabeling')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add Labels To Map
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconMapPin
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${
            (componentToOpen.MarkerOnClick ) && 'border-blue-500'
          }`}
          onClick={() => ToggleComponents('MarkerOnClick')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add a Marker
        </span>
      </div>
    </div>
  );
};

export default SideBar;
