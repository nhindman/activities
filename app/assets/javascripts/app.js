var FormView = Backbone.View.extend({
  initialize: function() {
    this.render() 
  },

  render: function() {

  },

  events: {
    "click .add_button": "addCallback"
  },

  addCallback: function(e){
    e.preventDefault();

    activitiesList.add({
      description: $('#new_activity_input').val()
    })
    console.log(activitiesList)
  },

  el: function() {
    return $('#new_activity_form')
  }

})

var Activity = Backbone.Model.extend({

  defaults: {
    description: "no description yet"
  }



})

var ActivitiesList = Backbone.Collection.extend({

model: Activity,  

// url: "/activities"

})

var ActivityView = Backbone.View.extend({

})

var ActivitiesListView = Backbone.View.extend ({

})


$(function (){
  window.activitiesList = new ActivitiesList();

  window.formView = new FormView();

})