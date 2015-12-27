var config = require('./config');
var request = require('request');
var moment = require('moment');
var cache = [];

module.exports = function(id, value, time) {
  var data = {gauges: {}};
  data.gauges[id] = {
    value: value,
    measure_time: Math.floor(time.getTime() / 1000)
  };
  request.post('https://' + config.libratoEmail + ':' + config.libratoKey + '@metrics-api.librato.com/v1/metrics', {json: data}, function (error, response, body) {
    if(error) console.error(error);
  });
  console.log('[' + moment(time).format('DD.MM.YYYY HH:mm:ss') + '] ' + id + ': ' + value.toFixed(2));
}
