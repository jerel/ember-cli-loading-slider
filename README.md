# Loading-slider

This README outlines the usage of this Ember add-on.

[Live Demo](http://loading-slider.jerel.co/)

## Installation

`npm install ember-cli-loading-slider --save-dev`

## Usage

Add the component to your application template:

    {{loading-slider isLoading=loading duration=250}}

Create an application controller and add the following actions to your application route:

    actions: {
      loading: function() {
        var controller = this.controllerFor('application');
        controller.set('loading', true);
        this.router.one('didTransition', function() {
          controller.set('loading', false);
        });
      },
      finished: function() {
        this.controllerFor('application').set('loading', false);
      }
    }

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
   false or it reaches 100% of the viewport width.
* color
 * A css color to use for the animation stripe. Defaults to `red`. Can also be
   set with your application's css by setting the background-color of
   .loading-slider > span.

## Authors

* [http://twitter.com/jerelunruh/](Jerel Unruh)

## Legal

Copyright (c) 2014 nGen Works Company and contributors

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
