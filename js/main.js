angular.module('components', ['ui.bootstrap']).
  directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  }).
  controller('mainCtrl', function($scope, $http){
    $scope.applicationbBodyPage =false;
    $scope.releaseBodyPage=true;
    $scope.goToSecondPage = function(){
      $scope.applicationbBodyPage=!$scope.applicationbBodyPage;
      $scope.releaseBodyPage= !$scope.releaseBodyPage;
    };

    $scope.getData = function(selectedApplication){
        //alert($scope.selectedApplication);
        for(var i=0; i<$scope.data.data.length; i++){
          if($scope.data.data[i].applicationName === $scope.selectedApplication) {
            $scope.domain = $scope.data.data[i].domain;
            $scope.description = $scope.data.data[i].description;
            $scope.releases = $scope.data.data[i].releases;
            $scope.ppmProjects = $scope.data.data[i].ppmProjects;
            $scope.environments = $scope.data.data[i].environments;
          }
        }
    };

    //$http.get('application.json').then(function (response){
   
    $scope.data = {
  "data": [
    {
      "applicationName": "Marriott Mobile iOS",
      "description": "Marriott Mobile iOS",
      "domain": "Channels",
      "releases": [
         {
          "releaseNumber": "R6.11",
          "plannedDate": "03/09/2018",
          "actualDate": "03/09/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        {
          "releaseNumber": "R6.12",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        {
          "releaseNumber": "R6.13",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        {
          "releaseNumber": "R6.14",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        {
          "releaseNumber": "R7.0",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]        }
      ],
      "ppmProjects": {
        "fileName": "S",
        "Link": "http://www.ppmproject.com"
      },
      "environments": {
        "environmentName": "Dev",
        "HostName": "MARRIOTTDEVMOBILEDEV01"
      }
    },
    {
      "applicationName": "iOS",
      "description": "Marriott Mobile iOS",
      "domain": "Channels",
      "releases": {
        "release1": {
          "releaseNumber": "R6.11",
          "plannedDate": "03/09/2018",
          "actualDate": "03/09/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release2": {
          "releaseNumber": "R6.12",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release3": {
          "releaseNumber": "R6.13",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release4": {
          "releaseNumber": "R6.14",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release5": {
          "releaseNumber": "R7.0",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        }
      },
      "ppmProjects": {
        "fileName": "S",
        "Link": "http://www.ppmproject.com"
      },
      "environments": {
        "environmentName": "Dev",
        "HostName": "MARRIOTTDEVMOBILEDEV01"
      }
    },
    {
      "applicationName": "domain",
      "description": "Marriott Mobile iOS",
      "domain": "Channels",
      "releases": {
        "release1": {
          "releaseNumber": "R6.11",
          "plannedDate": "03/09/2018",
          "actualDate": "03/09/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release2": {
          "releaseNumber": "R6.12",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release3": {
          "releaseNumber": "R6.13",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release4": {
          "releaseNumber": "R6.14",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        },
        "release5": {
          "releaseNumber": "R7.0",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": [
                      "Awards",
                      "Account Merge"
                    ],
          "dependencies": [
                      "API",
                       "MPG",
                       "Valhalla"
                    ]
        }
      },
      "ppmProjects": {
        "fileName": "S",
        "Link": "http://www.ppmproject.com"
      },
      "environments": {
        "environmentName": "Dev",
        "HostName": "MARRIOTTDEVMOBILEDEV01"
      }
    }
  ]
};
    $scope.names = [];
    for(var i=0; i<$scope.data.data.length; i++){
      $scope.names.push($scope.data.data[i].applicationName);
    }
  }).
    controller('releaseCtrl', function($scope, $http){
     
      $scope.releaseData =  [
    {
      "releaseNumber": "R6.11",
      "plannedDate": "03/09/2018",
      "actualDate": "03/09/2018",
      "applicationName": "Marriott Mobile iOS",
      "domain": "Channels"
    },
    {
      "releaseNumber": "Release 1",
      "plannedDate": "05/10/2018",
      "actualDate": "05/10/2018",
      "applicationName": "eConfo",
      "domain": "Channels"
    },
    {
      "releaseNumber": "Release 2",
      "plannedDate": "06/22/2018",
      "actualDate": "06/22/2018",
      "applicationName": "eConfo",
      "domain": "Chan"
    },
    {
      "releaseNumber": "R6",
      "plannedDate": "05/18/2018",
      "actualDate": "05/18/2018",
      "applicationName": "Stargroups",
      "domain": "Chan"
    },
    {
      "releaseNumber": "R7",
      "plannedDate": "07/06/2018",
      "actualDate": "07/06/2018",
      "applicationName": "Stargroups",
      "domain": "Chs"
    },
    {
      "releaseNumber": "R5",
      "plannedDate": "04/25/2018",
      "actualDate": "04/25/2018",
      "applicationName": "ResCon",
      "domain": "Chls"
    },
    {
      "releaseNumber": "R5.1",
      "plannedDate": "08/01/2018",
      "actualDate": "08/01/2018",
      "applicationName": "StarGuest - GC",
      "domain": "Ch"
    },
    {
      "releaseNumber": "Release 4",
      "plannedDate": "04/27/2018",
      "actualDate": "04/27/2018",
      "applicationName": "StarGuest - GC",
      "domain": "Cels"
    },
    {
      "releaseNumber": "Release 5",
      "plannedDate": "06/01/2018",
      "actualDate": "06/01/2018",
      "applicationName": "StarGuest - GC",
      "domain": "Channels"
    },
    {
      "releaseNumber": "Release 6",
      "plannedDate": "06/22/2018",
      "actualDate": "06/22/2018",
      "applicationName": "StarGuest - GC",
      "domain": "Channels"
    }
  ]
;
     
  })
