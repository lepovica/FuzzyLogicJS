var FuzzyModule = require('./FuzzyModule');
var FuzzyVariable = require('./FuzzyVariable');

var fzmod = new FuzzyModule();
console.log(fzmod);
fzmod.createFLV("distance");
console.log(fzmod);
var distanceVar = fzmod.getFLV("distance");
console.log(distanceVar);