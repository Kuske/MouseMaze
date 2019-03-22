var Path = 0;
var Wall = 1;

var Maze = [];
// width, heightは奇数
function createMaze(width, height) {

	// 奇数にする
	if (width % 2 == 0) {
		width -= 1;
	}
	if (height % 2 == 0) {
		height -= 1;
	}

	//for文で要素を格納する
	for (var i = 0; i < width; i++) {
		//配列の要素数を指定する
		Maze[i] = [];
	}

	// 全てを壁で埋める
	// 穴掘り開始候補(x,yともに偶数)座標を保持しておく
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
				Maze[x][y] = Path; // 外壁は判定の為通路にしておく(最後に戻す)
			} else {
				Maze[x][y] = Wall;
			}
		}
	}

	Dig(1, 1);


	// 外壁を戻す
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
				Maze[x][y] = Wall;
			}
		}
	}


	return Maze;
}





var StartCells = new List();


function Cell(x, y) {
	this.x = x;
	this.y = y;
}

// 方向
var Direction = {
	Up: 0,
	Right: 1,
	Down: 2,
	Left: 3,
}

// 座標(x, y)に穴を掘る
function Dig(x, y) {
	// 指定座標から掘れなくなるまで堀り続ける
	while (true) {
		// 掘り進めることができる方向のリストを作成
		var directions = new List();
		if (Maze[x][y - 1] == Wall && Maze[x][y - 2] == Wall)
			directions.Add(Direction.Up);
		if (Maze[x + 1][y] == Wall && Maze[x + 2][y] == Wall)
			directions.Add(Direction.Right);
		if (Maze[x][y + 1] == Wall && Maze[x][y + 2] == Wall)
			directions.Add(Direction.Down);
		if (Maze[x - 1][y] == Wall && Maze[x - 2][y] == Wall)
			directions.Add(Direction.Left);

		// 掘り進められない場合、ループを抜ける
		if (directions.Count == 0) break;

		// 指定座標を通路とし穴掘り候補座標から削除
		SetPath(x, y);
		// 掘り進められる場合はランダムに方向を決めて掘り進める
		var dirIndex = getRand(directions.Count);
		// 決まった方向に先2マス分を通路とする
		switch (directions.data[dirIndex]) {
			case Direction.Up:
				SetPath(x, --y);
				SetPath(x, --y);
				break;
			case Direction.Right:
				SetPath(++x, y);
				SetPath(++x, y);
				break;
			case Direction.Down:
				SetPath(x, ++y);
				SetPath(x, ++y);
				break;
			case Direction.Left:
				SetPath(--x, y);
				SetPath(--x, y);
				break;
		}
	}

	// どこにも掘り進められない場合、穴掘り開始候補座標から掘りなおし
	// 候補座標が存在しないとき、穴掘り完了
	var cell = GetStartCell();
	if (cell != null) {
		Dig(cell.x, cell.y);
	}
}

/////////////ここまではやった

// 座標を通路とする(穴掘り開始座標候補の場合は保持)
function SetPath(x, y) {
	Maze[x][y] = Path;
	if (x % 2 == 1 && y % 2 == 1) {
		// 穴掘り候補座標
		StartCells.Add(new Cell(x, y));
	}
}

// 穴掘り開始位置をランダムに取得する
function GetStartCell() {
	if (StartCells.Count == 0) return null;

	// ランダムに開始座標を取得する
	var index = getRand(StartCells.Count);
	var cell = StartCells.data[index];
	StartCells.RemoveAt(index);

	return cell;
}









// space
