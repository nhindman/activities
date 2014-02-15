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

    activitiesListView.collection.create({
      description: $('#new_activity_input').val()
    })

    console.log(activitiesListView.collection)
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
  url: "/activities"
})

var ActivityView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.model.attributes.description);
    return this
  }
})

var ActivitiesListView = Backbone.View.extend ({
  initialize: function(){
      this.collection = new ActivitiesList();
      this.activityViews = []

      this.listenTo(this.collection, "all", this.render)
  },

  el: function(){
    return $('#activity_list')
  },

  render: function(){
    var self = this;
    _.each(this.activityViews, function(view){
      view.remove();
    })
    this.activityViews = [] //there's a cleaner way to do this
    _.each(this.collection.models, function(activity){
      var new_view = new ActivityView({ 
        model: activity
       });
      self.activityViews.push(new_view)
      self.$el.append(new_view.render().$el)

    })
  }
})


$(function (){
  window.activitiesListView = new ActivitiesListView();

  window.formView = new FormView();

  window.activity = new Activity();

  var activityView = new ActivityView({model: activity});

})