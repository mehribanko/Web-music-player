 const image=document.querySelector('img');
 const title=document.getElementById('title');
 const singer=document.getElementById('singer');
 const audio=document.querySelector('audio');
 const progressContainer=document.getElementById('progress-container');
 const progress=document.getElementById('progress');
 const currentT=document.getElementById('current-time');
 const durationT=document.getElementById('duration');

 const prevBtn=document.getElementById('prev');
 const playBtn=document.getElementById('play');
 const nextBtn=document.getElementById('next');


let isPlaying=false;

const songs=[
{
    name: 'kellyclarkson-happierthanever',
    displayName: 'Happier than ever',
    singer: 'Kelly Clarkson',
},

{
    name: 'ckay-lovenwantiti',
    displayName: 'Love Nwantiti',
    singer: 'CKay',
},

{
    name: 'timabelorusskih-vitaminka',
    displayName: 'Vitaminka',
    singer: 'Tima Belorusskih',
}
];


//  Play a song
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    audio.play();
}

//  Pause a song
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace( 'fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    audio.pause();
}

// play or pause event listener

playBtn.addEventListener('click',()=>(isPlaying? pauseSong():playSong()));


// update DOM

function loadSong(song){
    title.textContent=song.displayName;
    singer.textContent=song.singer;
    audio.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}

let songIndex=0;

// Previous song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();

}

// Play a next song
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();

}

function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime}=e.srcElement;
        // update progress bar width
        const percentProgress=(currentTime/duration)*100;
        progress.style.width=`${percentProgress}%`;


        // calculate duration
        const durationMinutes=Math.floor(duration/60);
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`
        };
        
        // delay switching the duration element to avoid NaN
        if(durationSeconds){
            durationT.textContent=`${durationMinutes}:${durationSeconds}`;
        }


        // calculate currenttime
        const currentMinutes=Math.floor(currentTime/60);
        let currentSeconds=Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`

        }

        if(currentSeconds){
            currentT.textContent=`${currentMinutes}:${currentSeconds}`;
        }

        }
}

function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const{duration}= audio;
    audio.currentTime=(clickX/width)*duration;
}

// Event listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
audio.addEventListener('ended', nextSong);

// On Load

loadSong(songs[songIndex]);

