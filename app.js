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

var PlacesViewModel = function() {
  this.places = ko.observable(places)
}

ko.applyBindings(new PlacesViewModel());
