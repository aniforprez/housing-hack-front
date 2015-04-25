angular
	.module('HousingApp', ['ngMaterial', 'uiGmapgoogle-maps'])
	.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
			v: '3.17',
			libraries: 'places'
		});
	}]);