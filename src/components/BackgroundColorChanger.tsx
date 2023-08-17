import { useEffect } from "react";
import { LightCategory } from "../LightCategory";

const backgroundColorMap = new Map([
  [LightCategory.Off, 'gray-background'],
  [LightCategory.OnAir, 'red-background'],
  [LightCategory.OnCamera, 'blue-background'],
  [LightCategory.Offline, 'black-background']
]);



export default function GrowingCircle({ lightState }:
  {lightState: LightCategory | undefined}) 
  {

  useEffect(() => {
    const newBackground = backgroundColorMap.get(lightState as LightCategory);
    if (newBackground !== undefined) {
      document.body.className =  newBackground;
    }
  }, [lightState]);

  return <></>;
}