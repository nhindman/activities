var FormView = Backbone.View.extend({
  initialize: function() {
    this.render();
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


var EditorFormView = Backbone.View.extend({
  initialize: function(){
    $(".save_outing_button").on("click", this.bundleOuting)
    this.render();
  },

  render: function(){
    var self = this;
    this.stagingList = []
  },

  // events: {
  //   "click .save_outing_button": "bundleOuting"
  // },

  bundleOuting: function(e){
    e.preventDefault();
    var new_outing = new Outing();
    outingList.create({
      name: new_outing.attributes.name
      })
    _.each(editorFormView.stagingList, function(activity){
      console.log(activity.attributes.description);
      bundlingCollection.create({
        outing_id: new_outing.id,
        activity_id: activity.id
      })
    })
  }





})


var Bundling = Backbone.Model.extend({

})

BundlingCollection = Backbone.Collection.extend({
  model: Bundling,
  url: "/bundlings"
})


var Outing = Backbone.Model.extend({
  defaults: {
    name: "Date"
  }
})

var OutingList = Backbone.Collection.extend({
  model: Outing,
  url: "/outings"
})


var OutingView = Backbone.View.extend({
  initialize: function(){
    this.render()
  },
  template: function(){

  },
  render: function(){

  }
})

var OutingListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new OutingList();
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
    "click .description_line": "enterEdit",
    "click .add_to_outing_button": "addToOutingEditor"
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
  enterEdit: function(model){
    var activityView = this
    // this.$('.edit_form').show()
    var html_string = $('#edit_form_template').html();
    var template_func = _.template(html_string)
    this.$el.html(template_func(this.model.attributes))
    // this.$el.append(_.template($('#edit_form_template').html())(this.model.attributes))
  
    this.$('.update_button').on("click", function(e){
      e.preventDefault();

      // updates attributes of model
      activityView.model.set({
        "description": activityView.$('.edit_input').val(),
      })

      // makes ajax call to server to "save" changes
      activityView.model.save({}, {
        url: "/activities/"+activityView.model.id
      })

      // unbinds this "update" callback from the button
      $(this).off("click");
    })

  },
  addToOutingEditor: function(){
    console.log(this.model.attributes.description)

    var html_string = $('#outing_editor_item_template').html();
    var template_func = _.template(html_string)
    $('#editor').append(template_func(this.model.attributes))
    editorFormView.stagingList.push(this.model)
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
      self.$el.prepend(new_view.render().$el) //this might be why it's going to the top when you reload page

    })
  }
})


$(function (){
  window.activitiesListView = new ActivitiesListView();
  window.outingListView = new OutingListView();
  window.outingList = new OutingList();
  window.bundlingCollection = new BundlingCollection();

  window.formView = new FormView();
  window.editorFormView = new EditorFormView();

  window.activity = new Activity();

  var activityView = new ActivityView({model: activity});

})