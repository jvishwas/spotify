console.log("hello spotify");

// Initialize the variable
let songIndex = 1;
let audioElement = new Audio("./music/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let showPlayBar = document.getElementsByClassName("bottom");

let songs = [
  {
    songName: "Shawn Mendes",
    filePath: "./music/1.mp3",
    coverPath: "assets/img_1.jpg",
  },
  {
    songName: "Alan Walker",
    filePath: "./music/2.mp3",
    coverPath: "assets/img_2.jpg",
  },

  {
    songName: "Feelings",
    filePath: "./music/3.mp3",
    coverPath: "assets/img_3.jpg",
  },
  {
    songName: "Amlifier",
    filePath: "./music/4.mp3",
    coverPath: "assets/img_4.jpeg",
  },
  {
    songName: "Party on beach",
    filePath: "./music/5.mp3",
    coverPath: "assets/img_5.jpg",
  },
  {
    songName: "Flutes Instruments ",
    filePath: "./music/6.mp3",
    coverPath: "assets/img_6.jpg",
  },
  {
    songName: "Sun Mere Sahzade",
    filePath: "./music/7.mp3",
    coverPath: "assets/img_5.jpg",
  },
  {
    songName: "Bewafa Nikali Tu",
    filePath: "./music/8.mp3",
    coverPath: "assets/img_6.jpg",
  },
];
// access all song with the help of forEach
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// Listen to Events for TimeUpdate
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressbar.value = progress;
  console.log(myProgressbar);
});
//
myProgressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressbar.value * audioElement.duration) / 100;
});

//change icons play/ pause
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-circle-play");
    }
  );
};

// addEventsListner on click playlist icons
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);

      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `./music/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;

      audioElement.currentTime = 0;
      audioElement.play();
      //masterplay play/pause when selected song playing
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-pause-circle");

      // when click on list songs then visible
      showPlayBar[0].style.display = "flex";
      gif.style.opacity = 1;
    });
  }
);
//events for next button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `./music/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-pause-circle");
});
//events for Previous button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `./music/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-pause-circle");
});
