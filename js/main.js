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

components.controller('mainCtrl', function($scope, $http){
    $scope.applicationbBodyPage =false;
    $scope.releaseBodyPage=true;
    var goToSecondPage = function(){
      //alert("hello");
      $scope.applicationbBodyPage=!$scope.applicationbBodyPage;
      $scope.releaseBodyPage= !$scope.releaseBodyPage;
    };
   
  window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title:{
    text: "Application Release Timeline"
  },
  axisX: {
    title:"Planned Date",
        valueFormatString: "DD-MM-YY"
  },
  axisY: {
    title:"",
    lineThickness: 0
  },
  legend:{
    horizontalAlign: "left"
      
  },
  data: [{
    type: "bubble",
    showInLegend: true,
    legendText: "Size of Bubble Represents Number of Dependencies",
    legendMarkerType: "circle",
    legendMarkerColor: "grey",
    toolTipContent: "<b>{name}</b><br/>{description}<br/>Domain: {domain}<br/>Planned Date: {x}<br/>Dependencies: {z}",
    dataPoints: getReleaseData(),
    click: function(e){
      goToSecondPage();
   }
  }]
});
chart.render();

}

var getReleaseData = function() {
  var data = [];
  
  for (var i = 0; i < releaseData.data.length; i++) {
    var app = {
      name: releaseData.data[i].applicationName,
      domain: releaseData.data[i].domain,
      description: releaseData.data[i].description
    };
    
    for (key in releaseData.data[i].releases) {
      var release = {
        x: new Date(releaseData.data[i].releases[key].plannedDate),
        y: Math.random() * 1000 * 1000,
        z: Object.keys(releaseData.data[i].releases[key].dependencies).length
      };
      
      data.push(Object.assign({}, app, release));
    }
  }
  
  return data;
}

var releaseData = {
  "data": [
    {
      "applicationName": "Marriott Mobile iOS",
      "description": "Marriott Mobile iOS",
      "domain": "Channels",
      "releases": {
        "release1": {
          "releaseNumber": "R6.11",
          "plannedDate": "03/09/2018",
          "actualDate": "03/09/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG"
          }
        },
        "release2": {
          "releaseNumber": "R6.12",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG"
          }
        },
        "release3": {
          "releaseNumber": "R6.13",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG",
            "3": "Valhalla"
          }
        },
        "release4": {
          "releaseNumber": "R6.14",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API"
          }
        },
        "release5": {
          "releaseNumber": "R7.0",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            
          }
        }
      },
      "ppmProjects": {
        "fileName": "S",
        "Link": "http://www.ppmproject.com"
      },
      "environments": {
        "environmentName": "Dev",
        "Hostname/IPAddress": "MARRIOTTDEVMOBILEDEV01"
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
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG",
            "3": "Valhalla"
          }
        },
        "release2": {
          "releaseNumber": "R6.12",
          "plannedDate": "04/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG"
          }
        },
        "release3": {
          "releaseNumber": "R6.13",
          "plannedDate": "03/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG",
            "3": "Valhalla"
          }
        },
        "release4": {
          "releaseNumber": "R6.14",
          "plannedDate": "05/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API"
          }
        },
        "release5": {
          "releaseNumber": "R7.0",
          "plannedDate": "10/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG",
            "3": "Valhalla"
          }
        }
      },
      "ppmProjects": {
        "fileName": "S",
        "Link": "http://www.ppmproject.com"
      },
      "environments": {
        "environmentName": "Dev",
        "Hostname/IPAddress": "MARRIOTTDEVMOBILEDEV01"
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
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            
          }
        },
        "release2": {
          "releaseNumber": "R6.12",
          "plannedDate": "11/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            
          }
        },
        "release3": {
          "releaseNumber": "R6.13",
          "plannedDate": "09/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG",
            "3": "Valhalla"
          }
        },
        "release4": {
          "releaseNumber": "R6.14",
          "plannedDate": "05/31/2018",
          "actualDate": "07/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG",
            "3": "Valhalla"
          }
        },
        "release5": {
          "releaseNumber": "R7.0",
          "plannedDate": "06/31/2018",
          "actualDate": "05/31/2018",
          "capabilities": {
            "c1": "Awards",
            "c2": "Account Merge"
          },
          "dependencies": {
            "1": "API",
            "2": "MPG"
          }
        }
      },
      "ppmProjects": {
        "fileName": "S",
        "Link": "http://www.ppmproject.com"
      },
      "environments": {
        "environmentName": "Dev",
        "Hostname/IPAddress": "MARRIOTTDEVMOBILEDEV01"
      }
    }
  ]
};

    

    

    $scope.checkForEnterKey = function($event, selectedApplication) {
        if ($event.keyCode=="13") {
          getData(selectedApplication);
        }
    };

    var getData = function(selectedApplication){
        
        for(var i=0; i<$scope.data.data.length; i++){
          if($scope.data.data[i].applicationName === $scope.selectedApplication) {
            $scope.domain = $scope.data.data[i].domain;
            $scope.description = $scope.data.data[i].description;
            $scope.releases = $scope.data.data[i].releases;
            $scope.ppmProjects = $scope.data.data[i].ppmProjects;
            $scope.environments = $scope.data.data[i].environments;
          }
          
        }
        goToSecondPage();
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
  })
components.controller('releaseCtrl', function($scope, $http){
     
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
