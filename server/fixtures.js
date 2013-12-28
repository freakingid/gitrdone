// Fixture data
if (Tasks.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var pkId = Meteor.users.insert({
    profile: { name: 'Paul Kaiser' }
  });
  var paul = Meteor.users.findOne(pkId);

  var leighId = Meteor.users.insert({
    profile: { name: 'Leigh Kaiser' }
  });
  var leigh = Meteor.users.findOne(leighId);

  var engine42Id = Tasks.insert({
    title: 'Introducing Engine42',
    userId: paul._id,
    author: paul.profile.name,
    url: 'http://engine42.info/',
    submitted: now - 7 * 3600 * 1000,
    commentsCount: 2
  });

  Comments.insert({
    taskId: engine42Id,
    userId: leigh._id,
    author: leigh.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Interesting project Paul, can I get involved?'
  });

  Comments.insert({
    taskId: engine42Id,
    userId: paul._id,
    author: paul.profile.name,
    submitted: now - 3 * 3600 * 1000,
    body: 'You sure can Leigh!'
  });

  Tasks.insert({
    title: 'GoodLearning',
    userId: leigh._id,
    author: leigh.profile.name,
    url: 'http://goodlearning.com',
    submitted: now - 10 * 3600 * 1000,
    commentsCount: 0
  });

  Tasks.insert({
    title: 'GoGo BotBot Game',
    userId: leigh._id,
    author: leigh.profile.name,
    url: 'http://gogobotbot.com',
    submitted: now - 12 * 3600 * 1000,
    commentsCount: 0
  });
  for (var i = 0; i < 10; i++) {
    Tasks.insert({
      title: 'Test task #' + i,
      author: paul.profile.name,
      userId: paul._id,
      url: 'http://goodlearning.com/?q=test-' + i,
      submitted: now - i * 3600 * 1000,
      commentsCount: 0
    });
  }
}
