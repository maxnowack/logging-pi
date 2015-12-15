const cacheCollection = new Mongo.Collection('sendcache')
const latestCollection = new Mongo.Collection('latest')
SyncedCron.start()

LibratoLogger = class LibratoLogger {
  constructor(email, key) {
    self = this
    self._auth = email + ':' + key;

    SyncedCron.add({
      name: 'LibratoLogger',
      schedule: (parser) => {
        return parser.text('every 1 mins');
      },
      job: () => {
        self.sendItems()
      }
    });
    self.sendItems();
  }

  sendItems() {
    self = this
    cacheCollection.find({sentAt: {$exists: false}}).forEach((item) => {
      let json = {gauges: {}}
      json.gauges[item.name] = {
        value: item.value,
        measure_time: Math.floor(item.time.getTime() / 1000)
      }

      HTTP.post('https://metrics-api.librato.com/v1/metrics', {
        auth: self._auth,
        data: json,
      }, (error, response) => {
        if(error) return console.log(response.statusCode, error);
        cacheCollection.update(item._id, {$set: {sentAt: new Date()}})
      })
    })
  }

  log(name, value, time) {
    time = time || new Date();
    if(!_.isNumber(value)) value = 0;
    value = value || 0;
    console.log('logging ' + name + ': ' + value);
    cacheCollection.insert({name, value, time});
    latestCollection.upsert({name}, {$set: {name, value, time}});
  }
}

LibratoLogger._latest = latestCollection
