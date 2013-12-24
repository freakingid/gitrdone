Meteor.publish('tasks', function() {
  return Tasks.find();
});

Meteor.publish('comments', function(taskId) {
  return Comments.find({taskId: taskId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});
