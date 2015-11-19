import Ember from 'ember';
import LoadingSliderMixin from '../mixins/loading-slider';

export default Ember.Route.extend(LoadingSliderMixin, {
  model: function(params, transition) {
    if ( ! Ember.testing) {
      Ember.run.later(this, function() {
        transition.send('showMultiExpandingAnimation');
      }, 100);
    }
  },
  actions: {
    // for testing. Controllers should use this.send('loading') instead.
    showAnimation: function() {
      this.controllerFor('application').setProperties({
        expanding: false,
        color: false,
        speed: 1000
      });

      this.send('loading');
      Ember.run.later(this, function() {
        this.send('finished');
      }, 1000);
    },
    showMultiExpandingAnimation: function() {
      this.controllerFor('application').setProperties({
        expanding: true,
        color: ['#fcb851', '#e64053', '#55bcb6', '#77edb2'],
        speed: 750
      });

      this.send('loading');
      Ember.run.later(this, function() {
        this.send('finished');
      }, 5000);
    },
    showExpandingAnimation: function() {
      this.send('loading');
      this.controllerFor('application').setProperties({
        expanding: true,
        color: false
      });
      Ember.run.later(this, function() {
        this.send('finished');
      }, 1000);
    }
  }
});
