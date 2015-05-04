module.exports = function(fuzzySet) {
	var core = {
		_name : fuzzySet.getName(),
		_DOM : fuzzySet.getDOM(),

		clearDOM : function() {
			core._DOM = 0.0;
		},
		setDOM : function(value) {
			core._DOM = value;
		},
		getDOM : function(value) {
			return core._DOM;
		},
		ORwithDOM : function(value) {
			if(core._DOM < value) {
				core.setDOM(value);
			}
		},
		getName : function() {
			return core._name;
		}

	}
}