Module.register("MMM-MQTTScreenOnOff", {

    defaults: {
        mqttServer: "mqtt://localhost",
        mqttPort: 1883,
        mqttUsername: "",
        mqttPassword: "",
        mqttTopic: "zigbee2mqtt/Motion Sensor",
        mqttPayloadOccupancyField: "occupancy",
        screenOnCommand: "DISPLAY=:0.0 xrandr --output HDMI-1 --auto",
        screenOffCommand: "DISPLAY=:0.0 xrandr --output HDMI-1 --off",
        defaultOffOnStartup: true,
    },

    start: function () {
        console.log("Starting MMM-MQTTScreenOnOff module");
        
        this.sendSocketNotification("CONFIG", this.config);
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        return wrapper;
    },

});
