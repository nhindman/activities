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
    });

    console.log(activitiesListView.collection)
    this.resetValues();
  },

  resetValues: function() {
    _.each( this.$('input'), function(input){
      $(input).val('');
    })
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
    // this.$('.edit_form').hide();

  },
  events: {
    "click .delete": "deleteActivity",
    "click .edit": "enterEdit",
    "click .update_button": "exitEdit"
  },
  template: function(attrs){
    html_string = $('#activity_template').html();
    var template_func = _.template(html_string)
    return template_func(attrs)
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this
  },
  deleteActivity: function(){
    console.log("attempting to delete")
    this.model.destroy()
  },
  enterEdit: function(e){
    // this.$('.edit_form').show()
    var html_string = $('#edit_form_template').html();
    var template_func = _.template(html_string)
    this.$el.html(template_func(this.model.attributes))
    // this.$el.append(_.template($('#edit_form_template').html())(this.model.attributes))
  },
  exitEdit: function(model){
    // e.preventDefault();

    // updates attributes of model
    model.set({
      "description": this.$('.edit_input').val(),
    })

    // makes ajax call to server to "save" changes
    model.save({}, {
      url: "/activities/"+model.id
    })

    // unbinds this "update" callback from the button
    // $(this).off("click");

    console.log("did it update?")

  }
})

var ActivitiesListView = Backbone.View.extend ({
  initialize: function(){
      this.collection = new ActivitiesList();
      this.activityViews = []

      this.collection.fetch();
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
      self.$el.prepend(new_view.render().$el)

    })
  }
})


$(function (){
  window.activitiesListView = new ActivitiesListView();

  window.formView = new FormView();

  window.activity = new Activity();

  var activityView = new ActivityView({model: activity});

})