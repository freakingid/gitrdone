Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    // get all the anon arguments
    var args = Array.prototype.slice.call(arguments, 0);
    // remove "#" handlebars added
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current().route.name === name
    });

    return active && 'active';
  }
});
