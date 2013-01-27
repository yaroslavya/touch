/// <reference path="lib/knockout-2.2.0.debug.js" />
;(function (ko, undefined) {
    if (typeof (ko) === "undefined") {
        throw "knockout is required for knockout.touch";
    }

    var self = this;
    'use strict';

    var supportTouch = 'ontouchstart' in document,
        eventList = null,
        gesture   = null
        element   = {},
        mousdown  = false,
        canTap    = false,
        pos       = {},
        first     = false,
        fingers   = 0,
        distance  = 0;

    function reset() {
        first     = false;
        pos       = {};
        fingers   = 0;
        distance  = 0;
        gesture   = null;
    }

    function setup() {
        first     = true;

        gestures.hold(event);
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
            gesture = 'hold';
        },
        swipe: function (event) {
            gesture = 'swipe';
        },
        drag: function (event) {
            gesture = 'drag';
            var target = event.target || event.srcElement;
            event.testField = 'TestValue';
            triggerTouchEvent(element, 'drag', event);
        },
        transform: function (event) {
            gesture = 'transform';
        },
        tap: function (event) {
            gesture = 'tap';
            var target = event.target || event.srcElement;
            event.testField = 'TestValue';
            triggerTouchEvent(element, 'tap', event);
            
        }
    }

    this.touchStartHandleEvent = function touchStartHandleEvent(event) {
        event = event || window.event;

        setup();

    }

    this.touchMoveHandleEvent = function touchMoveHandleEvent(event) {
        event = event || window.event;

        gestures.drag(event);

    }

    this.touchEndHandleEvent = function touchEndHandleEvent(event) {
        event = event || window.event;

        mousdown = false;

        if (gesture == 'drag') {
            triggerTouchEvent(element, 'dragend', event);
        } else {
            gestures.tap(event);
        }

        reset();
    }

    //needs renaming interceptEvent
    this.interceptEvent = {
        bindHandler: function (elem, eventType, handler) {
            element = elem;
            element['on' + eventType] = handler;

            var touchStart = supportTouch ? 'touchstart' : 'mousedown',
                touchMove = supportTouch ? 'touchmove' : 'mousemove';
                touchEnd = supportTouch ? 'touchend' : 'mouseup';
                touchOut = supportTouch ? 'touchcancel' : 'mouseout';

            addEvent(element, touchStart, touchStartHandleEvent);
            addEvent(element, touchMove, touchMoveHandleEvent);
            addEvent(element, touchEnd, touchEndHandleEvent);
            addEvent(element, touchOut, touchEndHandleEvent);
        }
    }
})(window.ko);

;(function (ko, undefined) {
    var touchEvents = ['tap', 'swipe', 'drag', 'dragstart', 'dragend', 'transform', 'hold', 'doubletap', 'release'];

    ko.bindingHandlers['invisible'] = {
        update: function (element, valueAccessor) {
            var newValueAccessor = function () {
                // just return the opposite of the visible flag!
                return !ko.utils.unwrapObservable(valueAccessor());
            };
            return ko.bindingHandlers.visible.update(element, newValueAccessor);
        }
    };

    this.bindEventHandler =  function (eventType) {
        ko.bindingHandlers[eventType] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var handler = ko.utils.unwrapObservable(valueAccessor());
                interceptEvent.bindHandler(element, eventType, handler);
            }
        };
    }

    for (var i = touchEvents.length; i--;) {
        bindEventHandler(touchEvents[i]);
    }

})(window.ko);

;(function (ko, undefined) {
    'use strict';

    ko.utils.triggerTouchEvent = function triggerTouchEvent(element, eventType, canBubble,
        cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey,
        metaKey, button, relatedTarget) {
        if (document.createEvent && !top.execScript) {
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent(eventType, canBubble, cancelable, view, detail, screenX, screenY,
                clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
            element.dispatchEvent(event);
        }
        //for IE
        else if (document.createEventObject) {
            var event = document.createEventObject();
            event.detail    	= detail;
            event.screenX   	= screenX;
            event.screenY  	    = screenY;
            event.clientX  	    = clientX;
            event.clientY   	= clientY;
            event.ctrlKey   	= ctrlKey;
            event.altKey    	= altKey;
            event.shiftKey  	= shiftKey;
            event.metaKey  	    = metaKey;
            event.button        = button;
            event.relatedTarget = relatedTarget;
            element.fireEvent('on' + eventType, event);
        } else {
            throw "browser not support trigger events";
        }
    };

})(window.ko);