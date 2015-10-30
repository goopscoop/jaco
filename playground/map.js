var tiles = {
  "tiles": [
    {
      "name": "grass",
      "sym": "G"
    },
    {
      "name": "plains",
      "sym": "P"
    },
    {
      "name": "ocean",
      "sym": "O"
    },
    {
      "name": "river",
      "sym": "R"
    }
  ]
};

// Write a function that takes a minumum number of parameters
// and returns a dynamically created map.
// PARAMETERS:
// River, lakes, none
// Size
// Tropical, Temperate, Arid

//main function. Parameters, size - num (req.), tileSet(req.) water - string (opt.), temp - string (opt.)
var generateMap = function( tileSet, size, water, temp ){
  var map = createBlankMapCanvas(size)
  createRiver(map, tileSet, size);
  //Outputs finished map
  return map;
};

// Creates a three dementional array and fills it with null values.
// Each array represents a new row, each null represents a new tile or column
var createBlankMapCanvas = function(size){
  var map = [];
  for ( var i = 0; i < size; i++ ){
    var row = [];
    for ( var j = 0; j < size; j++){
      row.push(null);
    }
    map.push(row);
  }
  return map;
};

var createRiver = function( mapArr, tileSet, size ){
  // 0 = N, 1 = E, 2 = S, 3 = W
  var startingSide = randomNum(4);
  var init = initializeStartLocation(startingSide, size);
  var row = init.row;
  var col = init.col;
  var toBuild = true;
  var previousDirection = init.dir;
  var favorDirection = init.numDir;
  console.log(favorDirection)
  mapArr[row].splice(col, 1, tileSet[3]);

  // itterates over the arrays, returning message 'fin' when it reaches an edge
  // ending the river
  while ( toBuild ) {
    // keys in moveOneRow obj mapArr, add, previousRow, previousCol, size, dirToMove, direction
    var hasMoved = moveOneRow({
      mapArr: mapArr,
      add: tileSet[3],
      previousRow: row,
      previousCol: col,
      size: size,
      dirToMove: moveWhichDirection(previousDirection, favorDirection),
      direction: previousDirection })
    if ( hasMoved.msg === 'fin' ){
      toBuild = false;
    } else {
      previousDirection = hasMoved.dir
      if ( hasMoved.dir === 'east' ) {
        col++;
      } else if ( hasMoved.dir === 'south' ){
        row++;
      } else if ( hasMoved.dir === 'west' ){
        col--;
      } else if ( hasMoved.dir === 'north' ){
        row--;
      }
    }
  }
};

var returnOpositeDirection = function(previousDir){
  switch (previousDir) {
    case 0 || 'north':
      return {num: 2, dir: 'south'};
    case 1 || 'east':
      return {num: 3, dir: 'west'};
    case 2 || 'south':
      return {num: 0, dir: 'north'};
    case 3 || 'west':
      return {num: 1, dir: 'east'};
  };
}

var moveWhichDirection = function(previousDir, favorDirection){
  // 0 = N, 1 = E, 2 = S, 3 = W
  var newDirection = randomNum(5);

  if ( previousDir === 'south' && newDirection === 0 ){
    moveWhichDirection(previousDir);
  }
  else if ( previousDir === 'west' && newDirection === 1 ){
    moveWhichDirection(previousDir);
  }
  else if ( previousDir === 'north' && newDirection === 2 ){
    moveWhichDirection(previousDir);
  }
  else if ( previousDir === 'east' && newDirection === 3 ){
    moveWhichDirection(previousDir);
  }
  else if ( newDirection === 4 ){
    return favorDirection;
  }

  return newDirection;
}

var initializeStartLocation = function(startingSide, size){
  if ( startingSide === 0 ) {
    return { row: 0, col: randomNum( size ), dir: 'south', numDir: 2 };
  }
  else if( startingSide === 1 ){
    return { row: randomNum( size ), col: ( size - 1 ), dir: 'west', numDir: 3 };
  }
  else if( startingSide === 2 ){
    return { row: ( size - 1 ), col: randomNum(size), dir: 'north', numDir: 0 };
  }
  else if( startingSide === 3 ){
    return { row: randomNum(size), col: 0, dir: 'east', numDir: 1 };
  }
};

// takes and options object which includes the map array, tile to add, and other args, and based on the dirToMove adds
// the tile to add to the appropriate place, returning an object with msg and the
// direction moved. If cannot place element, returns an object with msg: fin signaling
// that it's time to end the algorithm
// mapArr, add, previousRow, previousCol, size, dirToMove, direction
var moveOneRow = function( options ){
  if ( options.dirToMove === 0 && !edgeOfMapReached( options.previousRow, options.previousCol, options.size, options.direction ).north() ){
    options.mapArr[(options.previousRow - 1)].splice( options.previousCol, 1, options.add );
    return { msg: 'contiue', dir: 'north' }
  }
  else if ( options.dirToMove === 1 && !edgeOfMapReached( options.previousRow, options.previousCol, options.size, options.direction ).east() ){
    options.mapArr[ options.previousRow ].splice(( options.previousCol + 1 ), 1, options.add );
    return { msg: 'contiue', dir: 'east' };
  }
  else if ( options.dirToMove === 2 && !edgeOfMapReached( options.previousRow, options.previousCol, options.size, options.direction ).south() ){
    options.mapArr[( options.previousRow + 1 )].splice( options.previousCol, 1, options.add );
    return { msg: 'contiue', dir: 'south' };
  }
  else if ( options.dirToMove === 3 && !edgeOfMapReached( options.previousRow, options.previousCol, options.size, options.direction ).west() ){
    options.mapArr[(options.previousRow)].splice(( options.previousCol - 1 ), 1, options.add );
    return { msg: 'contiue', dir: 'west' };
  }
  else {
    return { msg: 'fin' };
  }
};

var clearOfMapEdge = function( previousRow, previousCol, size, direction ){
  return edgeOfMapReached( previousRow, previousCol, size, direction ).north()
    && edgeOfMapReached( previousRow, previousCol, size, direction ).east()
    && edgeOfMapReached( previousRow, previousCol, size, direction ).south()
    && edgeOfMapReached( previousRow, previousCol, size, direction ).west()
    ? true : false;
};

var edgeOfMapReached = function( previousRow, previousCol, size, direction ){
  return {
    north: function(){
      return direction === 'north' && previousRow === 0 ? true : false;
    },
    east: function(){
      return direction === 'east' && previousCol === ( size - 1 ) ? true : false;
    },
    south: function(){
      return direction === 'south' && previousRow === ( size - 1 ) ? true : false;
    },
    west: function(){
      return direction === 'west' && previousCol === 0 ? true : false;
    }
  }
};

var randomNum = function(ceil, floor){
  return Math.floor(Math.random() * ceil) + (floor ? floor : 0 );
};

var drawMap = function(map){
  var mapElements = '<div>';
  map.forEach(function(el){
    mapElements += '<div class="pure-g">';
    el.forEach(function(element, index){
      mapElements += '<div class="pure-u-1-24">' + (element ? element.sym : null) + '</div>';
    });
    mapElements += '</div>';
  });
  mapElements += '</div>'
  return mapElements;
};

var tempMap = generateMap(tiles.tiles, 24);
var drawnMap = drawMap(tempMap);
// console.log(tempMap);
console.log('hello world')
document.getElementById('app').innerHTML = drawnMap;

