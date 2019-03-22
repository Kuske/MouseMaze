/*eslint-env browser*/

function getString() {
	"use strict";
	var str = "";
	for (var i = 0; i < arguments.length; ++i) {
		// 関数実行時に引数として渡されたものは『arguments』で参照できます。
		if (typeof arguments[i] == 'string') {
			str += arguments[i];
		} else {
			str += arguments[i].toString();
		}
	}
	return str;
}

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.toString = function () {
		return getString("{ x: ", this.x.toString(), ", y: ", this.y, " }");
	}
}

function Size(width, height) {
	"use strict";
	this.width = width;
	this.height = height;
	this.toString = function () {
		return getString("{ width: ", this.width, ", height: ", this.height, " }");
	}
}

function Rectangle(point, size) {
	"use strict";
	this.x = point.x;
	this.y = point.y;
	this.width = size.width;
	this.height = size.height;
	this.point = point;
	this.size = size;
}

function drawCircle(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.fill();
}

var LastLine = 0;

function DebugOutput(ctx, str, line) {
	"use strict"
	if (arguments.length === 2) {
		ctx.strokeText(str, 15, 15 * (LastLine + 1));
		LastLine += 1;
	}
	if (arguments.length === 3) {
		ctx.strokeText(str, 15, 15 * line);
		LastLine = line;
	}
}

function SetDebugLine(line) {
	LastLine = line;
}

function ResetDebugLine() {
	LastLine = 0;
}

function Color(R, G, B) {
	this.toString = function () {
		var str = "";
		str += "#";
		str += ('00' + R.toString(16)).slice(-2);
		str += ('00' + G.toString(16)).slice(-2);
		str += ('00' + B.toString(16)).slice(-2);

		return str;
	}
}

function Draw(ctx) {
	this.Circle = function (point, radius, color) {
		ctx.fillStyle = color.toString();
		ctx.beginPath();
		ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
		ctx.fill();
	}

	this.Rect = function (rect, color) {
		ctx.fillStyle = color.toString();
		ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	}
}

// max未満の整数
function getRand(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


function List() {
	this.Count = 0;
	this.data = [];
	this.Add = function (value) {
		this.Count += 1;
		this.data.push(value);
	}
	this.RemoveAt = function (index) {
		var newList = [];

		for (var i = 0; i < this.data.length; ++i) {
			if (i != index) {
				newList.push(this.data[i]);
			} else {
				this.Count -= 1;
			}
		}

		this.data = [];
		this.data = newList;
	}
}









// 下のほうに余白を取っておく
