var PlaceModel = function(place) {
  this.title = ko.observable(place.title);
  this.markup = ko.observable();
  this.location  = ko.observable();
};

var NeighorhoodViewModel = function() {
  var self = this;
  self.places = ko.observableArray([]);

  $.getJSON('/data.json', function(d) {
    console.log(d.payload.places);
    var mappedPlaces = $.map(d.payload.places, function(place){
      return new PlaceModel(place);
    });
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

