import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['loading-slider'],
  stripeColor: function() {
    var color = this.get('color');
    if ( ! color) {
      return this.$('span').removeAttr('style');
    }
    this.$('span').css('background-color', color);
  }.observes('color'),
  manage: function() {
    if (this.get('isLoading')) {
      this.animate.call(this);
    } else {
      this.set('isLoaded', true);
    }
  }.observes('isLoading'),
  animate: function() {
    this.set('isLoaded', false);
    var self = this,
        elapsedTime = 0,
        inner = this.$().find('span'),
        duration = this.getWithDefault('duration', 300),
        innerWidth = 0,
        outerWidth = this.$().width(),
        stepWidth = Math.round(outerWidth / 100);

    var interval = window.setInterval(function() {
      elapsedTime = elapsedTime + 10;
      inner.width(innerWidth = innerWidth + stepWidth);

      // slow the animation if we used more than 75% the estimated duration
      // or 66% of the animation width
      if (elapsedTime > (duration * 0.75) || innerWidth > (outerWidth * 0.66)) {
        // don't stop the animation completely
        if (stepWidth > 1) {
          stepWidth = stepWidth * 0.97;
        }
      }

      if (innerWidth > outerWidth) {
        Ember.run.later(function() {
          inner.width(0);
          window.clearInterval(interval);
        }, 50);
      }

      // the activity has finished
      if (self.get('isLoaded')) {
        // start with a sizable pixel step
        if (stepWidth < 10) {
          stepWidth = 10;
        }
        // accelerate to completion
        stepWidth = stepWidth + stepWidth;
      }
    }, 10);
  },
  didInsertElement: function() {
    this.$().html('<span>');

    var color = this.get('color');
    if (color) {
      this.$('span').css('background-color', color);
    }
  }
});
