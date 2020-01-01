import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import { isBlank } from '@ember/utils';

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

  didReceiveAttrs() {
    this._super(...arguments);

    if (isFastBoot()) { return; }

    this.setProperties({
      isLoading: this.getAttr('isLoading'),
      duration: this.getAttr('duration'),
      expanding: this.getAttr('expanding'),
      speed: this.getAttr('speed'),
      color: this.getAttr('color')
    });

    this.manage();
  },

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
    if (isBlank(this.element)) {
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
        inner = document.createElement('span'),
        outer = this.element,
        duration = this.getWithDefault('duration', 300),
        innerWidth = 0,
        outerWidth = this.element.clientWidth,
        stepWidth = Math.round(outerWidth / 50),
        color = this.get('color');
    
    inner.setAttribute('class', `loading-slider__progress ${this.get('progressBarClass')}`);
    outer.appendChild(inner);

    if (color) {
      inner.style.backgroundColor = color;
    }

    let interval = window.setInterval(function() {
      elapsedTime = elapsedTime + 10;
      inner.style.width = `${innerWidth}px`;
      innerWidth = innerWidth + stepWidth;

      // slow the animation if we used more than 75% the estimated duration
      // or 66% of the animation width
      if (elapsedTime > (duration * 0.75) || innerWidth > (outerWidth * 0.66)) {
        // don't stop the animation completely
        if (stepWidth > 1) {
          stepWidth = stepWidth * 0.97;
        }
      }

      if (innerWidth > outerWidth) {
        run.later(this, function() {
          self._removeNodes(outer);
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
        outer = this.element,
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
          self._removeNodes(outer);
        } else {
          window.setTimeout(updateFn, speed);
        }
      })();
    } else {
      this.expandItem.call(this, colorQueue, true);
    }
  },

  expandItem(color, cleanUp) {
    let inner = document.createElement('span'),
        outer = this.element,
        innerWidth = 0,
        outerWidth = outer.clientWidth,
        stepWidth = Math.round(outerWidth / 50);
    let ua = window.navigator.userAgent;
    let ie10 = ua.indexOf("MSIE "),
        ie11 = ua.indexOf('Trident/'),
        ieEdge = ua.indexOf('Edge/');
    let self = this;

    inner.style.backgroundColor = color;
    outer.appendChild(inner);

    let interval = window.setInterval(function() {
      let step = (innerWidth = innerWidth + stepWidth);
      if (innerWidth > outerWidth) {
        window.clearInterval(interval);
        if (cleanUp) {
          self._removeNodes(outer);
        }
      }
      if (ie10 > 0 || ie11 > 0 || ieEdge > 0) {
        inner.style.margin = '0 auto';
        inner.style.width = `${step}px`;
      } else {
        inner.style.marginLeft = `-${step / 2}px`;
        inner.style.width = `${step}px`;
      }
    }, 10);
  },

  didInsertElement() {
    let innerSpan = document.createElement('span');
    
    let color = this.get('color');
    if (color) {
      innerSpan.style.backgroundColor = color;
    }

    this.element.appendChild(innerSpan);

    if (this.get('runManageInitially')) {
      this._startLoading();
    }
  },

  _removeNodes(element) {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  }
});

function isFastBoot() {
  return typeof FastBoot !== 'undefined';
}
