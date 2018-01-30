import { later } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  loadingSlider: service(),

  beforeModel: function() {
    this.get('loadingSlider').changeAttrs({
      color: 'orange',
      expanding: false
    });
  },
  model: function() {
    return new EmberPromise(function(resolve) {
      later(function() {
        resolve();
      }, 500);
    });
  }
});
