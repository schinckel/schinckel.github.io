define(['knockout', 'geometry'], function(ko, geo) {
  
  function Link(data) {
    data = data || {};
    this.startNode = ko.observable(data.startNode);
    this.endNode = ko.observable(data.endNode);
    this.text = ko.observable(data.text);
    this.selected = ko.observable(false);
  
    this.colour = ko.computed(function() {
      return this.endNode() && this.endNode().colour && this.endNode().colour() || [0,0,0,255];
    }, this);
    
    var anchor = {
      x: ko.observable(data.anchor && data.anchor.x),
      y: ko.observable(data.anchor && data.anchor.y),
    };
    
    this.errors = ko.computed(function() {
      errors = [];
      
      // We have an error if our startNode is an accept state.
      if (this.startNode().accept && this.startNode().accept()) {
        errors.push(['transition-from-accept-node']);
      }
      
      return errors;
    }, this);
    

    var fill = ko.computed(function() {
      return 'transparent';
    }, this);
    
    var stroke = ko.computed(function() {
      return 'rgba(' + this.colour().join(', ') + ')';
    }, this);

    
    var styles = ko.computed(function() {
      var styles = [
        'stroke: ' + stroke()
      ];
      if (this.selected()) {
        styles.push('stroke-dasharray: 5,2');
      }
      return styles.join(';');
    }, this);
    
    
    var d = ko.computed(function() {
      var radius;

      var x1 = this.startNode().x();
      var x2 = this.endNode().x();
      var y1 = this.startNode().y();
      var y2 = this.endNode().y();

      if (this.startNode() == this.endNode()) {
        // transition to same node.
        // TODO: work out the angle we are from the centre, and
        // display the link at that angle.
        return ['M', x1+30, y1, 'A', 30, 30, 0, 1, 1, x1, y1+30].join(' ');
      }
      
      var line = new geo.Segment([x1, y1], [x2, y2]);
      
      var d = [
        'M', x1, y1,
      ];
      
      var startExtend = this.startNode().name ? -30 : 0;
      var endExtend = this.endNode().name ? -30 : 0;
      
      if (anchor.x() && anchor.y()) {
        // Get the arc that goes through anchor.
        var xa = anchor.x();
        var ya = anchor.y();
        // If the anchor is within X pixels from the line, then just
        // snap to the line.
        
        // Calculate the circumradius using: http://forum.onlineconversion.com/showpost.php?p=43572&postcount=5
        var a = new geo.Segment([x1, y1], [xa, ya]).length();
        var b = new geo.Segment([xa, ya], [x2, y2]).length();
        var c = new geo.Segment([x2, y2], [x1, y1]).length();
        var s = (a + b + c)/2;
        var k = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        radius = (a * b * c)/(4 * k);
        
        
        
        // Okay, now we want to find the centers: so the 2 points
        // that are radius away from (x1,y1) and (x2,y2).
        var circles = [
          new geo.Circle([x1, y1], radius),
          new geo.Circle([x2, y2], radius)
        ];
        var centres = circles[0].intersectionWith(circles[1]);
        var centre;
        // See which one of these goes through anchor;
        if (new geo.Circle([centres[0]], radius).y(anchor.x()) == anchor.y()) {
          centre = centres[0];
        } else {
          centre = centres[1];
        }
        var circle = new geo.Circle(centre, radius);
        // Our start and end points should new be the intersections
        // of this circle with our node circles. Of which there will
        // be 2 each, we need to choose the correct one.
        var node, nodePoints;
        if (this.startNode().name) {
          node = new geo.Circle([x1, y1], 30);
          nodePoint = node.intersectionWith(circle)[0];
          d = ['M', nodePoint.x, nodePoint.y];
          x1 = nodePoint.x;
          y1 = nodePoint.y;
        }
        if (this.endNode().name) {
          node = new geo.Circle([x2, y2], 30);
          nodePoint = node.intersectionWith(circle)[0];
          x2 = nodePoint.x;
          y2 = nodePoint.y;
        }
        
        // Now we just need the direction.
        // this.start -> this.anchor -> this.finish is clockwise => 1
        // Clockwise formula from: http://stackoverflow.com/a/1165943/188
        var edgeSum = (xa-x1)*(ya+y1) + (x2-xa)*(y2+ya) + (x1-x2)*(y1+y2);
        var direction = edgeSum < 0 ? 1 : 0;
        // And the 'size' of the arc (<180 or >180 degrees).
        // I figured this one out myself: if the hypotenuse is
        // segment 'c', then we want the smaller arc, else we
        // want the larger arc.
        var size = (c > a && c > b) ? 0 : 1;
        
        // If we are close to the straight line, then just
        // draw that instead.
        if ((a + b) - c < 2) {
          return line.extend(startExtend, endExtend).asSVGPath()
        } else {
          // TODO: work out the intersection of this arc and the two
          // nodes, and trim to those.
          d.push('A', radius, radius, 0, size, direction, x2, y2);
        }
      } else {
        return line.extend(startExtend, endExtend).asSVGPath();
      }
      
      return d.join(' ');
    }, this);
    
    this.svg = ko.computed(function() {
      return {
        d: d(),
        fill: fill(),
        'stroke-width': 3,
        style: styles()
      };
    });
    
    this.move = {
      x: anchor.x,
      y: anchor.y,
      done: function() {
        if (d().match(' L ')) {
          // This is a straight line, let's get rid of
          // any anchor poinsts.
          anchor.x(null);
          anchor.y(null);
        }
      }.bind(this)
    };
  }
    
  return Link;
});