# Loading-slider

A loading indicator component for EmberJS that animates across the top of the viewport.

[Live Demo](http://loading-slider.jerel.co/)

[![Build Status](https://travis-ci.org/jerel/ember-cli-loading-slider.svg?branch=master)](https://travis-ci.org/jerel/ember-cli-loading-slider)

Installation
------------------------------------------------------------------------------

`npm install ember-cli-loading-slider --save-dev`

## Usage

Add the component to your application template:

    {{loading-slider isLoading=loading duration=250}}

Alternatively you may try the more complex mode. In this mode an array of colors
is required `hexColorsArray: ['#000', '#fff']`:

    {{loading-slider isLoading=loading expanding=true color=hexColorsArray}}

Create application route (if not present) and extend application route with `loading-slider` 
[mixin](https://github.com/jerel/ember-cli-loading-slider/blob/master/app/mixins/loading-slider.js):

    import Ember from 'ember';
    import LoadingSliderMixin from '../mixins/loading-slider';

    export default Ember.Route.extend(LoadingSliderMixin, { });

The animation will now show when the user navigates between routes that
return a promise (such as `this.store.find()`).

You may also show or hide the animation at any time from any route or controller:

    actions: {
      saveUser: function(user) {
        var self = this;

        self.send('loading');
        user.save().finally(function() {
          self.send('finished');
        });
      }
    }

For v1.2.x make sure that you have explicitly defined an application controller
e.g. `app/controllers/application.js` to avoid getting an `Assertion Failed` error.

v1.3.x is implemented as a service and controllers are no longer used.


## Enabling during initial app loading

Normally, the loading slider would only appear for transitions that happen after the app has loaded. During initial app loading (including loading models), the slider is not visible.

To enable the app slider during initial loading, do these extra steps:

1. Do not return a promise from the `application` route's `model` hook. If you do, the `application.hbs` template will not render until the data is loaded, and the slider will appear only when it's no longer necessary. If you need to load data app-wise, create an intermediate route (e. g. `main`) with `{path: '/'}` between the application route and your other routes.
2. Create an empty `loading.hbs` template. This will tell Ember not to postpone rendering of the `application.hbs` component.
3. In the `application` route, set a `bubbleLoadingSlider` property to `true`. This will tell the loading slider's `ApplicationRouteMixin` not to suppress the `loading` event.
4. In the application template, pass the following arguments to the `loading-slider` component:
    * `runManageInitially` - `true`. It tells the slider to start sliding when it initializes.
    * `expanding` - `true`. Current sliding (`expanding: false`) implementation lets the slider disappear before the routes finish loading models. We don't want it do disappear prematurely.
    * `color` - an array of at least two colors. It is required by `expanding: true`. To pass an array, create a simple helper or redefine the `loading-slider` component.


## API

* `isLoading`
  * A boolean property that the component observes to determine if it should display or hide.
* `duration`
  * An approximate duration of the event in milliseconds. Defaults to `300`.
    Once 75% of this specified duration passes (or if the animation reaches 66%
    of the viewport width the animation slows until either `isLoaded` changes to
    `false` or it reaches 100% of the viewport width. This option is only valid for the
    simple stripe animation.
* `color`
  * A css color to use for the animation stripe. Defaults to `red`. Can also be
    set with your application's css by setting the background-color of
    .loading-slider > span. If `expanding` is set to `true` then `color` is required
    and must be an array of colors.
* `expanding`
  * Set this to `true` to change the style of animation from a simple stripe
    to a more complex animation (see the demo).
* `speed`
  * Set the speed of the expanding style animation. Defaults to `1000`. Only valid
    when `expanding` is true.

## Service API

For advanced usage you may interact directly with the service instead of or in
addition to using the `loading-slider` component.

* `startLoading`
* `endLoading`
* `changeAttrs(attrs)`

## Authors

* [Jerel Unruh](http://twitter.com/jerelunruh/)
* [Contributors](https://github.com/jerel/ember-cli-loading-slider/graphs/contributors)

## Legal

Copyright (c) 2014 Jerel Unruh

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
