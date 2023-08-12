import { useEffect, useState } from 'react'
import './App.css'

const lightAddress = import.meta.env.VITE_LIGHT_ADDRESS;

export default function App() {
  const [lightState, setLightState] = useState("Loading...")

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

  return (
    <div >
      <div>
        <h1>{lightState}</h1>
      </div>
      <div>
        <button>Off</button>
        <button>On Air</button>
        <button>On Camera</button>
      </div>
    </div>
  );
}