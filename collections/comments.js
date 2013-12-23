Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var task = Tasks.findOne(commentAttributes.taskId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
    if (!task)
      throw new Meteor.Error(422, 'You must comment on a particular task');
    comment = _.extend(_.pick(commentAttributes, 'taskId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    // update task with number of comments
    Tasks.update(comment.taskId, {$inc: {commentsCount: 1}});
    // insert comment and return results
    return Comments.insert(comment);
  }
});
