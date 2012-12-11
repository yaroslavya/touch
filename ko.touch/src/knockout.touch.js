/// <reference path="lib/knockout-2.2.0.debug.js" />
(function(ko, undefined){
    if (typeof (ko) === undefined) { throw "knockout is required for knockout.touch" }

    ko.bindingHandlers['invisible'] = {
        update: function (element, valueAccessor) {
            var newValueAccessor = function () {
                // just return the opposite of the visible flag!
                return !ko.utils.unwrapObservable(valueAccessor());
            };
            return ko.bindingHandlers.visible.update(element, newValueAccessor);
        }
    };

    ko.bindingHandlers.tap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

}(window.ko))