var NeighorhoodViewModel = function() {
  var self = this;
  self.places = ko.observableArray([]);

  $.getJSON('/data.json', function(d) {
    self.places(d.payload.places);
  });
};

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.282467, lng: 114.161573},
    zoom: 12
  });
  ko.applyBindings(new NeighorhoodViewModel());
};

