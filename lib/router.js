Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});

TasksListController = RouteController.extend({
  template: 'tasksList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.tasksLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('tasks', this.findOptions());
  },
  data: function() {
    return {
      tasks: Tasks.find({}, this.findOptions()),
      nextPath: this.nextPath()
    };
  }
});
// new list controllers
NewTasksListController = TasksListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newTasks.path({tasksLimit: this.limit() + this.increment})
  }
});

BestTasksListController = TasksListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestTasks.path({tasksLimit: this.limit() + this.increment})
  }
});


Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewTasksListController
  });
  this.route('newTasks', {
    path: '/new/:tasksLimit?',
    controller: NewTasksListController
  });
  this.route('bestTasks', {
    path: '/best/:tasksLimit?',
    controller: BestTasksListController
  });
  this.route('taskPage', {
    path: '/tasks/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleTask', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Tasks.findOne(this.params._id); }
  });
  this.route('taskEdit', {
    path: '/tasks/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('singleTask', this.params._id);
    },
    data: function() { return Tasks.findOne(this.params._id); }
  });
  this.route('taskSubmit', {
    path: '/submit',
    disableProgress: true
  });
  this.route('tasksList', {
    path: '/:tasksLimit?',
    controller: TasksListController
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
