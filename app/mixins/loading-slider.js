import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    loading: function() {
      var controller = this.controllerFor('application');
      controller.set('loading', true);
      if( this.router ){
        this.router.one('didTransition', function() {
          controller.set('loading', false);
        }); 
      }
    },
    finished: function() {
      this.controllerFor('application').set('loading', false);
    }
  }
});
