
var winstagrams = [
      {photo_url: "http://m9.i.pbase.com/u46/mrubin/medium/39911299.chinapeanut1.jpg",
          author: "Mike Rubin",
            body: "Nice Picture of a cat" },
            {photo_url: "http://m7.i.pbase.com/u21/mrubin/large/36870637.hokie.jpg",
                author: "Alex ",
                  body: "Go Hokies" }]

  angular
  .module("winstagram", [
    "ui.router"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("WinstagramIndexController", [
    WinstagramIndexControllerFunction
  ])
  .controller("WinstagramShowController", [
    "$stateParams",
    WinstagramShowControllerFunction
  ]);

function WinstagramIndexControllerFunction(){
console.log('in the Winstragram Controller')
  this.winstagrams=winstagrams
  console.log(this.winstagrams[0].author)
}

function WinstagramShowControllerFunction($stateParams){
console.log('in the Winstragram Show Controller')
  let index=winstagrams[$stateParams.id]
  console.log("index=",index)
  this.wininstagram=index;
  console.log(index.author)
  console.log(index.body)

}


function RouterFunction($stateProvider){
  $stateProvider
  .state("winstagramIndex",{
    url:"/wg",
    templateUrl: "js/ng-views/index.html",
    controller:"WinstagramIndexController",
    controllerAs: "vm"
  })
  .state("winstagramShow", {
    url:"/wg/:id",
    templateUrl: "/js/ng-views/show.html",
    controller:"WinstagramShowController",
    controllerAs: "vm"
  })

}
