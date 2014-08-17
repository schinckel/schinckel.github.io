define(['knockout'], function(ko) {
  
  ko.extenders.toggle = function(target, option) {
    target.toggle = function() {
      return target(!target());
    }
    return target;
  };
  
})