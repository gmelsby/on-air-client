import { useEffect, useState } from "react";
import { LightCategory } from "../LightCategory";

const backgroundColorMap = new Map([
  [LightCategory.Off, 'grey'],
  [LightCategory.OnAir, 'red'],
  [LightCategory.OnCamera, 'blue'],
  [LightCategory.Offline, 'black']
]);



export default function GrowingCircle({ lightState }:
  {lightState: LightCategory | undefined}) 
  {

  // to cancel rendering circle after growth
  const [growing, setGrowing] = useState(false);

  useEffect(() => {
    setGrowing(true);
    // update background color after timeout
    const timeout = setTimeout(() => {
      const newBackground = backgroundColorMap.get(lightState as LightCategory);
      if (newBackground !== undefined) {
        document.body.style.background = newBackground;
      }
      setGrowing(false);
    }, 1000);

    // clear out timeout on componenent unmount
    return () => {
      clearTimeout(timeout);
      setGrowing(false);
    }
    
  }, [lightState]);

  if (!growing) {
    return <></>;
  }

  const circleColor = backgroundColorMap.get(lightState as LightCategory);
  return <div className="growing-circle growing" style={{background: circleColor}}></div>;
}