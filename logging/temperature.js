var sensorLib = require('node-dht-sensor');
var config = require('../config');
var sensor = sensorLib.initialize(22, config.dhtPin);

if(!sensor) {
  console.error('failed to init sensor')
}

module.exports = function(callback) {
  var values = sensorLib.read();
  callback('home.humidity', values.humidity, new Date);
  callback('home.temperature', values.temperature, new Date);
};
