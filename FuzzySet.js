module.exports = function FuzzySet(name, repValue) {
    this._name = name;
    this._repValue = repValue;
    this._DOM = 0.0;
};

module.exports.prototype.setName = function(name) {
    this._name = name;
};
module.exports.prototype.getName = function() {
    return this._name;
};
module.exports.prototype.getRepValue = function() {
    return this._repValue;
};
module.exports.prototype.clearDOM = function() {
    this._DOM = 0.0;
};
module.exports.prototype.setDOM = function(value) {
    this._DOM = value;
};
module.exports.prototype.getDOM = function() {
    return this._DOM;
};
module.exports.prototype.ORwithDOM = function(value) {
    if (this._DOM < value) {
        this.setDOM(value);
    }
};