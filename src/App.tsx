import { useCallback, useEffect, useState } from 'react'
import './App.css'

const lightAddress = import.meta.env.VITE_LIGHT_ADDRESS;

// category of light status
enum LightCategory {
  Off = 'off',
  OnAir = 'on-air',
  OnCamera = 'on-camera'
}

// maps LightCategory to display string
const displayMap = new Map([
  [LightCategory.Off, 'Off'],
  [LightCategory.OnAir, 'On Air'],
  [LightCategory.OnCamera, 'On Camera']
]);

export default function App() {
  const [lightState, setLightState] = useState<LightCategory | undefined>(undefined);

  // fetch state upon page load
  useEffect(() => {
    fetch(lightAddress)
      .then(async response => {
        if (!response.ok) {
          throw new Error('issue fetching state');
        }
        const responseBody = await response.json();
        setLightState(responseBody.state)
      })
      .catch(error => {
        console.error(error);
        return;
      });
  }, [setLightState])

  // update state on microcontroller
  const updateState = useCallback((newState: LightCategory) => {
    fetch(lightAddress, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({state: newState})
    })
    .then(async response => {
      if (!response.ok) {
        throw new Error('issue updating state');
      }
      const responseBody = await response.json();
      setLightState(responseBody.state)
    })
    .catch(error => {
      console.log(error);
    })
  }, [setLightState])

  return (
    <div >
      <div>
        <h1>{lightState === undefined ? 
          'Loading' : 
          displayMap.get(lightState)}
        </h1>
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