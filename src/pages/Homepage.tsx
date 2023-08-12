// maps LightCategory to display string
import { useCallback } from 'react';
import { LightCategory } from '../LightCategory';

const displayMap = new Map([
  [LightCategory.Off, 'Off'],
  [LightCategory.OnAir, 'On Air'],
  [LightCategory.OnCamera, 'On Camera'],
  [LightCategory.Offline, 'Offline']
]);


export default function HomePage({lightState, updateState, isConnected}:
  {
    lightState: LightCategory | undefined,
    updateState: (newState: LightCategory) => void,
    isConnected: boolean,
  }) {

  const attemptUpdate = useCallback((newState: LightCategory) => {
    if (lightState === LightCategory.Offline) {
      console.log('unwilling to update an offline light');
      return;
    }
    if (newState === lightState) {
      console.log('light is already in the requested state');
    }
    updateState(newState);
  }, [updateState, lightState])

  return (
  <div >
    <div>
      <h1>{lightState === undefined ? 
        'Loading' : 
        displayMap.get(lightState)}
      </h1>
      <h2>
        Connection State: {isConnected ? 'Connected' : 'Not Connected'}
      </h2>
    </div>
    <div>
      <button onClick={() => attemptUpdate(LightCategory.Off)}>
        Off
      </button>
      <button onClick={() => attemptUpdate(LightCategory.OnAir)}>
        On Air
      </button>
      <button onClick={() => attemptUpdate(LightCategory.OnCamera)}>
        On Camera
      </button>
    </div>
  </div>
  );
}