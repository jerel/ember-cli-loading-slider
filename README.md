# Loading-slider

A loading indicator component for EmberJS that animates across the top of the viewport.

[Live Demo](http://loading-slider.jerel.co/)

[![Build Status](https://travis-ci.org/jerel/ember-cli-loading-slider.svg?branch=master)](https://travis-ci.org/jerel/ember-cli-loading-slider)

## Installation

`npm install ember-cli-loading-slider --save-dev`

## Usage

Add the component to your application template:

    {{loading-slider isLoading=loading duration=250}}

Alternatively you may try the more complex mode. In this mode an array of colors
is required `hexColorsArray: ['#000', '#fff']`:

    {{loading-slider isLoading=loading expanding="true" color=hexColorsArray}}

Create an application controller and add the `loading-slider` 
[mixin](https://github.com/jerel/ember-cli-loading-slider/blob/master/app/mixins/loading-slider.js) 
to the application route:

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

## API

* isLoading
 * A boolean property that the component observes to determine if it should display or hide.
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

## Authors

* [Jerel Unruh](http://twitter.com/jerelunruh/)

## Legal

Copyright (c) 2014 Jerel Unruh

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)

