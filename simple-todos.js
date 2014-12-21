Tasksdbpoint = new Mongo.Collection("tasksdb");

if (Meteor.isClient) 
{
  // This code only runs on the client
  Template.body.helpers(
  {
    tasks: function() 
    {
       return Tasksdbpoint.find({}, {sort: {createdAt: -1}});
    }
   });
  Template.body.events({
   "submit .new-task": function (event) {
     // This function is called when the new task form is submitted
     console.log(event)
     var textvar = event.target.textspot.value;

     Tasksdbpoint.insert({
       textdb: textvar,
       createdAt: new Date() //current time
     });


     // Clear form
     event.target.textspot.value = "";

     // Prevent default form submit
     return false;
     }

  });
  Template.task.events({
   "click .toggle-checked": function () {
   //Set the checked property to the opposite of its current value
   Tasksdbpoint.update(this._id, {$set: {checkedvar: ! this.checkedvar}});
    },
    "click .delete": function () {
       Tasksdbpoint.remove(this._id);
    }
  });
}

