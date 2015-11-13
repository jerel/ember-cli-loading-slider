'use strict';

module.exports = {
  name: 'ember-cli-loading-slider',
  included: function(app) {
    this._super.included(app);

    app.import('app/styles/components/loading-slider.css');
  }
};
