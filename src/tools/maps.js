// Takes hieght and width and returns a map grid of that size
let generateMap = ({height, width}) => {
  let map = [];
  for (let i = 1; i < height; i ++) {
    for (let j = 1; j < width; j++ ) {
      map.push('hi');
    }
  }
  return map;
};

export default generateMap;
