import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Main', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /75', function() {
  visit('/75');

  andThen(function() {
    equal(find('.loading-slider').length, 1, 'The component\'s element exists');
    equal(find('.loading-slider span').length, 1, 'The component has inserted one span');
    equal(find('.loading-slider span').width(), 0, 'The stripe has finished animating and is width 0');
  });
});

test('testing animation', function() {
  visit('/');

  // use the jQuery click rather than the promise observing click
  find('button:first').click();

  Ember.run.later(function() {
    equal(find('.loading-slider span:last').width() > 0, true, 'The slider has animated');
  }, 500);

  Ember.run.later(function() {
    equal(find('.loading-slider span').length === 0, true, 'The slider has reset');
  }, 1500);

});

test('testing multi-color centered animation', function() {
  visit('/');

  // use the jQuery click rather than the promise observing click
  find('button:nth-of-type(3)').click();

  Ember.run.later(function() {
    equal(find('.loading-slider span:last').width() > 0, true, 'The slider has animated');
  }, 1000);

  Ember.run.later(function() {
    equal(find('.loading-slider span').length > 2, true, 'There are multiple sliders');
  }, 1500);

  Ember.run.later(function() {
    equal(find('.loading-slider span').length === 0, true, 'The slider has reset');
  }, 5500);

});

