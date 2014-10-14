import Ember from 'ember';
import LoadingSliderMixin from '../mixins/loading-slider';

export default Ember.Route.extend(LoadingSliderMixin, {
  actions: {
    // for testing. Controllers should use this.send('loading') instead.
    showAnimation: function() {
      this.send('loading');
      Ember.run.later(this, function() {
        this.send('finished');
      }, 1000);
    }
  }
});
