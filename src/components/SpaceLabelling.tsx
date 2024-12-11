import { useEffect } from 'react';
import {Label, useMap } from '@mappedin/react-sdk';
import { useLabels } from '../context/Context'; 

const SpaceLabeling: React.FC = () => {
  const { mapData } = useMap();
  const {setLabels } = useLabels();

  useEffect(() => {
    if (mapData) {
      const spaces = mapData.getByType('space');
      const names = spaces.map((space) => space.name);
      setLabels(names);
    }
  }, [mapData, setLabels]); 

  return ( <>
    {mapData
      .getByType('space')
      .map((space) => (
        <Label key={space.id} target={space.center} text={space.name} />
      ))}
  </>);
};

export default SpaceLabeling;
