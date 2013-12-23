Template.taskSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var task = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    }

    // method name; parameters; callback upon finish
    Meteor.call('task', task, function(error, id) {
      if (error) {
        // display error
        throwError(error.reason);
        if (error.error === 302)
          Router.go('taskPage', {_id: error.details})
      } else {
        Router.go('taskPage', {_id: id});
      }
    });
  }
});
