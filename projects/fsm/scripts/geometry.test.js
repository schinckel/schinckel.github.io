QUnit.config.autostart = false;
require(['geometry'], function(geo) {
  
  test('Point constructor', function() {
    var point;
    
    point = new geo.Point(1,3);
    ok(point.x === 1);
    ok(point.y === 3);
    
    point = new geo.Point([4, 7]);
    ok(point.x === 4);
    ok(point.y === 7);
    
    point = new geo.Point({x: 223, y: -23});
    ok(point.x === 223);
    ok(point.y === -23);
    
    point = new geo.Point({x: 0, y: 3});
    ok(point.x == 0);
    ok(point.y == 3);
  });
  
  test('Line constructor', function() {
    var line;
    
    line = new geo.Line(1, 2, 3);
    ok(line.a == 1);
    ok(line.b == 2);
    ok(line.c == 3);
    
    throws(
      function() {
        new geo.Line(0, 0, 1);
      }
    )
    // assertRaises?
    // line = new geo.Line(0, 0, 1);
    
    line = new geo.Line([2, 3, 4]);
    ok(line.a == 2);
    ok(line.b == 3);
    ok(line.c == 4);
    
    throws(function(){ new geo.Line([0, 0, 100])});
    
    line = new geo.Line({a: 3, b: 4, c: -33});
    ok(line.a == 3);
    ok(line.b == 4);
    ok(line.c == -33);
    
    throws(function() {new geo.Line({a: 0, b: 0, c: 8})});
    
    line = new geo.Line({a: 0, b: 5, c: 66});
    ok(line.a == 0);
    ok(line.b == 5);
    ok(line.c == 66);
  });
  
  test('Line().x/y', function() {
    var line;
    
    line = geo.Line.fromTwoPoints([5,-1], [2,2]);
    ok(line.y(5) == -1);
    ok(line.x(-1) == 5);
    ok(line.y(2) == 2);
    ok(line.x(2) == 2);
    ok(line.y(0) == 4);
    ok(line.x(0) == 4);
    
    ok(line.gradient() == -1);
    ok(line.y_intercept() == 4);
  });
  
  test('Line.fromTwoPoints', function() {
    var line;
    
    line = geo.Line.fromTwoPoints([0, 3], [4, 0]);
    ok(line.a == 3);
    ok(line.b == 4);
    ok(line.c == -12);
    
    line = geo.Line.fromTwoPoints([0, 8], [-6, 0]);
    ok(line.a == 8);
    ok(line.b == -6);
    ok(line.c == 48);
    
    line = geo.Line.fromTwoPoints([0,0], [0, 10]);
    ok(line.a == 1);
    ok(line.b == 0);
    ok(line.c == 0);
  });
  
  test('Line.fromPointAndGradient', function() {
    var line;
    
    line = geo.Line.fromPointAndGradient([0, 0], 1);
    ok(line.a == 1);
    ok(line.b == -1);
    ok(line.c == 0);
    ok(line.x_intercept() == 0);
    ok(line.y_intercept() == 0);
  });
  
  test('new Segment().asLine', function() {
    var seg, line;
    
    seg = new geo.Segment([0,0], [10,10]);
    line = seg.asLine();
    
    ok(seg.gradient() == line.gradient());
    
    seg = new geo.Segment([0,0], [3,4]);
    line = seg.asLine();
    ok(seg.gradient() == line.gradient());
    ok(line.y(-3) == -4);
  });
  
  test('Segment.extend', function() {
    var seg;

    seg = new geo.Segment([0,0], [3, 4]);
    seg = seg.extend(5, 5);
    
    ok(seg.start.x == -3);
    ok(seg.start.y == -4);
    ok(seg.finish.x == 6);
    ok(seg.finish.y == 8);
    
  });
  
  test('Circle.x/y', function() {
    var circle;
    
    circle = new geo.Circle([1,1], 1);
    ok(circle.x(0) == 1);
    ok(circle.y(0) == 1);
    // Can't do [a,b] == [a,b].
    ok(circle.x(1)[0] == 0);
    ok(circle.x(1)[1] == 2);
    ok(circle.x(2) == 1);
    
    circle = new geo.Circle([2,3], 5);
    ok(circle.y(-2)[0] == 0);
    ok(circle.y(-2)[1] == 6)
    ok(circle.y(2)[0] == -2);
    ok(circle.y(2)[1] == 8);
  });
  
  test('Circle.fromTwoPoints', function() {
    var circle;
    
    circle = geo.Circle.fromTwoPoints([2,3], [-2,0]);
    ok(circle.radius() == 5);
  });
  
  test('Circle intersections', function() {
    var c1, c2;
    
    c1 = new geo.Circle([2,3], 5);
    c2 = new geo.Circle([2, -3], 1);
    
    debugger;
    
    ok(c1.intersectionWith(c2).x == 2);
    ok(c1.intersectionWith(c2).y == -2);
  });
  QUnit.start();
});