import Ember from 'ember';

const { Mixin, inject, isPresent } = Ember;

export default Mixin.create({
  loadingSlider: inject.service(),

  actions: {
    loading() {
      let loadingSliderService = this.get('loadingSlider');
      loadingSliderService.startLoading();
      if (isPresent(this.router)) {
        this.router.one('didTransition', function() {
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
