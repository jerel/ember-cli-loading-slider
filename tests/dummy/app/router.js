import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('two', {path: '/two'});
  this.resource('75', {path: '/75'});
  this.resource('orange', {path: '/orange'});
});

export default Router;
