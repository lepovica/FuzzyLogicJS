module.exports = function(antecedent, consequent) {
    this._ant = antecedent;
    this._con = consequent;
};
module.exports.prototype.setConfidenceOfConsequentToZero = function() {
    this._con.clearDOM();
};
module.exports.prototype.calculate = function() {
    this._con.ORwithDOM(this._ant.getDOM());
};