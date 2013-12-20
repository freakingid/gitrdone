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
      if (error)
        return alert(error.reason);

      Router.go('taskPage', {_id: id});
  });
}
});