/// <reference path="lib/knockout-2.2.0.debug.js" />
(function (ko, undefined) {
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
                transform_vertical: false
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

    ko.bindingHandlers.swipe = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            $(element).hammer({
                prevent_default: false,
                transform_vertical: false
            })
            .bind("swipe", function (ev) {
                handler(ev);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

    ko.bindingHandlers.drag = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            $(element).hammer({
                prevent_default: true
            })
            .bind("drag", function (ev) {
                handler(ev);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

    ko.bindingHandlers.transform = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            $(element).hammer({
                prevent_default: true
            })
            .bind("transform", function (ev) {
                handler(ev);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

    ko.bindingHandlers.hold = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            $(element).hammer({
                prevent_default: true
            })
            .bind("hold", function (ev) {
                handler(ev);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

    ko.bindingHandlers.doubletap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            $(element).hammer({
                prevent_default: true
            })
            .bind("doubletap", function (ev) {
                handler(ev);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //something like react on tap and provide a tap handler, with tap event arguements.
            //currently I can use something like hammer to track the gestures. 
            //Later I can write my own implementation. I checked hammer, not that complicated.
        }
    }

    ko.bindingHandlers.release = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            $(element).hammer({
                prevent_default: true
            })
            .bind("release", function (ev) {
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