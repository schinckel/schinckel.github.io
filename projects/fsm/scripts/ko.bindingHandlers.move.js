define(['knockout'], function(ko) {

  ko.bindingHandlers.move = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var value = valueAccessor();
      // We expect there to be an x and a y on this.
      var allBindings = allBindingsAccessor();
      
      debugger;
      
      var begin = function(start) {
        
        var initial = {
          x: value.x(),
          y: value.y()
        };
        
        start.stopPropagation();
        start.preventDefault();
        
        function update(move) {
          // Move the element to ((move.x - start.x), (move.y - start.y))
          value.x(initial.x + (move.x - start.x));
          value.y(initial.y + (move.y - start.y));
        }
      
        function done(release) {
          document.removeEventListener('mousemove', update);
          document.removeEventListener('mouseup', done);
        }
        
        document.addEventListener('mousemove', update);
        document.addEventListener('mouseup', done);
      };
      
      element.addEventListener('mousedown', begin);
    }
  };
});