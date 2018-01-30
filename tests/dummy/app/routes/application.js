import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Ember from 'ember';
import LoadingSliderMixin from '../mixins/loading-slider';

export default Route.extend(LoadingSliderMixin, {
  loadingSlider: service(),

  model: function(params, transition) {
    if ( ! Ember.testing) {
      later(this, function() {
        transition.send('showMultiExpandingAnimation');
      }, 100);
    }
  },
  actions: {
    // for testing. Controllers should use this.send('loading') instead.
    showAnimation: function() {

      this.get('loadingSlider').changeAttrs({
        expanding: false,
        color: false,
        speed: 1000
      });

      this.send('loading');
      later(this, function() {
        this.send('finished');
      }, 1000);
    },
    showMultiExpandingAnimation: function() {
      this.get('loadingSlider').changeAttrs({
        expanding: true,
        color: ['#fcb851', '#e64053', '#55bcb6', '#77edb2'],
        speed: 750
      });

      this.send('loading');
      later(this, function() {
        this.send('finished');
      }, 5000);
    },
    showExpandingAnimation: function() {
      this.send('loading');
      this.get('loadingSlider').changeAttrs({
        expanding: true,
        color: false
      });
      later(this, function() {
        this.send('finished');
      }, 1000);
    }
  }
});
