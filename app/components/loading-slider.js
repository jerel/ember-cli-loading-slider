import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import { isBlank } from '@ember/utils';
import { on } from '@ember/object/evented';

export default Component.extend({
  tagName: 'div',
  classNames: ['loading-slider'],
  classNameBindings: 'expanding',
  progressBarClass: null,

  loadingSlider: service(),

  init() {
    this._super(...arguments);

    if (isFastBoot()) { return; }

    run.once(this, function() {
      this.get('loadingSlider').on('startLoading', this, this._startLoading);
      this.get('loadingSlider').on('endLoading', this, this._endLoading);
      this.get('loadingSlider').on('changeAttrs', this, this._changeAttrs);
    });
  },

  setAttrsThenManage: on('didReceiveAttrs', function() {

    if (isFastBoot()) { return; }

    this.setProperties({
      isLoading: this.getAttr('isLoading'),
      duration: this.getAttr('duration'),
      expanding: this.getAttr('expanding'),
      speed: this.getAttr('speed'),
      color: this.getAttr('color')
    });

    this.manage();
  }),

  willDestroy() {
    run.once(this, function() {
      this.get('loadingSlider').off('startLoading', this, this._startLoading);
      this.get('loadingSlider').off('endLoading', this, this._endLoading);
      this.get('loadingSlider').off('changeAttrs', this, this._changeAttrs);
    });
  },

  _startLoading() {
    this.set('isLoading', true);
    this.manage();
  },

  _endLoading() {
    this.set('isLoading', false);
  },

  _changeAttrs(attrs) {
    this.setProperties(attrs);
    this.manage();
  },

  manage() {
    if (isBlank(this.$())) {
      return;
    }

    if (this.get('isLoading')) {
      if (this.get('expanding')) {
        this.expandingAnimate.call(this);
      } else {
        this.animate.call(this);
      }
    } else {
      this.set('isLoaded', true);
    }
  },

  animate() {
    this.set('isLoaded', false);
    let self = this,
        elapsedTime = 0,
        inner = $(`<span class="loading-slider__progress ${this.get('progressBarClass')}">`),
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

    let interval = window.setInterval(function() {
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
        run.later(function() {
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

  expandingAnimate() {
    let self = this,
        outer = this.$(),
        speed = this.getWithDefault('speed', 1000),
        colorQueue = this.get('color');

    if ('object' === typeof colorQueue) {
      (function updateFn() {
        if (self.isDestroyed || self.isDestroying) {
          return;
        }
        let color = colorQueue.shift();
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

  expandItem(color, cleanUp) {
    let self = this,
        inner = $('<span>').css({'background-color': color}),
        outer = this.$(),
        innerWidth = 0,
        outerWidth = outer.width(),
        stepWidth = Math.round(outerWidth / 50);
    let ua = window.navigator.userAgent;
    let ie10 = ua.indexOf("MSIE "),
        ie11 = ua.indexOf('Trident/'),
        ieEdge = ua.indexOf('Edge/');

    outer.append(inner);

    let interval = window.setInterval(function() {
      let step = (innerWidth = innerWidth + stepWidth);
      if (innerWidth > outerWidth) {
        window.clearInterval(interval);
        if (cleanUp) {
          outer.empty();
        }
      }
      if (ie10 > 0 || ie11 > 0 || ieEdge > 0) {
        inner.css({
          'margin': '0 auto',
          'width': step
        });
      } else {
        inner.css({
          'margin-left': '-' + step / 2 + 'px',
          'width': step
        });
      }
    }, 10);
  },

  didInsertElement() {
    this.$().html('<span>');

    var color = this.get('color');
    if (color) {
      this.$('span').css('background-color', color);
    }

    if (this.get('runManageInitially')) {
      this._startLoading();
    }
  }
});

function isFastBoot() {
  return typeof FastBoot !== 'undefined';
}
