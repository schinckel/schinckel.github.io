define([], function() {
  
  // Can be called with new Point(x,y), or new Point({x: x, y: y}),
  // or new Point(<point-object>), or anything with an x and a y property.
  function Point(x, y) {
    if (x.x != undefined) {
      this.x = Number(x.x);
      this.y = Number(x.y);
    } else if (x.length == 2 && y == undefined) {
      this.x = Number(x[0]);
      this.y = Number(x[1]);
    } else {
      this.x = Number(x);
      this.y = Number(y);
    }
  }
  
  Point.prototype.distanceTo = function distanceTo(point) {
    point = new Point(point);
    return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
  };
  
  function Segment(start, finish) {
    this.start = new Point(start);
    this.finish = new Point(finish);
  }

  Segment.prototype.midpoint = function midpoint() {
    return new Point(
      (this.start.x + (this.start.x - this.finish.x)/2),
      (this.start.y + (this.start.y - this.finish.y)/2)
    );
  }

  Segment.prototype.gradient = function gradient() {
    if (this.start.y == this.finish.y) {
      return Infinity;
    }
    return (this.start.x - this.finish.x) / (this.start.y - this.finish.y);
  }

  Segment.prototype.length = function length() {
    return Math.sqrt(
      Math.pow(this.start.x - this.finish.x, 2) + 
      Math.pow(this.start.y - this.finish.y, 2)
    );
  }

  Segment.prototype.normal = function normal(point) {
    if (isFinite(this.gradient()) && this.gradient()) {
      return Line.fromPointAndGradient(point, 1/this.gradient());
    }
    throw new Error('Not implemented');
  }
  
  Segment.prototype.asLine = function asLine() {
    return Line.fromTwoPoints(this.start, this.finish);
  }
  
  Segment.prototype.intersectionWith = function intersectionWith(other) {
    if (other instanceof Circle) {
      
    }
  };
  
  Segment.prototype.extend = function extend(startDistance, endDistance) {
    var gradient = this.gradient();
    var factor = Math.sqrt(1 + Math.pow(gradient, 2));
    var line = this.asLine();
    
    var startDy = startDistance / factor;
    // If this.start.x < this.finish.x, then we want to subtract
    // the horizontal component of startDistance, else we add it.
    var newStart, newStartY;
    if (this.start.y < this.finish.y) {
      newStartY = this.start.y - startDy;
    } else {
      newStartY = this.start.y + startDy;
    }
    var newStart = new Point(line.x(newStartY), newStartY);
    
    var endDy = endDistance / factor;
    var newEnd, newEndY;
    if (this.start.y < this.finish.y) {
      newEndY = this.finish.y + endDy;
    } else {
      newEndY = this.finish.y - endDy;
    }
    var newEnd = new Point(line.x(newEndY), newEndY);
    
    return new Segment(newStart, newEnd);
  };
  
  Segment.prototype.asSVGPath = function asSVGPath() {
    return ['M', this.start.x, this.start.y, 'L', this.finish.x, this.finish.y].join(' ');
  };
    
  function Line(data, b, c) {
    if (data.a != undefined) {
      this.a = Number(data.a);
      this.b = Number(data.b);
      this.c = Number(data.c);
    } else if (data.length == 3) {
      this.a = Number(data[0]);
      this.b = Number(data[1]);
      this.c = Number(data[2]);
    } else {
      this.a = Number(data);
      this.b = Number(b);
      this.c = Number(c);
    }
    
    if (this.a == 0 && this.b == 0) {
      throw new Error('Invalid line parameters.');
    }
    
    // Normalise so a >= 0;
    if (this.a < 0) {
      this.a = this.a * -1;
      this.b = this.b * -1;
      this.c = this.c * -1;
    }
    
    // Remove common factors?
    if (this.a == 0 && this.c == 0) {
      this.b = this.b < 0 ? -1 : 1;
    }
    
    if (this.b == 0 && this.c == 0) {
      this.a = this.a < 0 ? -1 : 1;
    }
  }

  Line.prototype.x = function x(y) {
    return (-this.b * y - this.c) / this.a;
  };
  
  Line.prototype.x_intercept = function x_intercept() {
    return -this.c / this.a;
  };

  Line.prototype.y = function y(x) {
    return (-this.a * x - this.c) / this.b;
  };
  
  Line.prototype.y_intercept = Line.prototype.intercept = function intercept() {
    return -this.c / this.b;
  };

  Line.prototype.gradient = Line.prototype.slope = function gradient() {
    return -this.b / this.a;
  };
    
  Line.prototype.intersectionWith = function(other) {
    if (other instanceof Line) {
      // If the two lines are parallel, they never intersect.
      if (this.gradient() == other.gradient()) {
        return null;
      }
      
      var y = (this.a * other.c - this.c * other.a) / (this.b * other.a - this.a * other.b);
      
      return new Point(this.x(y), y);
    }
    
    if (other instanceof Circle) {
      
    }
  };
  
  Line.fromTwoPoints = function(point1, point2) {
    point1 = new Point(point1);
    point2 = new Point(point2);
    return new Line({
      a: point1.y - point2.y,
      b: point2.x - point1.x,
      c: (point1.x - point2.x) * point1.y + (point2.y - point1.y) * point1.x
    });
  };
  
  Line.fromPointAndGradient = function(point, gradient) {
    point = new Point(point);
    return new Line({
      a: gradient,
      b: -1,
      c: gradient * point.x - point.y
    });
    
    point = new Point(point);
    var otherPoint = new Point()
    // Formula y-y1 = m(x-x1): we want x = 0.
    // -> c = m(-x1) + y1
    return new Line({m: gradient, c: gradient * -point.x + point.y});
  }

  function Circle(point, radius) {
    point = new Point(point);
    this.a = -point.x;
    this.b = -point.y;
    this.r = Math.abs(radius);
  }
  
  Circle.prototype.centre = function centre() {
    return new Point(-this.a, -this.b);
  };
  
  Circle.prototype.radius = function radius() {
    return this.r;
  };
  
  Circle.prototype.x = function x(y) {
    var discriminant = Math.pow(this.r, 2) - Math.pow(y + this.b, 2);
    if (discriminant < 0) {
      return null;
    }
    if (discriminant == 0) {
      return -this.a;
    }
    discriminant = Math.sqrt(discriminant);
    return [-this.a + discriminant, -this.a - discriminant].sort();
  };
  
  Circle.prototype.y = function y(x) {
    var discriminant = Math.pow(this.r, 2) - Math.pow(x + this.a, 2);
    if (discriminant < 0) {
      return null;
    }
    if (discriminant == 0) {
      return -this.b;
    }
    discriminant = Math.sqrt(discriminant);
    return [-this.b + discriminant, -this.b - discriminant].sort();
  };
  
  Circle.prototype.intersectionWith = function intersectionWith(other) {
    if (other instanceof Line) {
      return other.intersectionWith(this);
    }
    if (other instanceof Circle) {
      var a = -this.a,
          b = -this.b,
          c = -other.a,
          d = -other.b,
          r = this.r,
          s = other.r;
      
      var e = c - a;
      var f = d - b;
      var p = Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2));
      var k = (Math.pow(p, 2) + Math.pow(r, 2) - Math.pow(s, 2)) / (2 * p);
      
      var disc = Math.pow(r, 2) - Math.pow(k, 2);
      if (disc < 0) {
        return null;
      }
      disc = Math.sqrt(disc);
      var x1 = a + e * k / p + (f / p) * disc;
      var y1 = b + f * k / p - (e / p) * disc;
      
      if (disc == 0) {
        return new Point(x1, y1);
      }
      
      var x2 = a + e * k / p - (f / p) * disc;
      var y2 = b + f * k / p + (f / p) * disc;
      
      return [new Point(x1, y1), new Point(x2, y2)];
    }
  };
  
  Circle.fromTwoPoints = function fromTwoPoints(centre, point) {
    centre = new Point(centre);
    return new Circle(centre, centre.distanceTo(point))
  };
  
  Circle.fromThreePoints = function fromThreePoints(point1, point2, point3) {
    
  };
  

  function Arc(start, finish, radius, size, direction) {
    this.start = new Point(start);
    this.finish = new Point(finish);
    this.radius = Number(radius);
    this.size = boolean(size);
    this.direction = boolean(direction);
  }
  
  Arc.prototype.centre = function centre() {
    
  };
  
  
  
  Arc.prototype.asCircle = function asCircle() {
    return new Circle(this.centre(), this.radius);
  };
  
  
  
  return {
    Point: Point,
    Segment: Segment,
    Line: Line,
    Circle: Circle
  };

});