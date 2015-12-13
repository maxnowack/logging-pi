Latest = new Mongo.Collection('latest');

Template.Index.helpers({
  data: () => {
    return Latest.find()
  }
})

Template.Index.onCreated(function() {
  this.subscribe('latest');
});
