angular
	.module('HousingApp', ['ngMaterial', 'uiGmapgoogle-maps'])
	.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
		GoogleMapApiProvider.configure({
			v: '3.17'
		});
	}]);