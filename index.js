'use strict';

module.exports = {
  name: 'ember-cli-loading-slider',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-cli-loading-slider.css');
  }
};
