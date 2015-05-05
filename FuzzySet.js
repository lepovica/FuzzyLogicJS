module.exports = function FuzzySet(repValue) {
    this._repValue = repValue;
    this._DOM = 0.0;

    this.getRepValue = function() {
        return this._repValue;
    };
    this.clearDOM = function() {
        this._DOM = 0.0;
    };
    this.setDOM = function(value) {
        this._DOM = value;
    };
    this.getDOM = function() {
        return this._DOM;
    };
    this.ORwithDOM = function(value) {
        if (this._DOM < value) {
            this.setDOM(value);
        }
    };
};