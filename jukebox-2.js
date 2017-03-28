
var play=document.querySelector("#play")
var pause=document.querySelector("#pause")
var cover=document.querySelector("#cover")


SC.initialize({ client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

SC.get("/tracks/207534343").then(function(response) {console.log(response);
});

function Jukebox(){
 this.player = SC.stream("/tracks/207534343")
}

var jukebox = new Jukebox()

Jukebox.prototype.play=function(){
   this.player.then(function(player){
     player.play();
  })
}

Jukebox.prototype.pause=function(){
   this.player.then(function(player){
     player.pause();
   })
  }


play.addEventListener("click", function(event){
 event.preventDefault();
 jukebox.play()
 SC.get("/tracks/207534343").then(function(response){
   document.getElementById("title").innerHTML = response.title;
   document.querySelector("#title").setAttribute("href", response.permalink_url);
   document.getElementById("artist").innerHTML = response.user.username;
   document.querySelector("#artist").setAttribute("href", response.user.permalink_url);
   document.getElementById("genre").innerHTML = "Genre: " + response.genre;
   document.getElementById("cover").src = response.artwork_url;
   document.getElementById("date").innerHTML = "Date Added: " + response.created_at;
   document.getElementById("description").innerHTML = "Description: " + response.description;
  // console.log(response);
 });
})

pause.addEventListener("click", function(event){
 event.preventDefault();
 jukebox.pause()
})
