var FuzzyTerm = require('./FuzzyTerm');
var FuzzySet = require('./FuzzySet');

var set = new FuzzySet("close", 59);

set.setDOM(10);
set.ORwithDOM(20);
console.log(set);

var term = new FuzzyTerm(set);
console.log(term);
term.setDOM(60);
console.log(term.getDOM());
term.clearDOM();
console.log(term.getDOM());
term.ORwithDOM(30);
console.log(term.getDOM());
term.setName("far");
console.log(term.getName());

var term2 = new FuzzyTerm(set);
console.log(term2.fzOrWith(term));
term2.setDOM(20);
console.log(term2.fzAndWith(term));