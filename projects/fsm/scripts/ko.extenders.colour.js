define(['knockout'], function(ko) {
  
  var cache = {};
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext('2d');
  
  function parseColour(colour) {
    // The normalised colour is [r, g, b, a], where r,g & b are integers
    // in the range (0,255), and a is a float in the range (0,1).
  
    if (cache[colour]) {
      return cache[colour];
    }
  
    if (colour.length == 4 && typeof(colour) == 'object') {
      return colour;
    }
  
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, 1, 1);
    var colourData = ctx.getImageData(0, 0, 1, 1).data;
    cache[colour] = [
      colourData[0], colourData[1], colourData[2], colourData[3]
    ];
  
    return cache[colour];
  }

  ko.extenders.colour = function(target, option) {
    target(parseColour(target()));
    return ko.computed({
      read: target,
      write: function(newValue) {
        var current = target();
        newValue = parseColour(newValue);
        if (newValue != current) {
          target(newValue);
        }
      }
    });
  };
  
})