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
        ev.detail = detail;
        ev.screenX = screenX;
        ev.screenY = screenY;
        ev.clientX = clientX;
        ev.clientY = clientY;
        ev.ctrlKey = ctrlKey;
        ev.altKey = altKey;
        ev.shiftKey = shiftKey;
        ev.metaKey = metaKey;
        ev.button = button;
        ev.relatedTarget = relatedTarget;
        element.fireEvent('on' + eventType, ev);
    } else {
        throw "browser not support trigger events";
    }
};
