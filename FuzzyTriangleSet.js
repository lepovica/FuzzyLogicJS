module.exports = function(name, leftOffset, peakPoint, rightOffset) {
	var core = {
		_repValue : peakPoint,
		_name : name,
		_DOM : 0.0,	
		_peakPoint : peakPoint,
		_leftOffset : leftOffset,
		_rightOffset : rightOffset,
		calculateDOM : function(value) {
			if( ((rightOffset === 0.0) && (peakPoint === value)) || ((leftOffset === 0.0) && (peakPoint === value)) ) {
				return 1.0;
			}
			if( (value <= peakPoint) && (value >= (peakPoint - leftOffset)) ){
				var grad = 1.0 / leftOffset;
				return grad * (value - (peakPoint - leftOffset));
					
			}else {
				if( (value > peakPoint) && (value < (peakPoint + rightOffset))) {
					var grad = 1.0 / -rightOffset;
					return grad * (value - peakPoint) + 1.0;
				}else {
					return 0.0;
				}
			}
		},
		clearDOM : function() {
			core._DOM = 0.0;
		},
		setDOM : function(value) {
			core._DOM = value;
		},
		getDOM : function(value) {
			return core._DOM;
		},
		getName : function() {
			return core._name;
		},
		ORwithDOM : function(value) {
			if(core._DOM < value) {
				core.setDOM(value);
			}
		}
	}
	return core;
}
