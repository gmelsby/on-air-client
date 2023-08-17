import { useEffect } from 'react';
import { LightCategory } from '../LightCategory';

// map from LightCategory to css background color class
const backgroundColorMap = new Map([
  [LightCategory.Off, 'gray-background'],
  [LightCategory.OnAir, 'red-background'],
  [LightCategory.OnCamera, 'blue-background'],
  [LightCategory.Offline, 'black-background'],
]);

export default function BackgroundColorChanger({
  lightState,
}: {
  lightState: LightCategory | undefined;
}) {
  // every time lightState changes, change the class of the body element
  useEffect(() => {
    const newBackground = backgroundColorMap.get(lightState as LightCategory);
    if (newBackground !== undefined) {
      document.body.className = newBackground;
    }
  }, [lightState]);

  return <></>;
}
