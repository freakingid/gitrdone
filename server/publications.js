Meteor.publish('tasks', function(options) {
  return Tasks.find({}, options);
});
Meteor.publish('singleTask', function(id) {
  return id && Tasks.find(id);
});

Meteor.publish('comments', function(taskId) {
  return Comments.find({taskId: taskId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});
