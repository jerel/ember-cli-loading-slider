# Loading-slider

A loading indicator component for EmberJS that animates across the top of the viewport.

[Live Demo](http://loading-slider.jerel.co/)

[![Build Status](https://travis-ci.org/jerel/ember-cli-loading-slider.svg?branch=master)](https://travis-ci.org/jerel/ember-cli-loading-slider)

## Installation

`ember install ember-cli-loading-slider`

## Usage

Add the component to your application template:

    {{loading-slider duration=250}}

Create application route (if not present) and extend application route with `loading-slider` 
[mixin](https://github.com/jerel/ember-cli-loading-slider/blob/master/app/mixins/loading-slider.js):

    import Ember from 'ember';
    import LoadingSliderMixin from 'ember-loading-slider/mixins/loading-slider';

    export default Ember.Route.extend(LoadingSliderMixin, {});

The animation will now show when the user navigates between routes that
return a promise (such as `this.store.find()`). This even works for nested routes. If you handle `loading` and `finished` events in your route, make sure to `return true` and let the event bubble to the application route.

You may also show or hide the animation at any time from any route or controller or component actions:

    ...
    loadingSlider: Ember.inject.service(),

    actions: {
      saveUser: function(user) {
        let loadingSlider = this.get('loadingSlider');

        loadingSlider.startLoading();
        user.save().finally(function() {
          loadingSlider.endLoading();
        });
      }
    }
    ...

For v1.2.x make sure that you have explicitly defined an application controller
e.g. `app/controllers/application.js` to avoid getting an `Assertion Failed` error.

v1.3.x is implemented as a service and controllers are no longer used.

## Configuration

You can change the configuration for the loading slider through the service.

  loadingSlider: Ember.inject.service(),

  actions: {
    doSomething() {
      let loadingSlider = this.get('loadingSlider');

      loadingSlider.changeAttrs({
        expanding: false,
        color: false,
        speed: 1000
      });
    },
  }

* duration
 * An approximate duration of the event in milliseconds. Defaults to `300`.
   Once 75% of this specified duration passes (or if the animation reaches 66%
   of the viewport width the animation slows until either isLoaded changes to
   false or it reaches 100% of the viewport width. This option is only valid for the
   simple stripe animation.
* color
 * A css color to use for the animation stripe. Defaults to `red`. Can also be
   set with your application's css by setting the background-color of
   .loading-slider > span. If `expanding` is set to `true` then `color` is required
   and must be an array of colors.
* expanding
 * Set this to `true` to change the style of animation from a simple stripe
   to a more complex animation (see the demo).
* speed
 * Set the speed of the expanding style animation. Defaults to `1000`. Only valid
   when `expanding` is true.

## Service API


* `startLoading`
* `endLoading`
* `changeAttrs(attrs)`

## Authors

* [Jerel Unruh](http://twitter.com/jerelunruh/)
* [Contributors](https://github.com/jerel/ember-cli-loading-slider/graphs/contributors)

## Legal

Copyright (c) 2014 Jerel Unruh

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)

