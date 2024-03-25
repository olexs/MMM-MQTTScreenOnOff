const NodeHelper = require("node_helper");
const exec = require("child_process").exec;
const mqtt = require("mqtt");

module.exports = NodeHelper.create({

    start: function () {
        console.log("Starting node_helper for MMM-MQTTScreenOnOff");
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "SCREEN_ON") {
            this.turnScreenOn();
        } else if (notification === "SCREEN_OFF") {
            this.turnScreenOff();
        } else if (notification === "CONFIG") {
            console.log("Received config");
            this.config = payload;
            this.connectToMQTTServer();
        }
    },

    connectToMQTTServer: function () {
        const { mqttServer, mqttPort, mqttUsername, mqttPassword } = this.config;
        const mqttOptions = {
            username: mqttUsername,
            password: mqttPassword,
        };

        console.log(`Connecting to MQTT server ${mqttServer}:${mqttPort}`);
        this.client = mqtt.connect(mqttServer, mqttOptions);

        this.client.on("connect", () => {
            console.log("Connected to MQTT server");
            this.subscribeToTopic();
        });

        this.client.on("message", (topic, message) => {
            const payload = message.toString();
            console.log(`Received message on topic ${topic}: ${payload}`);
            this.handlePayload(payload);
        });

        if (this.config.defaultOffOnStartup) {
            console.log("Turning screen off on startup");
            this.turnScreenOff();
        }
    },

    subscribeToTopic: function () {
        const { mqttTopic } = this.config;
        this.client.subscribe(mqttTopic, (err) => {
            if (err) {
                console.error(`Failed to subscribe to topic ${mqttTopic}: ${err}`);
            } else {
                console.log(`Subscribed to topic ${mqttTopic}`);
            }
        });
    },

    handlePayload: function (payload) {
        const { mqttTopic, mqttPayloadOccupancyField } = this.config;
        const payloadJson = JSON.parse(payload);
        const occupancy = mqttPayloadOccupancyField ? payloadJson[mqttPayloadOccupancyField] : payloadJson;

        if (occupancy === true) {
            console.log(`Motion detected on topic ${mqttTopic}`);
            this.turnScreenOn();
        } else if (occupancy === false) {
            console.log(`No motion detected on topic ${mqttTopic}`);
            this.turnScreenOff();
        } else {
            console.warn(`Invalid payload received on topic ${mqttTopic}: ${payload} (occupancy field: ${mqttPayloadOccupancyField})`);
        }
    },

    turnScreenOn: function () {
        console.log("Turning screen on");

        const { screenOnCommand } = this.config;
        exec(screenOnCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error turning screen on: ${error}`);
            } else {
                console.log(`Screen turned on: ${stdout}`);
            }
        });
    },

    turnScreenOff: function () {
        console.log("Turning screen off");

        const { screenOffCommand } = this.config;
        exec(screenOffCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error turning screen off: ${error}`);
            } else {
                console.log(`Screen turned off: ${stdout}`);
            }
        });
    },
});
