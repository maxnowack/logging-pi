const sensorLib = Meteor.npmRequire('node-dht-sensor');
const sensor = sensorLib.initialize(22, Meteor.settings.DHT22PIN);
if(!sensor) {
  console.error('failed to init sensor')
}

measureTemperature = new Measurement(() => { 
  let values = sensorLib.read()
  libratoLogger.log('home.humidity', values.humidity)
  libratoLogger.log('home.temperature', values.temperature)
}, 30000)
Meteor.startup(function() {
  Meteor.setTimeout(function() {
    measureTemperature.start()
  }, 5000)
})