
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
            interceptEvent.bindHandler(element, "tap", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };

    ko.bindingHandlers.swipe = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "swipe", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };

    ko.bindingHandlers.drag = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "drag", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.dragstart = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "dragstart", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.dragend = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "dragend", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.transform = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "transform", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.hold = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "hold", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.doubletap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "doubletap", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.release = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = ko.utils.unwrapObservable(valueAccessor());
            interceptEvent.bindHandler(element, "release", handler);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };