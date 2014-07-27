import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map(function() {
  this.resource('two', {path: '/two'});
  this.resource('75', {path: '/75'});
  this.resource('orange', {path: '/orange'});
});

export default Router;
