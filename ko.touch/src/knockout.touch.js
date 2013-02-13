/// <reference path="../tests/SimpleDemo.html" />
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
        this.touchstart = false;
        this.gestureStartTime = null;
        this.dragMinDistance = 20;
        this.swipeMinDistance = 20;
        this.swipeTime = 500;
        this.canTap = false;
        this.pos = {};
        this.first = false;
        this.fingers = 0;
        this.distance = 0;
        this.originalEvent = {};
        this.offset = {};

        this.reset = function() {
            first = false;
            pos = {};
            fingers = 0;
            distance = 0;
            gesture = null;
            gestureStartTime = null;
            touchstart = false;
        };

        this.eventList = function() {
            if (hasTouch) return touchEvents;

            return mouseEvents;
        };
        
        this.setup = function (event) {
            pos.start = calculate.XYfromEvent(originalEvent);
            gestureStartTime = new Date().getTime();
            
            // borrowed from jquery offset https://github.com/jquery/jquery/blob/master/src/offset.js
            var box = state.currElement.getBoundingClientRect();
            var clientTop = state.currElement.clientTop || document.body.clientTop || 0;
            var clientLeft = state.currElement.clientLeft || document.body.clientLeft || 0;
            var scrollTop = window.pageYOffset || state.currElement.scrollTop || document.body.scrollTop;
            var scrollLeft = window.pageXOffset || state.currElement.scrollLeft || document.body.scrollLeft;

            offset = {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
            
            first = true;
            touchstart = true;
        };

        return this;
    }(document);
    
    
    
    this.calculate = {

        fingersCount: function () {
            return event.touches ? event.touches.length : 1;
        },

        angle: function (startPos, curentPos) {
            return Math.atan2(state.pos.move[0].y - state.pos.start[0].y, state.pos.move[0].x - state.pos.start[0].x) * 180 / Math.PI;
        },

        direction: function (angle) {
            var directions = {
                down: angle >= 45 && angle < 135, //90
                left: angle >= 135 || angle <= -135, //180
                up: angle < -45 && angle > -135, //270
                right: angle >= -45 && angle <= 45 //0
            };

            var direction, key;
            for (key in directions) {
                if (directions[key]) {
                    direction = key;
                    break;
                }
            }
            return direction;
        },

        distance: function () {
            var x = state.pos.move[0].x - state.pos.start[0].x,
                y = state.pos.move[0].y - state.pos.start[0].y;
            return Math.sqrt(x * x + y * y);
        },

        XYMouse: function (event) {
            var doc = document,
                body = doc.body,
                x = event.pageX || event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && doc.clientLeft || 0),
                y = event.pageY || event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && doc.clientTop || 0);
            return [{ x: x, y: y }];
        },
        
        position: function() {
            return {
                x: state.pos.move[0].x - state.offset.left,
                y: state.pos.move[0].y - state.offset.top
            };
        },

        XYTouch: function (event) {
            var pos = [],
                src;

            for (var i = 0, len = event.touches.length; i < len; i++) {
                src = event.touches[t];
                pos.push({ x: src.pageX, y: src.pageY });
            }
            return pos;
        },

        XYfromEvent: function (event) {
            var fn = calculate.XYMouse;

            if (!state.hasTouch) {
                if (event.touches !== undefined && event.touches.length > 0) {
                    fn = calculate.XYTouch;
                }
            } else {
                fn = calculate.XYTouch;
            }

            return fn(event);
        }
    };
    
    function TouchEvent(type) {
        this.type = type;
        this.originalEvent = state.originalEvent;
        this.target = event.target || event.srcElement;
        this.touches = calculate.fingersCount();
        this.touchTime = (new Date().getTime()) - state.gestureStartTime;
    }

    function Tap() {
        TouchEvent.call(this, "tap");
    }

    function Drag(gesture) {  
        TouchEvent.call(this, gesture || "drag");
        
        this.angle = calculate.angle();
        this.distance = calculate.distance();
        this.direction = calculate.direction(this.angle);
        this.position = calculate.position();
    }
    
    function Swipe() {
        Drag.call(this, "swipe");
    }

    function Dragend() {
        Drag.call(this, "dragend");
    }

    function Dragstart() {
        Drag.call(this, "dragstart");
    }

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

    function triggerTouchEvent(event) {
        if (isFunction(state.currElement['on' + event.type])) {
            state.currElement['on' + event.type](event);
        }
    }
    

    var gestures = {
        hold: function() {
            state.gesture = 'hold';
        },
        swipe: function () {
            var event = new Swipe();
            if ((state.swipeTime >= event.touchTime) && (event.distance >= state.swipeMinDistance)) {
                state.gesture = 'swipe';
                triggerTouchEvent(event);
            } else {
                gestures.dragend();
            }
        },
        dragstart : function() {
            var event = new Dragstart();
            state.gesture = 'drag';
            state.first = false;
            triggerTouchEvent(event);
        },
        drag: function () {
            var event;
            var distance = calculate.distance();
            
            if (state.gesture == 'drag') {
                event = new Drag();
                triggerTouchEvent(event);
            } else if((distance > state.dragMinDistance) && state.first) {
                gestures.dragstart();
            }
        },
        dragend: function () {
            var event = new Dragend();
            state.gesture = 'dragend';
            triggerTouchEvent(event);
        },
        transform: function() {
        },
        tap: function tap() {
            var event = new Tap();
            triggerTouchEvent(event);
        }
    };

    var tapEvent = function(currState, event) {
        
    };

    //TODO: move all the logic to event creators. So that every event creator could perform all the calculations
    //and fill the corresponding event argument. After that event is triggered.
    this.handleEvents = function handleEvents(event) {
        state.originalEvent = event || window.event;
        switch (event.type) {
        case 'mousedown':
        case 'touchstart':   
            state.setup(event);
            var fingers = calculate.fingersCount();
            state.canTap = fingers === 1;
            break;
        case 'mousemove':
        case 'touchmove':
            if (state.touchstart) {
                state.pos.move = calculate.XYfromEvent(state.originalEvent);
                gestures.drag();
            }
            
            break;
        case 'mouseup':
        case 'mouseout':
        case 'touchcancel':
        case 'touchend':
            if (state.touchstart) {
                if (state.gesture == 'drag') {
                    gestures.swipe();
                } else if(event.type != 'mouseout') {
                    gestures.tap();
                }
                state.reset();
            }
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