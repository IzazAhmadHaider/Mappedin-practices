import { Label, useMap } from '@mappedin/react-sdk';

const SpaceLabeling: React.FC = () => {
  const { mapData } = useMap();

  return (
    <>
      {mapData
        .getByType('space')
        .map((space) => (
          <Label key={space.id} target={space.center} text={space.name} />
        ))}
    </>
  );
};

export default SpaceLabeling;
