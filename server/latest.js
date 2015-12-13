Meteor.publish('latest', () => {
  return LibratoLogger._latest.find()
})
