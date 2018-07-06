import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  loadingSlider: service(),

  actions: {
    loading() {
      let loadingSliderService = this.get('loadingSlider');
      loadingSliderService.startLoading();
      if (isPresent(this._router)) {
        this._router.one('didTransition', function() {
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
