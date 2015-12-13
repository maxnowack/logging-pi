const speedTest = Meteor.npmRequire('speedtest-net');

measureSpeed = new Measurement(() => {
  let test = speedTest({maxTime: 5000})
  test.on('data', Meteor.bindEnvironment((data) => {
    libratoLogger.log('speedtest.download', data.speeds.download)
    libratoLogger.log('speedtest.upload', data.speeds.upload)
    libratoLogger.log('speedtest.ping', data.server.ping)
    libratoLogger.log('speedtest.online', 1)
  }))
  test.on('error', Meteor.bindEnvironment((err) => {
    libratoLogger.log('speedtest.download', 0)
    libratoLogger.log('speedtest.upload', 0)
    libratoLogger.log('speedtest.online', 0)
  }))
})
measureSpeed.start()
