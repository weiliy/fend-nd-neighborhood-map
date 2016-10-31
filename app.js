var PlaceModel = function(place) {
  'use strict';
  var self = this
  self.title = place.title;
  self.location = place.location;
  self.display = ko.observable(false);
  self.marker = new google.maps.Marker({
    position: place.location,
    title: place.title,
    animation: google.maps.Animation.DROP
  });

  self.display.subscribe(function(d) {
    if (d) {
      self.marker.setMap(map);
    } else {
      self.marker.setMap(null);
    }
  });
};

var NeighorhoodViewModel = function() {
  'use strict';
  var self = this;
  self.places = ko.observableArray([]);

  // Load place datas
  $.getJSON('/data.json', function(d) {
    var mappedPlaces = $.map(d.payload.places, function(place){
      return new PlaceModel(place);
    });
    for (var i = mappedPlaces.length - 1; i >= 0; i--) {
      mappedPlaces[i].display(true);
    }

    self.places(mappedPlaces);
  }).fail(function(){
    alert("failed to load data.json");
  });
};

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.282467, lng: 114.161573},
    zoom: 12
  });
  ko.applyBindings(new NeighorhoodViewModel());
};

