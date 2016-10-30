var places = [
  'Victoria Peak',
  'Ocean Park Hong Kong',
  'Hong Kong Disneyland',
  'Lantau Island',
  'Tian Tan Buddha',
  'Ngong Ping 360',
  'Po Lin Monastery',
  'Happy Valley Racecourse',
  'Hong Kong Museum of History',
  'Lamma Island',
  'Repulse Bay',
  'Cheung Chau',
  'Man Mo Temple',
  'Tung Choi Street',
  'Wong Tai Sin Temple',
  'Ten Thousand Buddhas Monastery',
  'Clock Tower, Hong Kong',
  'Hong Kong Space Museum',
  'Hong Kong Wetland Park',
  'Hong Kong Heritage Museum',
  'Mademe Tussauds Hong Kong',
  'Hong Kong Science Museum',
  'Hong Kong Zoological and Botanical Gardens',
  'Hong Kong Cultural Centre',
  'Bank of China Tower'
]

var NeighorhoodViewModel = function() {
  var self = this;
  self.places = ko.observableArray([]);

  self.places(places);

  if (!google) {
    alert("google is not found!");
  } else {
    console.log("google is found!");
  }
}

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.282467, lng: 114.161573},
    zoom: 12
  });
  ko.applyBindings(new NeighorhoodViewModel());
}

