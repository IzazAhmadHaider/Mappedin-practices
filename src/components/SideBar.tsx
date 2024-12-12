import {
  IconMapCode,
  IconMapPin,
  IconMapPins,
  IconMapPinSearch,
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
  IconMapPinSearch: boolean;
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
        <IconMapPinSearch
          color={`${(componentToOpen.IconMapPinSearch) ? '#3b82f6' : '#000'}`}
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${(componentToOpen.IconMapPinSearch) && 'border-blue-500'
            }`}
          onClick={() => ToggleComponents('IconMapPinSearch')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Way Finding Form
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconRouteSquare
          color={`${(componentToOpen.WayFindingForm) ? '#3b82f6' : '#000'}`}
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${(componentToOpen.WayFindingForm) && 'border-blue-500'
            }`}
          onClick={() => ToggleComponents('WayFindingForm')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Way Finding Form
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconMapPins
          color={`${(componentToOpen.MultiDirectionRouting) ? '#3b82f6' : '#000'}`}
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${(componentToOpen.MultiDirectionRouting) && 'border-blue-500'
            }`}
          onClick={() => ToggleComponents('MultiDirectionRouting')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Multi Destination Path Finding
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconNavigationBolt
          color={`${(componentToOpen.LiveNavigation) ? '#3b82f6' : '#000'}`}
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${(componentToOpen.LiveNavigation) && 'border-blue-500'
            }`}
          onClick={() => ToggleComponents('LiveNavigation')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Live Navigation Example
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconMapCode
          color={`${(componentToOpen.SpaceLabeling) ? '#3b82f6' : '#000'}`}
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${(componentToOpen.SpaceLabeling) && 'border-blue-500'
            }`}
          onClick={() => ToggleComponents('SpaceLabeling')}
        />
        <span className="absolute min-w-[150px] rounded-xl p-2 ml-10 bg-white left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add Labels To Map
        </span>
      </div>
      <div className="group relative flex items-center space-x-2">
        <IconMapPin
          color={`${(componentToOpen.MarkerOnClick) ? '#3b82f6' : '#000'}`}
          size={30}
          className={`border-[1.5px] p-1 rounded-lg cursor-pointer ${(componentToOpen.MarkerOnClick) && 'border-blue-500'
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
