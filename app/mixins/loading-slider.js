import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { getOwner }  from '@ember/application';

export default Mixin.create({
  loadingSlider: service(),

  actions: {
    loading() {
      let loadingSliderService = this.get('loadingSlider');
      loadingSliderService.startLoading();

      let routerService = getOwner(this).lookup('service:router');
      let router = routerService ? routerService._router : this._router;
      if (isPresent(router)) {
        router.one('didTransition', function() {
          loadingSliderService.endLoading();
        });
      }
      if (this.get('bubbleLoadingSlider')) {
        return true;
      }
    },

    finished() {
      this.get('loadingSlider').endLoading();
    }
  }
});
