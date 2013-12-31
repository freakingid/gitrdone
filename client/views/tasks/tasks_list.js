// TRUE if current limit == total tasks fetchable
// this.tasks.count() may work soon, but buggy right now so fetch().length instead
Template.tasksList.helpers({
  tasksWithRank: function() {
    this.tasks.rewind();
    return this.tasks.map(function(task, index, cursor) {
      task._rank = index;
      return task;
    });
  },
  hasMoreTasks: function(){
    this.tasks.rewind();
    return Router.current().limit() == this.tasks.fetch().length;
  }
});
