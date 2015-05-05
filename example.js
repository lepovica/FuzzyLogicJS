var FuzzyModule = require('./FuzzyModule');
var FuzzyTerm = require('./FuzzyTerm');

var AttackModule = function() {

    this.fzmod = new FuzzyModule();

    this.distanceFLV = this.fzmod.createFLV("distance");

    this.close_to_target = this.distanceFLV.addLeftShoulderSet("close", 0, 9000, 40000);
    this.average_to_target = this.distanceFLV.addTriangleSet("average", 9000, 40000, 60000);
    this.far_to_target = this.distanceFLV.addRightShoulderSet("far", 40000, 60000, 400000);

    this.sizeFLV = this.fzmod.createFLV("size");

    this.small_target = this.sizeFLV.addLeftShoulderSet("small", 1, 3, 6);
    this.medium_target = this.sizeFLV.addTriangleSet("medium", 3, 6, 8);
    this.big_target = this.sizeFLV.addRightShoulderSet("big", 6, 8, 10);

    this.desirabilityFLV = this.fzmod.createFLV("desirability");

    this.undesirable = this.desirabilityFLV.addLeftShoulderSet("undesirable", 0, 30, 50);
    this.desirable = this.desirabilityFLV.addTriangleSet("desirable", 30, 50, 70);
    this.very_desirable = this.desirabilityFLV.addRightShoulderSet("very_desirable", 50, 70, 100);

    this.declareRules = function() {
        var close = new FuzzyTerm(this.close_to_target);
        var average = new FuzzyTerm(this.average_to_target);
        var far = new FuzzyTerm(this.far_to_target);

        var small = new FuzzyTerm(this.small_target);
        var medium = new FuzzyTerm(this.medium_target);
        var big = new FuzzyTerm(this.big_target);

        var desirable = new FuzzyTerm(this.desirable);
        var undesirable = new FuzzyTerm(this.undesirable);
        var very_desirable = new FuzzyTerm(this.very_desirable);

        this.fzmod.addRule(close.fzAndWith(small), desirable);
        this.fzmod.addRule(close.fzAndWith(medium), desirable);
        this.fzmod.addRule(close.fzAndWith(big), very_desirable);

        this.fzmod.addRule(average.fzAndWith(small), undesirable);
        this.fzmod.addRule(average.fzAndWith(medium), desirable);
        this.fzmod.addRule(average.fzAndWith(big), very_desirable);

        this.fzmod.addRule(far.fzAndWith(small), undesirable);
        this.fzmod.addRule(far.fzAndWith(medium), undesirable);
        this.fzmod.addRule(far.fzAndWith(big), desirable);
    };

    this.getCrispValue = function(distance, size) {
        this.fzmod.fuzzify("distance", distance);
        this.fzmod.fuzzify("size", size);
        this.declareRules();
        return this.fzmod.deFuzzify("desirability");
    };

}

var a = new AttackModule();
console.log(a.getCrispValue(47900, 5));