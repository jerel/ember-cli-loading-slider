import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['loading-slider'],
  classNameBindings: 'expanding',
  manage: function() {
    if (this.get('isLoading')) {
      if (this.get('expanding')) {
        this.expandingAnimate.call(this);
      } else {
        this.animate.call(this);
      }
    } else {
      this.set('isLoaded', true);
    }
  }.observes('isLoading'),
  animate: function() {
    this.set('isLoaded', false);
    var self = this,
        elapsedTime = 0,
        inner = $('<span>'),
        outer = this.$(),
        duration = this.getWithDefault('duration', 300),
        innerWidth = 0,
        outerWidth = this.$().width(),
        stepWidth = Math.round(outerWidth / 50),
        color = this.get('color');

    outer.append(inner);
    if (color) {
      inner.css('background-color', color);
    }

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
          outer.empty();
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
  expandingAnimate: function() {
    var self = this,
        outer = this.$(),
        speed = this.getWithDefault('speed', 1000),
        colorQueue = this.get('color');

    if ('object' === typeof colorQueue) {
      (function updateFn() {
        var color = colorQueue.shift();
        colorQueue.push(color);
        self.expandItem.call(self, color);
        if ( ! self.get('isLoading')) {
          outer.empty();
        } else {
          window.setTimeout(updateFn, speed);
        }
      })();
    } else {
      this.expandItem.call(this, colorQueue, true);
    }
  },
  expandItem: function(color, cleanUp) {
    var self = this,
        inner = $('<span>').css({
          'background-color': color,
        }),
        outer = this.$(),
        innerWidth = 0,
        outerWidth = outer.width(),
        stepWidth = Math.round(outerWidth / 50);

    outer.append(inner);

    var interval = window.setInterval(function() {
      var step = (innerWidth = innerWidth + stepWidth);
      if (innerWidth > outerWidth) {
        window.clearInterval(interval);
        if (cleanUp) {
          outer.empty();
        }
      }
      inner.css({
        'margin-left': '-' + step / 2 + 'px',
        'width': step,
      });
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
