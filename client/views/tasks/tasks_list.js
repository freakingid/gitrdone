Template.tasksList.helpers({
  tasks: function() {
    return Tasks.find({}, {sort: {submitted: -1}});
  }
});