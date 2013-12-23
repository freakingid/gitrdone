Template.taskPage.helpers({
  comments: function() {
    return Comments.find({taskId: this._id});
  }
});
