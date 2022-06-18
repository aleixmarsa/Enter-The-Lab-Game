const mapImg = "./images/maps/map_lvl1.png";

/*1--> wall/item   2--> items you can't pass through but can be shot through  
3--> enemy free zone (initial area) 0--> no obstacles/wall*/
const mapArray = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 3, 3, 1, 1, 1, 1, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 3,
  3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3,
  2, 2, 2, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3,
  3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 3,
  3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 3,
  3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 1, 1, 1, 0, 2, 2, 2, 0, 0, 1, 0, 0,
  0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  3, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
  0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
  0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
  1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 2, 1, 1,
  2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 1, 1, 2, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1,
];

//Creates collision matrix from the colision array
function createCollisionArray(mapCollisionArray) {
  let collisionArrayRows = [];
  let rowSize = map.width / celPixels;
  for (let i = 0; i < rowSize; i++) {
    collisionArrayRows.push(
      mapCollisionArray.slice(i * rowSize, (i + 1) * rowSize)
    );
  }
  return collisionArrayRows;
}

//Builds from the array
function buildNodes() {
  // create columns
  var nodeColumns = [];
  var columnCount = collisionArray[0].length;
  var rowCount = collisionArray.length;
  for (var col = 0; col < columnCount; ++col) {
    nodeColumns.push([]);
    for (var row = 0; row < rowCount; ++row) {
      var rowLabel = "node_c" + col + "_r" + row;
      var x = col * celPixels;
      var y = row * celPixels;
      var node = new Pathfinder.node(col, row, true);
      node.px_x = x;
      node.px_y = y;
      node.label = rowLabel;
      nodeColumns[col].push(node);
    }
  }
  return nodeColumns;
}

function checkMap() {
  if (totalEnemies.length === 0) {
    map.image.src = "./images/maps/map_lvl1_open.png";
    map_done = true;
  }
}

function spawnMap() {
  map = new GameObject(mapImg, 0, 0, 800, 800);
}
