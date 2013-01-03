﻿
test("tap binding test", function () {
    var div = document.getElementById("tapDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before tap");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after tap");
        }
    };
    
    div.innerHTML = "<button data-bind='tap:doCall'>tap</button>";
    ko.applyBindings(model, div);
        
    ko.utils.triggerEvent(div.childNodes[0], "tap");
    
    equal(model.wasCalled, true, "We expect tap was called");
});

test("swipe binding test", function () {
    var div = document.getElementById("swipeDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before swipe");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after swipe");
        }
    };
    div.innerHTML = "<button data-bind='swipe:doCall'>swipe</button>";
    ko.applyBindings(model, div);

    ko.utils.triggerEvent(div.childNodes[0], "swipe");
    equal(model.wasCalled, true, "We expect swipe was called");
});

test("drag binding test", function () {
    var div = document.getElementById("dragDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before drag");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after drag");
        }
    };
    div.innerHTML = "<button data-bind='drag:doCall'>drag</button>";
    ko.applyBindings(model, div);        

    ko.utils.triggerEvent(div.childNodes[0], "drag");
    equal(model.wasCalled, true, "We expect drag was called");
});

test("transform binding test", function () {
    var div = document.getElementById("transformDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before transform");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after transform");
        }
    };
    div.innerHTML = "<button data-bind='transform:doCall'>transform</button>";
    ko.applyBindings(model, div);

    ko.utils.triggerEvent(div.childNodes[0], "transform");
    equal(model.wasCalled, true, "We expect tap was called");
});

test("hold binding test", function () {
    var div = document.getElementById("holdDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before hold");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after hold");
        }
    };
    div.innerHTML = "<button data-bind='hold:doCall'>tap</button>";
    ko.applyBindings(model, div);

    ko.utils.triggerEvent(div.childNodes[0], "hold");
    equal(model.wasCalled, true, "We expect tap was called");
});

test("doubletap binding test", function () {
    var div = document.getElementById("doubletapDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before doubletap");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after doubletap");
        }
    };
    div.innerHTML = "<button data-bind='doubletap:doCall'>tap</button>";
    ko.applyBindings(model, div);

    ko.utils.triggerEvent(div.childNodes[0], "doubletap");
    equal(model.wasCalled, true, "We expect tap was called");
});

test("release binding test", function () {
    var div = document.getElementById("releaseDiv");
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before release");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after release");
        }
    };
    div.innerHTML = "<button data-bind='release:doCall'>release</button>";
    ko.applyBindings(model, div);

    ko.utils.triggerEvent(div.childNodes[0], "release");
    equal(model.wasCalled, true, "We expect tap was called");
});