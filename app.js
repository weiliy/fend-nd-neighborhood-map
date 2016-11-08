function initMap(){
  'use strict';
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

  var infowindow = new google.maps.InfoWindow();

  var searchWikiAlertOnce = true;

  var PlaceModel = function(place) {
    var self = this;
    // if this place display on the map
    self.display = ko.observable(false);

    // if this place is active
    self.active = ko.observable(false);

    self.title = place.title;

    self.location = place.location;

    self.contentHTML = '<h2>' + place.title + '</h2>' +
      '<hr/>' +
      '<p>loading data from wikipedia, please reopen later</p>';

    self.marker = self.makeMarker(place, self.active);

    self.display.subscribe(function(display) {
      self.marker.setVisible(display);
    });

    self.active.subscribe(function(active){
      if (active) {
        infowindow.setContent(self.contentHTML);
        infowindow.open(map, self.marker);
        self.marker.setIcon(highlightedIcon);
        google.maps.event.addListener(infowindow,'closeclick',function(){
          self.active(false);
        });
      } else {
        infowindow.close();
        self.marker.setIcon(defaultIcon);
      }
    });

    searchWiki(self);
  };

  PlaceModel.prototype.makeMarker = function(place, active) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.location,
      title: place.title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP
  });

    // When the click the mark can active or deactive this place
    marker.addListener('click', function() {
      active(!active());
    });

    return marker;
  };

  var searchWiki = function(place) {
    var apiUrl = 'https://en.wikipedia.org/w/api.php';
    var contentHTML;

    var jqXHR = $.ajax({
      url: apiUrl,
      data: {
        format: 'json',
        action: 'opensearch',
        search: place.title,
        limit: 5
      },
      dataType: 'jsonp',
      type: 'POST',
      headers: { 'Api-User-Agent': 'fend/1.0' },
    });

    jqXHR.done(function(d){
      place.contentHTML = '<h2>' + place.title + '</h2>' +
        '<hr/>' +
        '<a href="' + (d[3][1] || d[3]) + '">' + (d[1][1] || d[1]) + '</a>' +
        '<p>' + (d[2][1] || d[2]) + '</p>';
    });

    jqXHR.fail(function(d){
      if ( searchWikiAlertOnce ) {
        alert('unable to connect to wikipedia.');
        searchWikiAlertOnce = false;
      }

      place.contentHTML = '<h2>' + place.title + '<h2>';
    });
  };

  var NeighorhoodViewModel = function() {
    var self = this;

    self.isOpenSiderbar = ko.observable(false);

    self.toggleMenu = function() {
      self.isOpenSiderbar(!self.isOpenSiderbar());
    };

    self.places = ko.observableArray([]);
    self.filterKeyword = ko.observable('');
    self.displayPlaces = ko.computed(function(){
      var places = self.places();
      var filter = self.filterKeyword().toLowerCase();
      if (!filter) {
        return places;
      } else {
        return ko.utils.arrayFilter(places, function(place) {
            var isDisplay = place.title.toLowerCase().search(filter) !== -1;
            place.display(isDisplay);
            return isDisplay;
        });
      }
    });

    self.deactiveAll = function() {
      var places = self.places();
      for (var i = places.length - 1; i >= 0; i--) {
        places[i].active(false);
      }
    };

    self.activeThis = function() {
      self.deactiveAll();
      this.active(true);
    };

    // Load place datas
    $.getJSON('data.json', function(d) {
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

  if (typeof google !== 'undefined') {
    ko.applyBindings(new NeighorhoodViewModel());
  } else {
    googleError();
  }
}

function googleError() {
  $('#map').html('<h3>Ah... Error Occurred. Cannot connect to google maps api! Please check your network connection.<h3>');
}
