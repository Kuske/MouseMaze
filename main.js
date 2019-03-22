/*eslint-env browser*/

var myDraw;

//canvas要素の取得
var canvas = document.getElementById('canvas'); //canvasを取得
var ctx = canvas.getContext('2d'); //canvasのコンテキストを取得


var mapSize = new Size(41, 31);
var chipSize = new Size(15, 15);

var mazeMap = createMaze(mapSize.width, mapSize.height);

var clearFlag = false;

$(function () {
	sizing();
	$(window).resize(function () {
		sizing();
	});
});

function sizing() {
	$("#canvas").attr({
		height: $("#wrapper").height()
	});
	$("#canvas").attr({
		width: $("#wrapper").width()
	});

	// ウィンドウサイズ変更時の処理
	windowSize = new Size(window.innerWidth, window.innerHeight);

	var tmpMapWidth, tmpMapHeight;
	// 端の描画用に一マス開ける
	tmpMapWidth = Math.floor(windowSize.width / chipSize.width);
	tmpMapHeight = Math.floor(windowSize.height / chipSize.height);
	if (tmpMapWidth % 2 == 0) {
		tmpMapWidth -= 1;
	}
	if (tmpMapHeight % 2 == 0) {
		tmpMapHeight -= 1;
	}


	mapSize = new Size(tmpMapWidth, tmpMapHeight);
	mazeMap = createMaze(mapSize.width, mapSize.height);


	mazeMap[1][1] = 2;
	mazeMap[mapSize.width - 2][mapSize.height - 2] = 3;
	clearFlag = false;
}


var interval = Math.floor(1000 / 60 / 2);
window.onload = function () {
	"use strict";

	myDraw = new Draw(ctx);

	windowSize = new Size(window.innerWidth, window.innerHeight);

	canvas.addEventListener("reSize", function () {
		// //canvasサイズの設定
		// ctx.canvas.width = window.innerWidth; //ウィンドウ幅をキャンバス幅に。
		// ctx.canvas.height = window.innerHeight; //ウィンドウ高をキャンバス高に。
		windowSize = new Size(window.innerWidth, window.innerHeight);
	});

	canvas.addEventListener('mousemove', function (e) {
		var rect = e.target.getBoundingClientRect();
		oldMousePos.x = mousePos.x;
		oldMousePos.y = mousePos.y;
		mousePos.x = e.clientX - rect.left
		mousePos.y = e.clientY - rect.top
		update();
	}, false);

	setTimeout(draw, 0);
}
var oldMousePos = new Point(0, 0);
var mousePos = new Point(0, 0);
var mouseRadius = 5;
var circleRadius = 5;
var mouseClicked = false;

var windowSize = new Size(640, 480);

canvas.onmousedown = function (e) {
	"use strict";
	mouseClicked = true;
}



canvas.onmouseup = function (e) {
	"use strict";
	mouseClicked = false;
}



var circlePos = new Point(Math.floor(1.5 * chipSize.width), Math.floor(1.5 * chipSize.height));

function update() {
	var moved = new Size(mousePos.x - oldMousePos.x, mousePos.y - oldMousePos.y);
	var oldMapPos = new Point(Math.floor(circlePos.x / chipSize.width), Math.floor(circlePos.y / chipSize.height));
	// DebugOutput(ctx, getString(oldMapPos));
	// DebugOutput(ctx, getString(moved));


	var upMargin = 0;
	var downMargin = 0;
	var rightMargin = 0;
	var leftMargin = 0;


	// DebugOutput(ctx, getString("upMargin : ", upMargin));
	// DebugOutput(ctx, getString("downMargin : ", downMargin));
	// DebugOutput(ctx, getString("rightMargin : ", rightMargin));
	// DebugOutput(ctx, getString("leftMargin : ", leftMargin));

	// up
	for (var i = 1; i < mapSize.height; ++i) {
		if (mazeMap[oldMapPos.x][oldMapPos.y - i] == 1) {
			break;
		} else {
			upMargin++;
		}
	}
	upMargin = upMargin * chipSize.height + (circlePos.y % chipSize.height - circleRadius)
	// down
	for (var i = 1; i < mapSize.height; ++i) {
		if (mazeMap[oldMapPos.x][oldMapPos.y + i] == 1) {
			break;
		} else {
			downMargin++;
		}
	}
	downMargin = downMargin * chipSize.height + (chipSize.height - (circlePos.y % chipSize.height) - circleRadius);
	// right
	for (var i = 1; i < mapSize.width; ++i) {
		if (mazeMap[oldMapPos.x + i][oldMapPos.y] == 1) {
			break;
		} else {
			rightMargin++;
		}
	}
	rightMargin = rightMargin * chipSize.width + (chipSize.width - (circlePos.x % chipSize.width) - circleRadius);
	// left
	for (var i = 1; i < mapSize.height; ++i) {
		if (mazeMap[oldMapPos.x - i][oldMapPos.y] == 1) {
			break;
		} else {
			leftMargin++;
		}
	}
	leftMargin = leftMargin * chipSize.width + (circlePos.x % chipSize.width - circleRadius)

	// DebugOutput(ctx, getString("upMargin : ", upMargin));
	// DebugOutput(ctx, getString("downMargin : ", downMargin));
	// DebugOutput(ctx, getString("rightMargin : ", rightMargin));
	// DebugOutput(ctx, getString("leftMargin : ", leftMargin));

	// up補正
	if (moved.height <= -upMargin) {
		moved.height = -upMargin;
	}
	// down補正
	if (moved.height >= downMargin) {
		moved.height = downMargin;
	}
	// right補正
	if (moved.width >= rightMargin) {
		moved.width = rightMargin;
	}
	// left補正
	if (moved.width <= -leftMargin) {
		moved.width = -leftMargin;
	}

	if (mouseClicked == true) {
		circlePos.x += moved.width;
		circlePos.y += moved.height;
	}
	// reset
	oldMousePos.x = mousePos.x;
	oldMousePos.y = mousePos.y;

	if (clearFlag == false && mazeMap[Math.floor(circlePos.x / chipSize.width)][Math.floor(circlePos.y / chipSize.height)] == 3) {
		clearFlag = true;
		window.confirm("ゲームクリアー！おめでとう！");
	}

}

function draw() {
	"use strict";
	ctx.clearRect(0, 0, windowSize.width, windowSize.height);
	// SetDebugLine(33);

	update();

	// DebugOutput(ctx, getString("Mouse ", mousePos));
	// DebugOutput(ctx, getString("Window ", windowSize));
	// if (mouseClicked) {
	// 	DebugOutput(ctx, "mouseClicked: ture");
	// } else {
	// 	DebugOutput(ctx, "mouseClicked: false");
	// }


	for (var y = 0; y < mapSize.height; ++y) {
		for (var x = 0; x < mapSize.width; ++x) {
			var mapColor = new Color(0, 0, 0);
			switch (mazeMap[x][y]) {
				case 0:
					mapColor = new Color(255, 255, 255);
					break;
				case 1:
					mapColor = new Color(0, 0, 0);
					break;
				case 2:
					mapColor = new Color(130, 130, 255);
					break;
				case 3:
					mapColor = new Color(255, 100, 100);
					break;
			}
			myDraw.Rect(new Rectangle(new Point(x * chipSize.width, y * chipSize.height), chipSize), mapColor);
		}
	}

	myDraw.Circle(circlePos, mouseRadius, new Color(255, 0, 0));
	myDraw.Circle(mousePos, mouseRadius, new Color(150, 255, 150));

	ResetDebugLine();
	setTimeout(draw, 0);
}









// space
