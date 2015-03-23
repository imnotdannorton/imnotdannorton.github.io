$( function(){
	$(document).keydown(function(evt) {
	    if (evt.keyCode == 32) {
	      if($('#flowPlay')[0].paused){
	      	startPlayback();
	      	getResults(0);
	      	console.log('keydown')
	      }else{
	      	$('#flowPlay')[0].pause();
	      }
	    }
  	});
	$("#wrapper").on('click', function(){
		console.log('click');
		getResults(0);
	});
	var ANIMATED_IMAGES_URL = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&as_filetype=gif&imgtype=animated&tbs=itp:animated&callback=?&q=";
	var activeLyric = 0;
	var activeImage = ""
	var lyrics = [
		{"lyric":"flow", "timestamp":1},
		{"lyric":"pulse", "timestamp":2},
		{"lyric":"murmur", "timestamp":5},
		{"lyric":"build", "timestamp":6, "random":1},
		{"lyric":"twinkle", "timestamp":8, "random":2},
		{"lyric":"guitar", "timestamp":10, "random":3},
		{"lyric":"flow", "timestamp":12, "random":4},
		{"lyric":"sky", "timestamp":14, "random":5},
		{"lyric":"I just want to pack my things and", "timestamp":15},
		{"lyric":"go", "timestamp":19},
		{"lyric":"Been standing still for so long that my", "timestamp":20},
		{"lyric":"legs turned to stone", "timestamp":26},
		{"lyric":"pick a place on any map and run", "timestamp":30},
		{"lyric":"I don't care if we get back or where I ", "timestamp":38},
		{"lyric":"belong", "timestamp":43},
		{"lyric":"and I go", "timestamp":48},
		{"lyric":"with the flow", "timestamp":51},
		{"lyric":"and you know", "timestamp":54},
		{"lyric":"how it goes", "timestamp":55},
		{"lyric":"now I'm living my life on the road", "timestamp":73},
		{"lyric":"found a lonely message", "timestamp":78},
		{"lyric":"mobile phone", "timestamp":82},
		{"lyric":"she asked me if i'm ever coming back", "timestamp":86},
		{"lyric":"as if i knew the answer", "timestamp":90},
		{"lyric":"to a question", "timestamp":94},
		{"lyric":"like that", "timestamp":98},
		{"lyric":"and i go", "timestamp":100, "random":1},
		{"lyric":"with the flow", "timestamp":105, "random":1},
		{"lyric":"and you know how it goes", "timestamp":109},
		{"lyric":"She said she's been", "timestamp":124},
		{"lyric":"dreaming of me", "timestamp":130},
		{"lyric":"I told her that I don't know ", "timestamp":140},
		{"lyric":"what it means", "timestamp":146},
		{"lyric":"and if i go back", "timestamp":167, "random":1},
		{"lyric":"will she remember", "timestamp":171},
		{"lyric":"how can i go back", "timestamp":173},
		{"lyric":"knowing i let her", "timestamp":179},
		{"lyric":"down", "timestamp":181, "random":1},
		{"lyric":"fall", "timestamp":185, "random":2},
		{"lyric":"bottom", "timestamp":189, "random":3},
		{"lyric":"down", "timestamp":193, "random":4},
		{"lyric":"fall", "timestamp":195},
		{"lyric":"she said", "timestamp":210, "random":1},
		{"lyric":"she's been", "timestamp":211, "random":1},
		{"lyric":"dreaming", "timestamp":211},
		{"lyric":"of me", "timestamp":215},
		{"lyric":"I told her", "timestamp":227},
		{"lyric":"that I don't know", "timestamp":229},
		{"lyric":"what it means", "timestamp":231},
		{"lyric":"it means", "timestamp":232},
		{"lyric":"and i go", "timestamp":238, "random":1},
		{"lyric":"the flow", "timestamp":240, "random":1},
		{"lyric":"and i go", "timestamp":242, "random":2},
		{"lyric":"with the flow", "timestamp":243, "random":2},
		{"lyric":"and i go", "timestamp":245, "random":3},
		{"lyric":"flow", "timestamp":247, "random":5},
		{"lyric":"and i go", "timestamp":265, "random":3},
		{"lyric":"and I'm gone", "timestamp":267},
		{"lyric":"gone", "timestamp":275, "random":1},
		{"lyric":"over", "timestamp":280, "random":2},
		{"lyric":"leaving", "timestamp":285, "random":3},
		{"lyric":"done", "timestamp":290, "random":4},
	];
	var imagesList = [];
	var getPic = function(query, index){
		myPic = ""
		$.getJSON(
	    ANIMATED_IMAGES_URL+escape(query)
	    , function(images){
	      //Response back from google
	      if (typeof images.responseData === 'undefined' || !images.responseData || images.responseData.results.length == 0){
	      	console.log('no images')
	      }else{
	       if(lyrics[index].random && (typeof images.responseData.results[lyrics[index].random] !== 'undefined')){
	      		lyrics[index].url = images.responseData.results[lyrics[index].random].unescapedUrl;
	      		imagesList.push(images.responseData.results[lyrics[index].random].unescapedUrl);
		   }else{
		      	 lyrics[index].url = images.responseData.results[0].unescapedUrl;
		      	 imagesList.push(images.responseData.results[0].unescapedUrl);	
		      	 console.log(lyrics[index].url );
		    } 
	      }
	    });
	    if(index == 10){
	    	startPlayback();
	    }
	}
	var startPlayback = function(){
		$('#flowPlay')[0].play();
		setInterval(function(){
			myTime = parseInt($('#flowPlay')[0].currentTime);
			if(myTime == 5){ $('#logo').fadeOut();}
			
			if(lyrics[activeLyric].timestamp == myTime-1){
				activeImage = imagesList[activeLyric];
				console.log(activeImage, lyrics[activeLyric].lyric );
				$('#wrapper').css('background-image', 'url('+activeImage+')');
				activeLyric++;
				
			}
			if(activeLyric == imagesList.length-1){
				getResults(activeLyric);
			}
	}, 500);
	}
	
	var getResults = function(index){
		console.log('getting results from ', index, index+10);
		for (var i = index; i <= index+10; i++) {
			lyrics[i].url = getPic(lyrics[i].lyric, i)
			//console.log("url: " lyrics[i].url)
		};
	}
})

/*




And I go with the flow 

And I go with the flow

And I go with the flow

And I go and I'm gone

*/