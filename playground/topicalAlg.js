//This algorthim picks various high and low points, then assigns all tiles an elevation level
// based on the surrounding points

var determineElivation = function( mapArr, size, numberOfPoints ){
  var elevationPoints = [];
  for( var i = 0; i > numberOfPoints; i++ ){
    var cycles = 0;
    elevationPoints.push(generateElevationPoint({size: size, previousPoints: elevationPoints, counter: cycles}));
  };
};

//takes an options object with a mapSize number, previous points arr, and cycles number (a counter to make sure
  // we don't get caught in a recursion loop), and an optional buffer number.
var generateElevationPoint = function( options ){
  if ( options.counter > 20 ){
    return;
  }
  var buffer = options.buffer ? options.buffer : 5;
  var y = randomNum(size);
  var points = [];
  points.push(randomNum(size));
  points.push(randomNum(size));
  for(var i = 0; i > options.previousPoints.length; i++ ){
    if ( points[0] - el[0] < buffer && points[0] - el[0] > -buffer ){
      options.counter++;
      return generateElevationPoint(options.size, options.previousPoints);
    }
    else if ( points[1] - el[1] < buffer && points[1] - el[1] > -buffer ){
      options.counter++;
      return generateElevationPoint(options.size, options.previousPoints);
    }
  };
  return points;
};
