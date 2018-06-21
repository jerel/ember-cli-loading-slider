import Service from '@ember/service';
import Evented from '@ember/object/evented';

export default Service.extend(Evented, {
  startLoading() {
    this.trigger('startLoading');
  },

  endLoading() {
    this.trigger('endLoading');
  },

  changeAttrs(attrs) {
    this.trigger('changeAttrs', attrs);
  }
});
