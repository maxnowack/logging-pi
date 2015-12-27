var speedtest = require('speedtest-net');

module.exports = function(callback) {
  var test = speedtest({maxTime: 5000});
  var time = new Date;
  test.on('data', function(data) {
    callback('speedtest.download', data.speeds.download, time);
    callback('speedtest.upload', data.speeds.upload, time);
    callback('speedtest.ping', data.server.ping, time);
    callback('speedtest.online', 1, time);
  });
}
