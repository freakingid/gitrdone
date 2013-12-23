// Local client-only collection for error message management
Errors = new Meteor.Collection(null);

throwError = function(message) {
  Errors.insert({message: message, seen: false})
}

clearErrors = function() {
  Errors.remove({seen: true});
}
