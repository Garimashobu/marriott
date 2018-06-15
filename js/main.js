var components = angular.module('components', ['ui.bootstrap']);

components.directive('tabs', function() {
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
  })
components.directive('pane', function() {
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
  });

components.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

components.controller('mainCtrl', function($scope, $http, $filter){
    $scope.applicationbBodyPage =false;
    $scope.releaseBodyPage=true;
    var chart;
    
    $scope.goToSecondPage = function(){
      $scope.applicationbBodyPage=!$scope.applicationbBodyPage;
      $scope.releaseBodyPage= !$scope.releaseBodyPage;
      $scope.$apply();
    };
   
  window.onload = function () {

 chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title:{
    text: "Application Release Timeline"
  },
  axisX: {
    title:"Planned Date",
        valueFormatString: "MMM DD YYYY"
  },
  axisY: {
   
    lineThickness: 0,
    valueFormatString: " ",
    gridThickness: 0
  },
  legend:{
    horizontalAlign: "left"
      
  },
  data: [{
    type: "bubble",
    showInLegend: true,
    legendText: "Size of Bubble Represents Number of Dependencies",
    legendMarkerType: "circle",
    legendMarkerColor: "white",
    toolTipContent: "<b>{name}</b><br/>{description}<br/>Domain: {domain}<br/>Planned Date: {x}<br/>Dependencies: {z}",
    dataPoints: getReleaseData(),
    click: function(e){
      getData(e.dataPoint.name);
   }
  }]
});
chart.render();

}

var getReleaseData = function() {
  var data = [];
  var j =0;
  if($scope.temp.length > 0){
    $scope.data.data = $scope.temp;
  };
  
  for (var i = 0; i < $scope.data.data.length; i++) {
    var app = {
      name: $scope.data.data[i].applicationName,
      domain: $scope.data.data[i].domain,
      description: $scope.data.data[i].description
    };
    
    for (key in $scope.data.data[i].releases) {
      var release = {
        x: new Date($scope.data.data[i].releases[key].plannedDate),
        y: (i+2)* 2 * 10,
        z: Object.keys($scope.data.data[i].releases[key].dependencies).length
      };
      
      data.push(Object.assign({}, app, release));
    }
  }
  
  return data;
};

$scope.filterDomainData = function() {
  $scope.selectedTimeData = "";
  $scope.temp = $filter('filter')($scope.data.data, { domain : $scope.selectedData });
  chart.options.data[0].dataPoints = getReleaseData();
  chart.render();
};

$scope.filterTimeFrameData = function() {
  $scope.selectedData = "";
  var timeFrame;
  var data;
  $scope.temp = [];
  switch($scope.selectedTimeData) {
    case "2 weeks":
    console.log($scope.freshData);
    data = $scope.freshData;
    timeFrame = twoWeeks();
    break;

    case "3 weeks":
    data = $scope.freshData;
    timeFrame = threeWeeks();
    break;

    case "4 weeks":
    data = $scope.freshData;
    timeFrame = fourWeeks();
    break;

    case "6 weeks":
    data = $scope.freshData;
    timeFrame = sixWeeks();
    break;
  }
  

  for(var i= 0; i<data.data.length; i++){
    var app = {
      applicationName: data.data[i].applicationName,
      domain: data.data[i].domain,
      description: data.data[i].description,
      releases: []
    };

    for (key in data.data[i].releases) {
      if(moment(data.data[i].releases[key].plannedDate).isSameOrBefore(moment(timeFrame))){
        app.releases.push(data.data[i].releases[key]);
     }
    }
    if(timeFrame) {
      $scope.temp.push(Object.assign({}, app));
    }
  }
  chart.options.data[0].dataPoints = getReleaseData();
  chart.render();
};

    $scope.checkForEnterKey = function($event, selectedApplication) {
        if ($event.keyCode=="13") {
          getData(selectedApplication);
        }
    };

    var getData = function(selectedApplication){
        
        for(var i=0; i<$scope.data.data.length; i++){
          if($scope.data.data[i].applicationName === selectedApplication) {
            $scope.selectedApplication = $scope.data.data[i].applicationName
            $scope.domain = $scope.data.data[i].domain;
            $scope.description = $scope.data.data[i].description;
            $scope.releases = $scope.data.data[i].releases;
            $scope.ppmProjects = $scope.data.data[i].ppmProjects;
            $scope.environments = $scope.data.data[i].environments;
          }
        }
        $scope.goToSecondPage();
    };

    var twoWeeks = function() {
      var today = moment();
      return twoWeeks = today.add(14, 'days');
    };

    var threeWeeks = function() {
      var today = moment();
      return twoWeeks = today.add(21, 'days');
    };

    var fourWeeks = function() {
      var today = moment();
      return twoWeeks = today.add(28, 'days');
    };

    var sixWeeks = function() {
      var today = moment();
      return twoWeeks = today.add(42, 'days');
    };

    $scope.data = {
      "data": [
          {
            "applicationName": "Marriott Mobile iOS",
            "description": "Marriott Mobile iOS",
            "domain": "Chaels",
            "releases": [
               {
                "releaseNumber": "R6.11",
                "plannedDate": "12/09/2018",
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
                "plannedDate": "06/25/2018",
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
                "plannedDate": "10/31/2018",
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
                "plannedDate": "09/31/2018",
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
                "plannedDate": "08/31/2018",
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
            "domain": "Chaels",
            "releases": [
              {
                "releaseNumber": "R6.11",
                "plannedDate": "06/24/2018",
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
                "plannedDate": "07/05/2018",
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
                "plannedDate": "08/02/2018",
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
                "plannedDate": "09/15/2018",
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
                "plannedDate": "06/29/2018",
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
            "applicationName": "domain",
            "description": "Marriott Mobile iOS",
            "domain": "Channels",
            "releases": [
               {
                "releaseNumber": "R6.11",
                "plannedDate": "12/09/2018",
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
                "plannedDate": "06/30/2018",
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
                "plannedDate": "06/30/2018",
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
                "plannedDate": "07/25/2018",
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
                "plannedDate": "07/02/2018",
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
            ],
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

   $scope.freshData = angular.copy($scope.data);

    $scope.names = [];
    for(var i=0; i<$scope.data.data.length; i++){
      $scope.names.push($scope.data.data[i].applicationName);
    }
  });
