var FuzzySet = require('./FuzzySet');


module.exports = function FuzzyTerm(fuzzySet) {
    FuzzySet.call(this, fuzzySet.getName(), fuzzySet.getRepValue());
    this._DOM = fuzzySet.getDOM();
};

module.exports.prototype = Object.create(FuzzySet.prototype);

module.exports.prototype.fzOrWith = function(fuzzyTerm) {
    if (this.getDOM() > fuzzyTerm.getDOM()) {
        return this;
    } else {
        return fuzzyTerm;
    }
};

module.exports.prototype.fzAndWith = function(fuzzyTerm) {
    if (this.getDOM() < fuzzyTerm.getDOM()) {
        return this;
    } else {
        return fuzzyTerm;
    }
};