import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    loading: function() {
      var controller = this.controllerFor('application');
      controller.set('loading', true);
      this.router.one('didTransition', function() {
        controller.set('loading', false);
      });
    },
    finished: function() {
      this.controllerFor('application').set('loading', false);
    },

    // for testing. Controllers should use this.send('loading') instead.
    showAnimation: function() {
      this.send('loading');
      Ember.run.later(this, function() {
        this.send('finished');
      }, 1000);
    }
  }
});
