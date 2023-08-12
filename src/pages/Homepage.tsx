// maps LightCategory to display string
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
      <button onClick={() => updateState(LightCategory.Off)}>
        Off
      </button>
      <button onClick={() => updateState(LightCategory.OnAir)}>
        On Air
      </button>
      <button onClick={() => updateState(LightCategory.OnCamera)}>
        On Camera
      </button>
    </div>
  </div>
  );
}