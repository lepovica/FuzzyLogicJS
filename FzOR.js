module.exports = function(fuzzyTerm1, fuzzyTerm2) {
	if(fuzzyTerm1.getDOM() > fuzzyTerm2.getDOM()) {
		return fuzzyTerm1;
	} else {
		return fuzzyTerm2;
	}
}