import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  loadingSlider: service(),

  beforeModel: function() {
    this.get('loadingSlider').changeAttrs({
      color: false,
      expanding: false
    });
  },
  model: function() {
    return new Promise(function(resolve) {
      later(function() {
        resolve();
      }, 75);
    });
  }
});
