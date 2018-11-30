function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, false)[name];
	}
}
var timer = null;

function startMove2(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var stop = true;
		for (var attr in json) {
			var cur = 0;
			if (attr == 'opacity') {
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}
			var speed = (json[attr] - cur) / 3;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (cur != json[attr]) {
				stop = false;
			}
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opcity:' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed) / 100;
			} else if (attr == "zIndex") {
				obj.style.zIndex = json[attr];
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
		if (stop) {
			clearInterval(obj.timer);
			if (fn) fn();
		}
	}, 30);
}