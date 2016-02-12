import Ember from 'ember';

const { Service, Evented } = Ember;

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
