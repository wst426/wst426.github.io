(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var add = function (a, b) { return a + b; };

	var el = document.createElement("div");
	el.innerText = "1 + 2 = ".concat(add(1, 2));
	document.body.appendChild(el);

}));
