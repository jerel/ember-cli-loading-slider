import Ember from 'ember';

export default Ember.Route.extend({
  loadingSlider: Ember.inject.service(),

  beforeModel: function() {
    this.get('loadingSlider').changeAttrs({
      color: false,
      expanding: false
    });
  },
  model: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(function() {
        resolve();
      }, 75);
    });
  }
});
