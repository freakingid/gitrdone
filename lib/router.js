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
  this.route('taskEdit', {
    path: '/tasks/:_id/edit',
    data: function() { return Tasks.findOne(this.params._id); }
  });
  this.route('taskSubmit', {
    path: '/submit'
  });
});
// only show post submit form to logged in users
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    this.stop();
  }
}
// Router hooks
// allow access to task submit only for logged in users
Router.before(requireLogin, {only: 'taskSubmit'});
// clear seen errors before going to another page
Router.before(function() { clearErrors() });
