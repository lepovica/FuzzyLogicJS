function FuzzySet(name, leftOffset, peakPoint, rightOffset) {
    _repValue: peakPoint,
    _DOM: 0.0
}

FuzzySet.prototype = {
    clearDOM: function() {
        core._DOM = 0.0;
    },
    setDOM: function(value) {
        core._DOM = value;
    },
    getDOM: function(value) {
        return core._DOM;
    },
    ORwithDOM: function(value) {
        if (core._DOM < value) {
            core.setDOM(value);
        }
    }
}