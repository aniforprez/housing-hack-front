angular
	.module('HousingApp')
	.controller('MainCtrl', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
		$scope.cities = ['Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
		$scope.selectedCity = '';
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, pan: false };
		uiGmapGoogleMapApi.then(function(maps) {
			var service = new google.maps.places.AutocompleteService();
			service.getQueryPredictions({ input: 'banga' }, function(predictions, status) {
				if (status != google.maps.places.PlacesServiceStatus.OK) {
					alert(status);
					return;
				}
			});
		});
	}]);