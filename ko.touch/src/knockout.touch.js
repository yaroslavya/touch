/// <reference path="lib/knockout-2.2.0.debug.js" />
!function (ko, undefined) {
    if (typeof (ko) === "undefined") {
        throw "knockout is required for knockout.touch";
    }
    /*this равна undefined после использования 'use strict'; 
    *можно использовать standard self-executing anonymous function
    *но я не уверен что это хороший подход 
    */
    var _this = this;
    'use strict';

    var _has_touch = 'ontouchstart' in document,
        _eventList = null,
        _gesture = null,
        _element = {},
        _mousdown = false,
        _can_tap = false,
        _pos = {},
        _first = false,
        _fingers = 0,
        _distance = 0;

    function reset() {
        _first = false;
        _pos = {};
        _fingers = 0;
        _distance = 0;
        _gesture = null;
    }

    function setup() {
        _first = true;
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) == '[object Function]';
    }

    function addEvent(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function () { obj['e' + type + fn](window.event); }
            obj.attachEvent('on' + type, obj[type + fn]);
        } else
            obj.addEventListener(type, fn, false);
    }

    function triggerTouchEvent(element, eventType, event) {
        if (isFunction(element['on' + eventType])) {
            element['on' + eventType](event);
        }
    }

    var gestures = {
        hold: function (event) {
            _gesture = 'hold';
        },
        swipe: function (event) {
            _gesture = 'swipe';
        },
        drag: function (event) {
            _gesture = 'drag';

            event.testField = 'TestValue';
            //IE fix
            triggerTouchEvent(_element, 'drag', event);
        },
        transform: function (event) {
        },
        tap: function tap(event) {
            _gesture = 'tap';
            //need for test
            event.testField = 'TestValue';
            //IE fix
            var target = event.target || event.srcElement;
            triggerTouchEvent(_element, 'tap', event);
            
        }
    }

    this.handleEvents = function handleEvents(event) {
        //IE fix
        event = event || window.event;
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':

                break;

            case 'mousemove':
            case 'touchmove':
                gestures.drag(event);

                break;

            case 'mouseup':
            case 'mouseout':
            case 'touchcancel':
            case 'touchend':
                _mousdown = false;

                //gestures.swipe(event);

                if (_gesture == 'drag') {
                    triggerTouchEvent(_element, 'dragend', event);
                } else {
                    gestures.tap(event);
                }

                reset();
                break;
        }
    }

    //needs renaming interceptEvent,touchOptions
    this.interceptEvent = {
        bindHandler: function (element, eventType, handler) {
            _element = element;
            _element['on' + eventType] = handler;

            if (_has_touch) {
                _eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            }
                // for non-touch
            else {
                _eventList = ['mouseup', 'mousedown', 'mousemove', 'mouseout'];
            }
            for (var i = 0; i < _eventList.length; i++) {
                addEvent(_element, _eventList[i], handleEvents);
            }


        }
    }

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

}(window.ko);

!function (ko, undefined) {
    if (typeof (ko) === "undefined") {
        throw "knockout is required for knockout.triggerTouchEvent";
    }
    'use strict';

    ko.utils.triggerTouchEvent = function triggerTouchEvent(element, eventType, canBubble,
        cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey,
        metaKey, button, relatedTarget) {
        //check IE
        if (document.createEvent && !top.execScript) {
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent(eventType, canBubble, cancelable, view, detail, screenX, screenY,
                clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
            element.dispatchEvent(event);
        }
        else if (document.createEventObject) {
            var ev = document.createEventObject();
            ev.detail = 0;
            ev.screenX = 12;
            ev.screenY = 345;
            ev.clientX = 7;
            ev.clientY = 220;
            ev.ctrlKey = false;
            ev.altKey = false;
            ev.shiftKey = true;
            ev.metaKey = false;
            ev.button = 0;
            ev.relatedTarget = null;
            element.fireEvent('on' + eventType, ev);
        } else {
            throw "browser not support trigger events";
        }
    };

}(window.ko);