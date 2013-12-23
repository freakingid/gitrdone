Template.taskEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentTaskId = this._id;

    var taskProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    Tasks.update(currentTaskId, {$set: taskProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('taskPage', {_id: currentTaskId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this task?")) {
      var currentTaskId = this._id;
      Tasks.remove(currentTaskId);
      Router.go('tasksList');
    }
  }
});
