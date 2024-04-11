console.log("Welcome to Spotify")

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Clear Sky", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "motivational-181", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "motivational-day", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "motivational-epic", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "motivational-journey", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "price-of-freedom", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName: "sport-motivational", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName: "summer-adventures", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName: "motivational-elite", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName: "soaring-uplifing", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"}
]

songs.forEach((element, i) => {
    console.log(element, i);
    let img = songItems[i].getElementsByTagName('img')[0];
    img.src = element.coverPath;
    songItems[i].getElementsByClassName('songName')[0].innerText = element.songName; // Use 'element' instead of 'songs[i]'
})



// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Event listener for when audio starts playing
audioElement.addEventListener('play', () => {
    console.log('Audio started playing');
});

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const setAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause', 'fa-circle-play');
        element.classList.add('fa-circle-play'); // Ensure all elements start with 'fa-circle-play'
    });
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        setAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})