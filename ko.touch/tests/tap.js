test('tap binding test', function () {
    var div = document.getElementById('tapDiv');
    var model = {
        wasCalled: false,
        doCall: function (event) {
            equal(model.wasCalled, false, 'Is false before tap');
            model.wasCalled = true;
            equal(model.wasCalled, true, 'Is true after tap');
            equal(event.testField, 'TestValue', 'event content test value, it signals about our library was involved');
        }
    };
    div.innerHTML = '<button data-bind="tap:doCall">tap</button>';
    ko.applyBindings(model, div);
    //Depending on the event, you must pass a different set of arguments
    ko.utils.triggerTouchEvent(div.firstChild, 'mouseup', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);

    equal(model.wasCalled, true, 'We expect tap was called');
});

test('drag binding test', function () {
    var div = document.getElementById('dragDiv');
    var model = {
        wasCalled: false,
        doCall: function (event) {
            equal(model.wasCalled, false, 'Is false before tap');
            model.wasCalled = true;
            equal(model.wasCalled, true, 'Is true after tap');
            equal(event.testField, 'TestValue', 'event content test value, it signals about our library was involved');
        }
    };
    div.innerHTML = '<button data-bind="drag:doCall">tap</button>';
    ko.applyBindings(model, div);
    //Depending on the event, you must pass a different set of arguments
    ko.utils.triggerTouchEvent(div.firstChild, 'mousemove', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
    ko.utils.triggerTouchEvent(div.firstChild, 'mouseup', true, true, window, 1, 12, 345, 8, 270, false, false, true, false, 0, null);

    equal(model.wasCalled, true, 'We expect tap was called');
});