test("tap binding test", function () {
    var div = document.getElementById("tapDiv");
    //TODO: make tap event implementation.
    var model = {
        wasCalled: false,
        doCall: function (arg1) {
            equal(model.wasCalled, false, "Is false before tap");
            model.wasCalled = true;
            equal(model.wasCalled, true, "Is true after tap");
            //equal(arg1, model, "First arg is a model");
            //equal(arg2.type, "click", "Second arg is event");
        }
    };
    div.innerHTML = "<button data-bind='tap:doCall'>tap</button>";
    ko.applyBindings(model, div);    
    
    ko.utils.triggerEvent(div.childNodes[0], "tap");
    console.log("wascalled: " + model.wasCalled);
    equal(model.wasCalled, true, "We expect tap was called");
});