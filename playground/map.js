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
  // var startingSide = randomNum(4);
  var startingSide = 0;
  if ( startingSide === 0 ) {
    var toBuild = true;
    var row = 0;
    var col = randomNum(size);
    mapArr[0].splice(col, 1, tileSet[3]);
    while ( toBuild ) {
      var direction = moveOneRow( mapArr, tileSet[3], row, col, size, 1 )
      if ( direction.msg === 'fin' ){
        toBuild = false;
      } else {
        if ( direction.dir === 'east' ) {
          col ++;
        } else if ( direction.dir === 'south' ){
          row ++;
        }
      }
    }
  }
};


var moveOneRow = function( mapArr, add, previousRow, previousCol, size, direction ){
  if( previousRow !== (size - 1) && previousCol !== (size - 1) ){
    if ( direction === 1 ){
      console.log('right')
      mapArr[previousRow].splice((previousCol + 1), 1, add);
      return { msg: 'contiue', dir: 'east' };
    }

    if ( direction === 2 ){
      console.log('down')
      mapArr[(previousRow + 1)].splice(previousCol, 1, add );
      return { msg: 'contiue', dir: 'south' };
    }
  } else {
    return { msg: 'fin' };
  }
}

var randomNum = function(ceil, floor){
  return Math.floor(Math.random() * ceil) + (floor ? floor : 0 );
}

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

