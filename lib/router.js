Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('tasks'); }
});

Router.map(function() {
  this.route('tasksList', {path: '/'});
  this.route('taskPage', {
    path: '/tasks/:_id',
    data: function() { return Tasks.findOne(this.params._id); }
  });
});