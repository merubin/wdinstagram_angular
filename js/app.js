

  angular
  .module("winstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("WinstagramIndexController", [
    "WinstagramFactory",
    WinstagramIndexControllerFunction
  ])
  .controller("WinstagramShowController", [
  "WinstagramFactory",
    "$stateParams",
    WinstagramShowControllerFunction
  ])
  .controller("WinstagramNewController",[
    "WinstagramFactory",
    "$stateParams",
    WinstagramNewControllerFunction
  ])
  .controller("WinstagramEditController" ,[
    "WinstagramFactory",
    "$stateParams",
    WinstagramEditControllerFunction
  ])
  .factory( "WinstagramFactory", [
      "$resource",
    WgFactoryFunction
    ]);


    function WgFactoryFunction( $resource ){
      console.log("WgFactoryFunction Working")
      console.log($resource)
      return $resource( "http://localhost:3000/entries/:id", {}, {
        update: { method: "PUT" }
      });
    }


function WinstagramIndexControllerFunction(WinstagramFactory){
  console.log('in the Winstragram Controller')
  this.winstagrams =  WinstagramFactory.query()
}

function WinstagramShowControllerFunction(WinstagramFactory,$stateParams){
console.log('in the Winstragram Show Controller')
  let index=WinstagramFactory.get({id: $stateParams.id})
  console.log("index=",index)
  this.wininstagram=index;
  console.log(index.author)
  console.log(index.body)

}

function WinstagramEditControllerFunction(WinstagramFactory,$stateParams){
  this.winstagram = WinstagramFactory.get({id:$stateParams.id})
  this.update = function(){
    this.winstagram.$update({id: $stateParams.params.id}).then(function(winstagram){
      $stateParams.go("instaShow",{id: winstagram .id})
    })
  }
  this.destroy = function(){
    this.winstagram.$delete({id: $stateParams.id}).then(function(winstagram){
    $stateParams.go("instaIndex")
    })
  }
}

function WinstagramNewControllerFunction(WinstagramFactory,$stateParams){
  this.wininstagram= new WinstagramFactory()
  this.create=function(){
    this.wininstagram.$save().then(function (wininstagram){
      $stateParams.go("winstagramShow",{id: wininstagram.id})
    })
  }

}



function RouterFunction($stateProvider){
  $stateProvider
  .state("winstagramIndex",{
    url:"/wg",
    templateUrl: "js/ng-views/index.html",
    controller:"WinstagramIndexController",
    controllerAs: "vm"
  })

  .state("winstagramNew",{
    url: "/wg/new",
    templateUrl: "js/ng-views/new.html",
    controller:"WinstagramNewController",
    controllerAs: "vm"
  })
  .state("winstagramEdit",{
    url: "/wg/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "WinstagramEditController",
    controllerAs: "vm"
  })


  .state("winstagramShow", {
    url:"/wg/:id",
    templateUrl: "/js/ng-views/show.html",
    controller:"WinstagramShowController",
    controllerAs: "vm"
  })

}
