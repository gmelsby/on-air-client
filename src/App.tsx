import { useCallback, useEffect, useState } from 'react';
import './App.css';
import mqtt from 'paho-mqtt';
import HomePage from './pages/Homepage';
import { LightCategory } from './LightCategory';

// get env variables
const broker = import.meta.env.VITE_BROKER_ADDRESS;
const brokerPort = parseInt(import.meta.env.VITE_BROKER_PORT);
const username = import.meta.env.VITE_MQTT_USER;
const pass = import.meta.env.VITE_MQTT_PASS;

export default function App() {
  const [lightState, setLightState] = useState<LightCategory | undefined>(undefined);
  // keeps track of mqtt client
  const [client, setClient] = useState<mqtt.Client | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create a MQTT client instance using WebSocket
    const mqttClient = new mqtt.Client(broker, brokerPort, `pahojs_${Math.random().toString(36).substring(7)}`);
    setClient(mqttClient);
    console.log('created mqttClient');

    // Handle connection
    const onConnect = () => {
      console.log('Connected to MQTT broker via WebSocket');
      setIsConnected(true);
      // Subscribe to a topic
      mqttClient.subscribe('light/status');
    };

    // Handle incoming messages
    mqttClient.onMessageArrived = (message => {
      console.log(`Received message ${message.payloadString}`);
      if (message.destinationName == 'light/status') {
        const newState = message.payloadString;
        if (Object.values(LightCategory).includes(newState as LightCategory)) {
          setLightState(newState as LightCategory);
        }
      }
  });

    // handle lost connections
    mqttClient.onConnectionLost = (error => {
      console.log(`Connection lost: ${error.errorCode}: ${error.errorMessage}`);
      setIsConnected(false);
    });

    mqttClient.connect({onSuccess: onConnect, 
      onFailure: () => {console.log('failed to connect')},
      reconnect: true,
      timeout: 5,
      userName: username,
      password: pass,
      useSSL: true
    })

    // Cleanup on unmount
    return () => {
      // Unsubscribe and disconnect
      if (mqttClient.isConnected()) {
        mqttClient.unsubscribe('light/status');
        mqttClient.disconnect();
      }
    };
  }, [setClient]);

  // send out an update
  const updateState = useCallback((newState: LightCategory) => {
    const message = new mqtt.Message(newState);
    message.destinationName = 'light/status';
    message.qos = 1;
    message.retained = true;
    if (client?.isConnected())
      client?.send(message);
  }, [client]);

  return (
    <HomePage {...{ lightState, updateState, isConnected }}/>
  );
}