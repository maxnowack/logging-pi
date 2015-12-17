const sensorLib = Meteor.npmRequire('node-dht-sensor');
const sensor = sensorLib.initialize(22, Meteor.settings.DHT22PIN);
if(!sensor) {
  console.error('failed to init sensor')
}

let measureTemperature = function() { 
  let values = sensorLib.read()
  libratoLogger.log('home.humidity', values.humidity)
  libratoLogger.log('home.temperature', values.temperature)
}
Meteor.startup(function() {
  Meteor.setTimeout(function() {
    Meteor.setInterval(measureTemperature, 30000)
  }, 5000)
})
