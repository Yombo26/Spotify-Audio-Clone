// let's select all required tags or elements

const container = document.querySelector(".container"),
musicImg = container.querySelector(".img-area img"),
musicName = container.querySelector(".song-details .name"),
musicArtist = container.querySelector(".song-details .artist"),
mainAudio = container.querySelector("#main-audio"),
playPauseBtn = container.querySelector(".play-pause"),
prevBtn = container.querySelector("#prev"),
nextBtn = container.querySelector("#next"),
progressArea = container.querySelector(".progress-area"),
progressBar = container.querySelector(".progress-bar");

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);//calling load music function 
})

//load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText  = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `audio/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//pause music function
function pauseMusic(){
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//next music function
function nextMusic(){
    //here we'll just increment of index by 1
    musicIndex++;
    //if musicIndex is greater than array length then musicIndex will be 1 so the first song will play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//prev music funtion
function prevMusic(){
    //here we'll just decrement of index by 1
    musicIndex--;
    //if musicIndex is less than 1 then musicIndex will be array length the last song will play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
//play or music button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPause = container.classList.contains("paused");
    //if isMusicpaused is true then call pauseMusic else play music
    isMusicPause ? pauseMusic() : playMusic();
});

//next music btn event
nextBtn.addEventListener("click", ()=>{
    nextMusic(); //calling next music function
});

//prev music btn event 
prevBtn.addEventListener("click", ()=>{
    prevMusic();//calling prev music function
});

//update prigress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting current time of song
    const duration = e.target.duration; //getting total duration of song
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = container.querySelector(".current"),
    musciDuration = container.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
        //upadte song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){ //adding 0 if sec is less than 10 sec
            totalSec = `0${totalSec}`;
        }
        musciDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//update playing song current time according to the progress bar with
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

// work on repeat, shuffle song 
const repeatBtn = container.querySelector("#shuffle");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "shuffle":
            repeatBtn.innerText = "repeat";
            break;
            case "repeat":
                repeatBtn.innerText = "shuffle";
                break;
                case "shuffle":
                    repeatBtn.innerText = "shuffle";
                    break;
    }
});


//after the song ended

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
        nextMusic();
        break;
        case "repeat_one":
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex = randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});