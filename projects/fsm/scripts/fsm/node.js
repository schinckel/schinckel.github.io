define(['knockout', 'ko.extenders.toggle'], function(ko) {

  var svg = document.createElement('svg');
  var text = document.createElement('text');
  svg.appendChild(text);
  
  function Node(data) {
    data = data || {};
    this.x = ko.observable(data.x);
    this.y = ko.observable(data.y);
    this.name = ko.observable(data.name);
    this.colour = ko.observable(data.colour).extend({colour: true});
    this.accept = ko.observable(data.accept || false).extend({toggle: true});
    this.selected = ko.observable(false);
    
    var rgbColour = ko.computed(function() {
      return 'rgba(' + this.colour().join(',') + ')';
    }, this);
    
    var style = ko.computed(function() {
      var styles = [
        'fill: transparent', //rgba(255, 255, 255, 1)',
        'stroke: ' + rgbColour()
      ];
      if (this.selected()) {
        styles.push('stroke-dasharray: 5,2')
      }
      return styles.join(';');
    }, this);
  
    this.svg = ko.computed(function() {
      return {cx: this.x(), cy: this.y(), r: 30, style: style()};
    }, this);
  
    this.svgAccept = ko.computed(function() {
      return {cx: this.x(), cy: this.y(), r: 25, style: style()};
    }, this);
    
    this.svgText = ko.computed(function() {
      return {
        x: this.x(), y: this.y() + 5,
        'text-anchor': 'middle',
        fill: rgbColour()
      };
    }, this);
    
    this.toggleAccept = function(data, evt) {
      evt.stopPropagation();
      this.accept(!this.accept());
    }.bind(this);
    
    
    this.move = {
      x: this.x,
      y: this.y,
      done: function(data, evt) {
        
      }.bind(this)
    }
  }
  
  // Node.prototype.toggleAccept = function(data, evt) {
//     debugger;
//     data.accept(!data.accept());
//   };
//   
  return Node;
});