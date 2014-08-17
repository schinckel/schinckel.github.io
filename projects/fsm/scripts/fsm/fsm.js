define([
  'knockout',
  'fsm/node', 'fsm/link',
  'geometry',
  'ko.extenders.colour',
  'ko.delegatedEvents',
  // 'ko.bindingHandlers.move'
], function(ko, Node, Link, G) {
  
  // Essentially, this is an under-construction link.
  function Point(data) {
    var point = new G.Point(data);
    this.x = ko.observable(point.x);
    this.y = ko.observable(point.y);
    this.done = function(data, done) {
      var target = ko.dataFor(done.target);
      if (target.x) {
        data.endNode(target);
      } else {
        target.links.remove(data);
      }
    };
  }
  
  function FSM(data) {
    // A Finite State Machine is made up of nodes and links.
    this.nodes = ko.observableArray();
    this.links = ko.observableArray();
    
    ko.utils.arrayForEach(data, function(el) {
      if (el.endNode) {
        this.links().push(new Link(el));
      } else {
        this.nodes().push(new Node(el));
      }
    }.bind(this));
  
    this.nodes.notifySubscribers();
    this.links.notifySubscribers();
    
    // We may need to operate on a Node/Link.
    // Does this need to be exposed as an attribute? Or can it be hidden.
    this.selectedElement = ko.observable();
    
    // Event handler for selecting a Node or Link.
    // Deselects the previous selection. If the click is
    // not on a Node/Link, then this means no selection.
    this.select = function select(data, evt) {
      var previousSelection = this.selectedElement();
      if (previousSelection) {
        previousSelection.selected(false);
      }
      data = ko.dataFor(evt.target);
      if (this == data) {
        this.selectedElement(null);
      } else {
        this.selectedElement(data);
        data.selected(true);
      }
    }.bind(this);
    
    function mousedown(data, start) {
      data = ko.dataFor(start.target);
      var moveTarget, link;
      
      if (start.shiftKey) {        
        // We are creating a new link.
        var linkData = {
          startNode: data,
          endNode: data
        };
        
        if (this == data) {
          linkData.startNode = new Point(start);
          linkData.endNode = new Point(start.x + 0.1, start.y);
        }
        
        link = new Link(linkData);
        
        this.links.push(link);
        
        moveTarget = new Point(start);
        
      } else if (data.move) {
        // If we are at or near the start of a start link, then
        // we want to move that.
        moveTarget = data.move;
      }
      
      if (moveTarget) {
        start.stopPropagation();
        
        var initial = {
          x: moveTarget.x() || start.x,
          y: moveTarget.y() || start.y
        };
        // We are moving this object around.
        function update(move) {
          moveTarget.x(initial.x + (move.x - start.x));
          moveTarget.y(initial.y + (move.y - start.y));
          
          // If we are moving a point, and we move over a Node,
          // then snap to that.
          
          if (moveTarget instanceof Point){
            var node = ko.dataFor(move.target);
            if (node instanceof Node) {
              link.endNode(node);
            } else {
              link.endNode(moveTarget);
            }
          }
        }
        
        function release(done) {
          document.removeEventListener('mousemove', update);
          document.removeEventListener('mouseup', release);
          if (moveTarget.done) {
            moveTarget.done(link || moveTarget, done);
          }
        }
      
        document.addEventListener('mousemove', update);
        document.addEventListener('mouseup', release);
      }
      
    }
    
    this.mousedown = mousedown;
    
    // Event handler for creating a new Node.
    this.newNode = function(data, evt) {
      var newNode = new Node({
        x: evt.x, y: evt.y, colour: '#000'
      });
      this.nodes.push(newNode);
      return newNode;
    }.bind(this);
    
    // Event handler for creating a new Link
    this.newLink = function(data, evt) {
      // If data is the root object, the
      
    }.bind(this);
    
    // Event handler to delete the selected element.
    var deleteSelectedElement = function deleteSelectedElement() {
      var selectedElement = this.selectedElement();
      if (selectedElement.anchor) {
        // is a link
        this.links.remove(selectedElement);
      } else {
        // is a node
        this.nodes.remove(selectedElement);
        this.links.remove(function(x) {
          return x.startNode() == selectedElement || x.endNode() == selectedElement;
        });
      }
      this.selectedElement(null);
    }.bind(this);
  
    
  }

  return FSM;
});




