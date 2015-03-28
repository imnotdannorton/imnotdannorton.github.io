var species = [
  {"name":"Cuddly Woodies", "timeIn":31, "timeOut":35},
  {"name":"Ebooks", "timeIn":43, "timeOut":44},
  {"name":"Tuckskin Rikers", "timeIn":47, "timeOut":50},
  {"name":"Jar Jars", "timeIn":50.5, "timeOut":54},
  {"name":"Rompers", "timeIn":54, "timeOut":56},
  {"name":"Bon Bons", "timeIn":58, "timeOut":63},
  {"name":"Bugnuts", "timeIn":64, "timeOut":65},
  {"name":"Caboodles", "timeIn":68, "timeOut":71},
  {"name":"Tiddlywinks", "timeIn":68, "timeOut":74},
  {"name":"Rock Lobster", "timeIn":74, "timeOut":76},
  {"name":"Normcores", "timeIn":81, "timeOut":83},
  {"name":"Pumen", "timeIn":83, "timeOut":88},
  {"name":"Turduckens", "timeIn":93, "timeOut":98},
  {"name":"Arugalas", "timeIn":110, "timeOut":111},
  {"name":"Marsupilamis", "timeIn":119, "timeOut":120},
  {"name":"Sneaky Pete", "timeIn":121, "timeOut":122.5},
  {"name":"Spookems", "timeIn":123.5, "timeOut":125},
  {"name":"Sisteractwonians", "timeIn":124, "timeOut":125},
  {"name":"AWkwardlips", "timeIn":132, "timeOut":133},
  {"name":"ahhhrealmonsters", "timeIn":140, "timeOut":141},
  {"name":"nibble nose", "timeIn":142, "timeOut":145},
  {"name":"paladeens", "timeIn":145, "timeOut":146},
  {"name":"Suck Pit", "timeIn":153, "timeOut":156},
  {"name":"Humps", "timeIn":160, "timeOut":163},
  {"name":"Capuchin Hacker Fucker", "timeIn":165, "timeOut":166},
  {"name":"Megryans", "timeIn":172, "timeOut":173},
  {"name":"California Raisins", "timeIn":174.5, "timeOut":178},
  {"name":"Memesters", "timeIn":186.5, "timeOut":188},
  {"name":"Sybians", "timeIn":194, "timeOut":195.5},
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
    //height: '390',
    //width: '640',
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
   $('iframe#player').css({'width':'100%', 'height':'100%'});
   //$('#player').attr('height', $(window).height());
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
   $('iframe#player').css({'width':'100%', 'height':'100%'});
});