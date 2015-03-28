var species = [
  {"name":"Cuddly Woodies", "timeIn":31, "timeOut":32},
  {"name":"Ebooks", "timeIn":43, "timeOut":44},
  {"name":"Tuckskin Rikers", "timeIn":47, "timeOut":50},
]


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api?enablejsapi=1&origin=http://github.com";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var vidId = '5r-R070qHYw';
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: vidId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log('player ready');
   $('.species').on('click', function(event){
    var index = $(event.target).attr('trigger');
    playName(index);
  });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
var createButtons = function(){
  for (var i = species.length - 1; i >= 0; i--) {
    var button = "<button class='species' trigger="+ i +">"+species[i].name+"</button>"
    $('#names').append(button);
  };
}


var playName = function(index){
  var video = species[index];
  console.log(player);
  player.loadVideoById({videoId:vidId, startSeconds:video.timeIn, endSeconds:video.timeOut, suggestedQuality:'medium'});
  player.playVideo();
  console.log(player);
}
createButtons();
$(document).ready(function(){
   
});