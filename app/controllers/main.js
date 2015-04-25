angular
	.module('HousingApp')
	.controller('MainCtrl', ['$scope', '$q', '$mdToast', 'uiGmapGoogleMapApi', function($scope, $q, $mdToast , uiGmapGoogleMapApi) {
		$scope.mapsLoaded = false;
		$scope.cities = ['Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
		$scope.selectedCity = '';
		$scope.map = { center: { latitude: 22, longitude: 77 }, zoom: 5, pan: false, bounds: {}, control: {} };

		$scope.selectedItem = '';
		$scope.searchText = '';

		$scope.mapsAutocomplete = {};
		$scope.mapsPlace = {};
		$scope.getMatches = function(searchText) {
			var q = $q.defer();
			if($scope.mapsLoaded) {
				$scope.mapsAutocomplete.getPlacePredictions({ input: searchText, componentRestrictions: { country: 'in' }, types: ['(regions)'] }, function(predictions, status) {
					if (status != google.maps.places.PlacesServiceStatus.OK) {
						$mdToast.show($mdToast.simple().content(status));
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
		$scope.setCenter = function(newCenterItem) {
			$scope.mapsPlace = new google.maps.places.PlacesService($scope.map.control.getGMap());
			$scope.mapsPlace.getDetails({placeId: newCenterItem.place_id }, function(result, status) {
				if (status != google.maps.places.PlacesServiceStatus.OK) {
					$mdToast.show($mdToast.simple().content(status));
				}
				else {
					$scope.map.center = { latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng() };
					$scope.map.bounds = { northeast: {latitude: result.geometry.viewport.getNorthEast().lat(), longitude: result.geometry.viewport.getNorthEast().lng() }, southwest: {latitude: result.geometry.viewport.getSouthWest().lat() , longitude: result.geometry.viewport.getSouthWest().lng() }};
				}
			});
		};

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.mapsAutocomplete = new google.maps.places.AutocompleteService();
			$scope.mapsLoaded = true;
		});
	}]);