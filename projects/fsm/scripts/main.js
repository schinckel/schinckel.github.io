var fsm;

require.config({
  shim: {
    zepto: {
      exports: 'Zepto'
    }
  },
  packages: ['fsm'],
  urlArgs: 'bust=' + (new Date()).getTime()
});

// 
// require([
//   'zepto',
//   'knockout',
//   'fsm'
// ], function($, ko, FSM) {
//   
//   fsm = new FSM([
//     {x:50, y:50, name:'foo', colour:'blue'}  
//   ]);
//   ko.applyBindings(fsm);
//   
//   return;
//   
//   $('svg').on('mousedown', function(evt) {
//     var data = ko.dataFor(evt.target);
//     fsm.select(data, evt);
//     var node = fsm.selectedElement();
//     
//     if (evt.shiftKey) {
//       // This means we are creating a link.
//       // If we have no selected node, then it is a startLink,
//       // else it is a regular link.
//       
//       // Provide a temporary link.
//       var mousemove = function mousemove(move) {
//         
//       }
//       $(document).on('mousemove', mousemove);
//       
//       $(document).one('mouseup', function(release) {
//         $(document).off('mousemove', mousemove);
//         var endNode = ko.dataFor(release.target);
//         if (endNode == fsm) {
//           return;
//         }
//         var link = new Link({
//           startNode: node,
//           endNode: endNode
//         });
//         fsm.links.push(link);
//       });
//       
//     } else {
//       if (node) {
//         if (node.anchor) {
//           var mousemove = function mousemove(move) {
//             node.anchor({x: move.x, y: move.y});
//           }
//           $(document).on('mousemove', mousemove);
//           $(document).one('mouseup', function(release) {
//             $(document).off('mousemove', mousemove);
//           });
//         } else {
//           var start = {
//             x: node.x(), y: node.y()
//           };
//     
//           var mousemove = function mousemove(move) {
//             node.x(start.x + (move.x - evt.x));
//             node.y(start.y + (move.y - evt.y));
//           }
//     
//           $(document).on('mousemove', mousemove);
//     
//           $(document).one('mouseup', function(release) {
//             $(document).off('mousemove', mousemove);
//           });
//         }
//       }
//     }
//   }).on('dblclick', function(evt) {
//     var data = ko.dataFor(evt.target);
//     if (data.accept) {
//       data.accept(!data.accept());
//     } else {
//       fsm.select(
//         fsm.newNode(data, evt)
//       );
//     }
//     evt.preventDefault(); evt.stopPropagation();
//   });
//   
//   
//   $(document).on('keydown', function(evt) {
//     var actions = {
//       8: fsm.deleteSelectedElement, // backspace
//       46: fsm.deleteSelectedElement, // fwd-delete
//       9: null, // tab -> select next node
//       32: null, // space
//       27: fsm.select.bind(fsm, fsm)
//     };
//     
//     var action = actions[evt.keyCode];
//     
//     if (action) {
//       action();
//       evt.preventDefault(); evt.stopPropagation();
//     } else {
//       console.log(evt.keyCode);
//     }
//   });
//   
// });