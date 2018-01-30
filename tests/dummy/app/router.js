import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('two', { path: '/two' });
  this.route('75', { path: '/75' });
  this.route('orange', { path: '/orange' });
});

export default Router;
