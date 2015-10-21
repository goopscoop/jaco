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
  var direction = 'south';
  mapArr[row].splice(col, 1, tileSet[3]);

  // itterates over the arrays, returning message 'fin' when it reaches an edge
  // ending the river
  while ( toBuild ) {
    var hasMoved = moveOneRow( mapArr, tileSet[3], row, col, size, 0, direction )
    console.log( hasMoved )
    if ( hasMoved.msg === 'fin' ){
      toBuild = false;
    } else {
      direction = hasMoved.dir
      if ( hasMoved.dir === 'east' ) {
        col++;
      } else if ( hasMoved.dir === 'south' ){
        console.log(row)
        row++;
      } else if ( hasMoved.dir === 'west' ){
        col--;
      } else if ( hasMoved.dir === 'north' ){
        row--;
      }
    }
  }
};

var initializeStartLocation = function(startingSide, size){
  if ( startingSide === 0 ) {
    return { row: 0, col: randomNum( size ) };
  } else if( startingSide === 1 ){
    return { row: randomNum( size ), col: ( size - 1 ) };
  } else if( startingSide === 2 ){
    return { row: ( size - 1 ), col: randomNum(size) };
  } else if( startingSide === 3 ){
    return { row: randomNum(size), col: 0 };
  }
};

// takes the map array, tile to add, and other args, and based on the dirToMove adds
// the tile to add to the appropriate place, returning an object with msg and the
// direction moved. If cannot place element, returns an object with msg: fin signaling
// that it's time to end the algorithm
var moveOneRow = function( mapArr, add, previousRow, previousCol, size, dirToMove, direction ){
  if ( dirToMove === 0 && !edgeOfMapReached( previousRow, previousCol, size, direction ).north() ){
    mapArr[(previousRow - 1)].splice( previousCol, 1, add );
    return { msg: 'contiue', dir: 'north' }
  } else if ( dirToMove === 1 && !edgeOfMapReached( previousRow, previousCol, size, direction ).east() ){
    mapArr[ previousRow ].splice(( previousCol + 1 ), 1, add );
    return { msg: 'contiue', dir: 'east' };
  } else if ( dirToMove === 2 && !edgeOfMapReached( previousRow, previousCol, size, direction ).south() ){
    mapArr[( previousRow + 1 )].splice( previousCol, 1, add );
    return { msg: 'contiue', dir: 'south' };
  } else if ( dirToMove === 3 && !edgeOfMapReached( previousRow, previousCol, size, direction ).west() ){
    mapArr[(previousRow)].splice(( previousCol - 1 ), 1, add );
    return { msg: 'contiue', dir: 'west' };
  } else {
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

