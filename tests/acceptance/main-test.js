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
  find('button').click();

  Ember.run.later(function() {
    equal(find('.loading-slider span').width() > 0, true, 'The slider has animated');
  }, 500);

  Ember.run.later(function() {
    equal(find('.loading-slider span').width() === 0, true, 'The slider has reset');
  }, 1500);

});
