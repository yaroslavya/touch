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
            var handler = ko.utils.unwrapObservable(valueAccessor());            
            $(element).hammer({
                    prevent_default: false,
                    drag_vertical: false
            })
            .bind("tap", function (ev) {
                handler(ev);                
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

}(window.ko))