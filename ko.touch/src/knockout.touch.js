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
    
    var isFunction = ko.utils.isFunction;
    
    var state = function (document) {
        var touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        var mouseEvents = ['mouseup', 'mousedown', 'mousemove', 'mouseout'];
        
        this.hasTouch = 'ontouchstart' in document;
        this.eventList = null;
        this.gesture = null;
        this.currElement = {};
        this.mousedown = false;
        this.canTap = false;
        this.pos = {};
        this.first = false;
        this.fingers = 0;
        this.distance = 0;

        this.reset = function() {
            first = false;
            pos = {};
            fingers = 0;
            distance = 0;
            gesture = null;
        };

        this.eventList = function() {
            if (hasTouch) return touchEvents;

            return mouseEvents;
        };
        
        this.setup = function() {
            first = true;
        };

        return this;
    }(document);      

    //NOTE: we are checking if we should attach even via all browser attachEvent or via
    //ie addEventListener. Maybe introducing a factory here would be better. Should try and see how
    //code will be influenced.
    function addEvent(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;//adding handler to the object.
            obj[type + fn] = function() { obj['e' + type + fn](window.event); };//making addEvent wrapper func to add to object.
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
        hold: function(event) {
            state.gesture = 'hold';
        },
        swipe: function(event) {
            state.gesture = 'swipe';
        },
        drag: function(event) {
            state.gesture = 'drag';

            event.testField = 'TestValue';
            //IE fix
            triggerTouchEvent(state.currElement, 'drag', event);
        },
        transform: function(event) {
        },
        tap: function tap(event) {
            state.gesture = 'tap';
            //need for test
            event.testField = 'TestValue';
            //IE fix
            var target = event.target || event.srcElement;
            triggerTouchEvent(state.currElement, 'tap', event);
        }
    };

    var tapEvent = function(currState, event) {
        
    };

    //TODO: move all the logic to event creators. So that every event creator could perform all the calculations
    //and fill the corresponding event argument. After that event is triggered.
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
            state.mousedown = false;//really mousedown? what if there`s a touch event?

            //gestures.swipe(event);

            if (state.gesture == 'drag') {
                triggerTouchEvent(state.currElement, 'dragend', event);
            } else {
                gestures.tap(event);
            }

            state.reset();
            
            break;
        }
    };

    //needs renaming interceptEvent,touchOptions
    this.interceptEvent = {
        bindHandler: function(element, eventType, handler) {
            state.currElement = element;
            state.currElement['on' + eventType] = handler;

            var events = state.eventList();
            //addEvent(element, touchstart, handleEvents);//handle events is a function that handles any event depending on event.type.
            for (var i = 0; i < events.length; i++) {
                addEvent(state.currElement, events[i], handleEvents);
            }

        }
    };
}(window.ko);