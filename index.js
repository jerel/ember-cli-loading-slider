'use strict';

module.exports = {
  name: 'ember-cli-loading-slider',
  included: function(app) {
    this._super.included(app);

    app.import('components/loading-slider.css');
  }
};
