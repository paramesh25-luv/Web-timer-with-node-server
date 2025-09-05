const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mqtt = require('mqtt');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const MQTT_URL = process.env.MQTT_URL || '';
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'home/timers';
let mqttClient = null;
if (MQTT_URL) {
  mqttClient = mqtt.connect(MQTT_URL);
  mqttClient.on('connect', () => console.log('Connected to MQTT', MQTT_URL));
  mqttClient.on('error', (err) => console.error('MQTT error', err));
}

app.post('/trigger', (req, res) => {
  console.log('Received trigger', req.body);
  // Here you can translate payload to a command for NodeMCU / Arduino IoT Cloud
  // Example: publish to MQTT
  const payload = JSON.stringify(req.body);
  if (mqttClient && mqttClient.connected) {
    mqttClient.publish(MQTT_TOPIC, payload, { qos: 0 }, (err) => {
      if (err) console.error('publish error', err);
      else console.log('Published to', MQTT_TOPIC);
    });
  }
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log('Server listening on', PORT);
  // Automatically open the browser to the app
  try {
    const open = (await import('open')).default;
    open(`http://localhost:${PORT}`);
  } catch (e) {
    console.error('Could not open browser:', e);
  }
});