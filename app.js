function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.282467, lng: 114.161573},
    zoom: 12
  });

  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  // Create a Marker
  function makeMarker(place) {
    var marker = new google.maps.Marker({
      position: place.location,
      title: place.title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP
    });
    console.log(highlightedIcon);
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });

    return marker;
  }

  var PlaceModel = function(place) {
    'use strict';
    var self = this
    self.title = place.title;
    self.location = place.location;
    self.display = ko.observable(false);
    self.marker = makeMarker(place);

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

  ko.applyBindings(new NeighorhoodViewModel());
};

