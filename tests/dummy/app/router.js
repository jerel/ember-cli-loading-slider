import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.resource('two', {path: '/two'});
  this.resource('75', {path: '/75'});
  this.resource('orange', {path: '/orange'});
});

export default Router;
