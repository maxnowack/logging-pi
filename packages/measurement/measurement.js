Measurement = class Measurement {
  constructor(valueFn, interval) {
    this.interval = interval || 60 * 1000;
    this.valueFn = valueFn;
  }

  start() {
    self = this
    this.stop()
    self.valueFn.call(self)
    this._interval = Meteor.setInterval(() => {
      self.valueFn.call(self)
    }, this.interval)
  }

  stop() {
    Meteor.clearInterval(this._interval)
  }
}
