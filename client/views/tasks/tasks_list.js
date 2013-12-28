// TRUE if current limit == total tasks fetchable
// this.tasks.count() may work soon, but buggy right now so fetch().length instead
Template.tasksList.helpers({
  hasMoreTasks: function(){
    this.tasks.rewind();
    return Router.current().limit() == this.tasks.fetch().length;
  }
});
