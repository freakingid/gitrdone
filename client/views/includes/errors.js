// get all errors needing displayed
Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

// mark errors as seen after the error template is rendered
Template.error.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    Errors.update(error._id, {$set: {seen: true}});
  });
};
