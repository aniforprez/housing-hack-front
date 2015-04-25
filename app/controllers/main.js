angular
	.module('HousingApp')
	.controller('MainCtrl', ['$scope', '$q', 'uiGmapGoogleMapApi', function($scope, $q, uiGmapGoogleMapApi) {
		$scope.mapsLoaded = false;
		$scope.cities = ['Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
		$scope.selectedCity = '';
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, pan: false };

		$scope.selectedItem = '';
		$scope.searchText = '';

		$scope.mapsAutocomplete = {};
		$scope.getMatches = function(searchText) {
			var q = $q.defer();
			if($scope.mapsLoaded) {
				$scope.mapsAutocomplete.getPlacePredictions({ input: searchText, componentRestrictions: { country: 'in' }, types: ['(regions)'] }, function(predictions, status) {
					if (status != google.maps.places.PlacesServiceStatus.OK) {
						alert(status);
						q.resolve([]);
					}
					else {
						q.resolve(predictions);
					}
				});
			}
			else {
				q.resolve([]);
			}
			return q.promise;
		};

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.mapsAutocomplete = new google.maps.places.AutocompleteService();
			$scope.mapsLoaded = true;
		});
	}]);