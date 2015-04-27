angular
	.module('HousingApp')
	.controller('MainCtrl', ['$scope', '$q', '$mdToast', 'uiGmapGoogleMapApi', function($scope, $q, $mdToast , uiGmapGoogleMapApi) {
		$scope.mapsLoaded = false;
		$scope.cities = ['Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
		$scope.selectedCity = '';
		$scope.map = { center: { latitude: 22, longitude: 77 }, zoom: 5, pan: false, bounds: {}, control: {} };

		$scope.selectedItem = '';
		$scope.searchText = '';

		$scope.mapsAutocompleteService = {};
		$scope.mapsPlacesService = {};
		$scope.filterOn = false;

		$scope.currentBounds = {};
		$scope.getMatches = function(searchText) {
			var q = $q.defer();
			if($scope.mapsLoaded) {
				$scope.mapsAutocompleteService.getPlacePredictions({ input: searchText, componentRestrictions: { country: 'in' }, types: ['(regions)'] }, function(predictions, status) {
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
			$scope.mapsPlacesService = new google.maps.places.PlacesService($scope.map.control.getGMap());
			$scope.mapsPlacesService.getDetails({placeId: newCenterItem.place_id }, function(result, status) {
				if (status != google.maps.places.PlacesServiceStatus.OK) {
					$mdToast.show($mdToast.simple().content(status));
				}
				else {
					$scope.map.center = { latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng() };
					$scope.map.bounds = { northeast: {latitude: result.geometry.viewport.getNorthEast().lat(), longitude: result.geometry.viewport.getNorthEast().lng() }, southwest: {latitude: result.geometry.viewport.getSouthWest().lat() , longitude: result.geometry.viewport.getSouthWest().lng() }};
					$scope.currentBounds = result.geometry.viewport;
				}
			});
			$scope.filterOn = true;
		};
		$scope.findPlaces = function() {
			var options = {
				bounds: $scope.currentBounds,
				type: ["school"]
			};
			$scope.mapsPlacesService.nearbySearch(options, function(results, status) {
				if (status != google.maps.places.PlacesServiceStatus.OK) {
					$mdToast.show($mdToast.simple().content(status));
				}
				else {
					var tempMap = $scope.maps.control.getGMap();
					var placesArray = [];
					results.forEach(function(item) {
						placesArray.push(item.geometry.location);
					});
					var pointArray = new google.maps.MVCArray(placesArray);
					heatmap = new google.maps.visualization.HeatmapLayer({
						data: pointArray
					});

					heatmap.setMap(tempMap);
				}
			});
		};

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.mapsAutocompleteService = new google.maps.places.AutocompleteService();
			$scope.mapsLoaded = true;
		});
	}]);