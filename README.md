# MMM-MQTTScreenOnOff

## Description
The `MMM-MQTTScreenOnOff` module is a MagicMirror² module that allows you to control the screen on/off state using MQTT messages.

## Installation
1. Navigate to your MagicMirror's `modules` directory and clone the repository:
    ```bash
    git clone https://github.com/olexs/MMM-MQTTScreenOnOff.git
    ```
2. Install the required dependencies by navigating into the module's directory and running the following command:
    ```bash
    cd MMM-MQTTScreenOnOff
    npm install
    ```

## Configuration
To use the `MMM-MQTTScreenOnOff` module, you need to add the following configuration to the `config/config.js` file of your MagicMirror:

```js
{
    module: 'MMM-MQTTScreenOnOff',
    config: {
        // MQTT server data
        mqttServer: "mqtt://localhost",
        mqttPort: 1883,
        mqttUsername: "",
        mqttPassword: "",
        // MQTT topic to listen to
        mqttTopic: "zigbee2mqtt/Motion Sensor",
        // If the topic payload is a JSON object, specify the field that contains the occupancy boolean. If this is not set, the entire payload is treated as a boolean.
        mqttPayloadOccupancyField: "occupancy",
        // Commands to run to turn the screen on and off
        screenOnCommand: "DISPLAY=:0.0 xrandr --output HDMI-1 --auto",
        screenOffCommand: "DISPLAY=:0.0 xrandr --output HDMI-1 --off",
        // Whether to turn the screen off on startup
        defaultOffOnStartup: true,
        // Whether to broadcast USER_PRESENCE notification to other modules when the screen is turned on and off (boolean payload)
        broadcastUserPresence: false,
    }
}
```

All values are optional, defaults are shown above.
