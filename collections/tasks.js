Tasks = new Meteor.Collection('tasks');

// Allowing some client-side updates again
// Basically, allow update or remove IF ownsDocument resolves to TRUE
Tasks.allow({
  update: ownsDocument,
  remove: ownsDocument
});

// Deny editing some fields
Tasks.deny({
  update: function(userId, post, fieldNames) {
    // only edit the following fields
    // basically, if we remove url and title, and anything is left, then deny
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

// server-side methods
Meteor.methods({
  task: function(taskAttributes) {
    var user = Meteor.user(),
      taskWithSameLink = Tasks.findOne({url: taskAttributes.url});
    // make sure we're logged in
    if (!user)
      throw new Meteor.Error(401, 'You need to login to post new tasks');

    // make sure we have a title
    if (!taskAttributes.title)
      throw new Meteor.Error(422, 'Please fill in the title');

    // check for duplicate links
    if (taskAttributes.url && taskWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been added',
        taskWithSameLink._id);
    }

    // get only the keys we specifically know we want
    var task = _.extend(_.pick(taskAttributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0
    });

    var taskId = Tasks.insert(task);

    return taskId;
  }
});

/*
// Allow client-side inserts
Tasks.allow({
  insert: function(userId, doc) {
    // only allow if you are logged in, can be any valid user
    return !! userId;
  }
});
*/
