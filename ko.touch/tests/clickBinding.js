test("binding test", function () {
    
    var div = document.getElementById("clicker");
    var model = {
        wasCalled: false,
        doCall: function (arg1, arg2) {
            this.wasCalled = true;
            equal(arg1, model, "First arg is a model");
            equal(arg2.type, "click", "Second arg is event");
        }
    };
    div.innerHTML = "<button data-bind='click:doCall'>hey</button>";
    ko.applyBindings(model, div);

    ko.utils.triggerEvent(div.childNodes[0], "click");

    equal(model.wasCalled, true, "We expect method was called");
});