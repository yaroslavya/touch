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
    
    //TODOH: make it a state object.
    var hasTouch = 'ontouchstart' in document,
        _eventList = null,
        _gesture = null,
        _element = {},
        _mousdown = false,
        _can_tap = false,
        _pos = {},
        _first = false,
        _fingers = 0,
        _distance = 0;

    //TODOH: also part fo the state object.
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

    //TODOH: Move to utils. Also any other helpers can be moved there.
    function isFunction(obj) {
        return Object.prototype.toString.call(obj) == '[object Function]';
    }

    //NOTE: we are checking if we should attach even via all browser attachEvent or via
    //ie addEventListener.
    function addEvent(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;//adding handler to the object.
            obj[type + fn] = function() { obj['e' + type + fn](window.event); }//making addEvent wrapper func to add to object.
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

    //TODOH: move all the logic to event creators. So that every even creator could perform all the calculations
    //and fill the corresponding even argument. After that event is triggered.
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

            if (hasTouch) {
                _eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            }
                // for non-touch
            else {
                _eventList = ['mouseup', 'mousedown', 'mousemove', 'mouseout'];
            }
            
            //addEvent(element, touchstart, handleEvents);//handle events is a function that handles any event depending on event.type.
            for (var i = 0; i < _eventList.length; i++) {
                addEvent(_element, _eventList[i], handleEvents);
            }

        }
    }
}(window.ko);