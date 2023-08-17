// maps LightCategory to display string
import { useCallback } from 'react';
import { LightCategory } from '../LightCategory';
import BackgroundColorChanger from '../components/BackgroundColorChanger';

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
  <>
    <BackgroundColorChanger {...{lightState}} />
    <div className="flex flex-col justify-around align-middle">
      <div className="text-center pt-36">
        <h1 className="text-6xl text-white font-bold text-stroke">{lightState === undefined || ! isConnected ?
          'Attempting to connect...' : 
          displayMap.get(lightState)}
        </h1>
      </div>
      {isConnected && lightState !== 'offline' &&
        <div className='flex flex-col md:flex-row justify-center'>
          {lightState !== 'off' &&
            <button className="btn bg-gray-600 m-2 text-stroke"
              onClick={() => attemptUpdate(LightCategory.Off)}>
              Off
            </button>
          }
          {lightState !== 'on-air' &&
            <button className="btn bg-red-600 m-2 text-stroke"
              onClick={() => attemptUpdate(LightCategory.OnAir)}>
              On Air
            </button>
          }
          {lightState !== 'on-camera' &&
            <button className="btn bg-blue-600 m-2 text-stroke"
              onClick={() => attemptUpdate(LightCategory.OnCamera)}>
              On Camera
            </button>
          }
        </div>
      }
    </div>
  </>
  );
}