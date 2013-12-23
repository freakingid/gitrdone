Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createCommentNotification = function(comment) {
  var task = Tasks.findOne(comment.taskId);
  if (comment.userId !== task.userId) {
    Notifications.insert({
      userId: task.userId,
      taskId: task._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};
