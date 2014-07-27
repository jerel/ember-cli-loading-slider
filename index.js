'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLILoadingSlider(project) {
  this.project = project;
  this.name    = 'Ember CLI Loading Slider';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLILoadingSlider.prototype.treeFor = function treeFor(name) {
  var treePath = path.relative(process.cwd(), __dirname);

  if (name === 'styles') {
      treePath = path.join(treePath, 'app', name);
  } else {
      treePath = path.join(treePath, name);
  }

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLILoadingSlider.prototype.included = function included(app) {
  this.app = app;
  this.app.import('components/loading-slider.css');
};

module.exports = EmberCLILoadingSlider;
