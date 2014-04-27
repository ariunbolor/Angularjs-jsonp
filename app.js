var jobBoard = angular.module('jobBoard', ['ui-bootstrap']);
	
	function MyAppController($scope, $http, $sce)
	{
	
	//local JSON variable call
	//$http({method: 'GET', url: 'js/jobs.json'}).success(function(data) {
	//$http.get({'js/jobs.json'}).success(function(data) {

	$http.jsonp('https://jobs.github.com/positions.json?callback=JSON_CALLBACK' ).then( function ( response ) {

		//Response data
	    $scope.jobs = response.data;
	    
		//Sanitize section 
	    $scope.trustedJsonRequest = function() {
	      return $sce.trustAsHtml($scope.jobs);
	    };

	    //Getting the total amount of job number
	    $scope.totalJobs = $scope.jobs.length;
		//$scope.jobs = data; Usses for local JSON Data
		$scope.appTitle = 'Angular JSONP';
		$scope.appDescription = 'Experimenting with AngularJS jsonp & JSONP. Datas are real data from GitHub job board';		
		$scope.clearFilter = function() {
			$scope.query = '';
		};

		$scope.nb = $filter('filter')($scope.jobs, filterExpr).length;

		
	});
	
	}