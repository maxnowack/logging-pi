const speedTest = Meteor.npmRequire('speedtest-net');

let measureSpeed = function() {
  let test = speedTest({maxTime: 5000})
  let time = new Date
  test.on('data', Meteor.bindEnvironment((data) => {
    libratoLogger.log('speedtest.download', data.speeds.download, time)
    libratoLogger.log('speedtest.upload', data.speeds.upload, time)
    libratoLogger.log('speedtest.ping', data.server.ping, time)
    libratoLogger.log('speedtest.online', 1)
  }))
  test.on('error', Meteor.bindEnvironment((err) => {
    libratoLogger.log('speedtest.download', 0, time)
    libratoLogger.log('speedtest.upload', 0, time)
    libratoLogger.log('speedtest.online', 0, time)
  }))
}
Meteor.startup(function() {
  Meteor.defer(function() {
    Meteor.setInterval(measureSpeed, 60000)
  })
})
