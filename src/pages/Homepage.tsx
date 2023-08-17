// maps LightCategory to display string
import { useCallback } from 'react';
import { LightCategory } from '../LightCategory';
import useBackgroundColorChanger from '../hooks/useBackgroundColorChanger';

// map from LightCategory to text representation
const displayMap = new Map([
  [LightCategory.Off, 'Off'],
  [LightCategory.OnAir, 'On Air'],
  [LightCategory.OnCamera, 'On Camera'],
  [LightCategory.Offline, 'Offline'],
]);

export default function HomePage({
  lightState,
  updateState,
  isConnected,
}: {
  lightState: LightCategory | undefined;
  updateState: (newState: LightCategory) => void;
  isConnected: boolean;
}) {
  // automatically update background color when prop value changes
  useBackgroundColorChanger(lightState);
  // function to push new state to MQTT server
  const attemptUpdate = useCallback(
    (newState: LightCategory) => {
      if (lightState === LightCategory.Offline) {
        console.log('unwilling to update an offline light');
        return;
      }
      if (newState === lightState) {
        console.log('light is already in the requested state');
      }
      updateState(newState);
    },
    [updateState, lightState],
  );

  return (
    <>
      <div className="flex flex-col justify-around align-middle">
        <div
          className={`text-center${
            lightState === 'offline' || !isConnected ? '' : ' pt-36'
          }`}
        >
          <h1 className="text-6xl text-white font-bold text-stroke">
            {lightState === undefined || !isConnected
              ? 'Attempting to connect...'
              : displayMap.get(lightState)}
          </h1>
        </div>
        {isConnected && lightState !== 'offline' && (
          <div className="flex flex-col md:flex-row justify-center">
            {lightState !== 'off' && (
              <button
                className="btn bg-gray-600 m-2 text-stroke text-xl
            shadow-inner shadow-gray-300
            hover:bg-gray-800"
                onClick={() => attemptUpdate(LightCategory.Off)}
              >
                Off
              </button>
            )}
            {lightState !== 'on-air' && (
              <button
                className="btn bg-red-600 m-2 text-stroke text-xl
            shadow-inner shadow-red-300
            hover:bg-red-800"
                onClick={() => attemptUpdate(LightCategory.OnAir)}
              >
                On Air
              </button>
            )}
            {lightState !== 'on-camera' && (
              <button
                className="btn bg-blue-600 m-2 text-stroke text-xl
            shadow-inner shadow-blue-300
            hover:bg-blue-800"
                onClick={() => attemptUpdate(LightCategory.OnCamera)}
              >
                On Camera
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
