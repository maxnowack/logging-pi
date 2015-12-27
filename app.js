var librato = require('./librato');
var speedtest = require('./logging/speedtest');

var startLogging = function(fn, interval) {
  setInterval(function(){
    try {
      fn()
    } catch(error) {
      console.error(error);
    }
  }, interval);
}

startLogging(function(){
  speedtest(function(id, value, time){
    librato(id, value, time);
  });
}, 1000 * 60 * 2)
