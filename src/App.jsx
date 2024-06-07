import { useRef, useState, useEffect } from "react";
import musicAPI from "./musicAPI.js";
import pause from "./assets/pause.svg";
import play from "./assets/play.svg";
import forward from "./assets/forward.svg";
import previous from "./assets/previous.svg";
import "./App.css";

function App() {
  const [currentMusic, setCurrentMusic] = useState({
    songName: "",
    songArtist: "",
    songSrc: "",
    songAvatar: "",
    songVideo: "",
  });
  const currentAudio = useRef();
  const currentVideo= useRef();
  const [isPlayingAudio,setIsPlayingAudio]=useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLenght] = useState("04:54");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00:00");
  const [audioProgress, setAudioProgress] = useState(0);

  const handleAudio = () => {
    try {
      if (currentAudio.current.paused) {
        currentAudio.current.play();
        setIsPlayingAudio(true);
        currentVideo.current.play();
      } else {
        currentAudio.current.pause();
        setIsPlayingAudio(false);
        currentVideo.current.pause()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePreviusSong = () => {
    if (musicIndex <= 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusic(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusic(setNumber);
    }
  };
  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusic(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusic(setNumber);
    }
  };
  const updateCurrentMusic = (index) => {
    const Song = { ...musicAPI[index] };
    setCurrentMusic({
      songName: Song.songName,
      songArtist: Song.songArtist,
      songSrc: Song.songSrc,
      songVideo: Song.songVideo,
      songAvatar: Song.songAvatar,
    });
    setIsPlayingAudio(true);
  };

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };
  const handleAudioUpdate = () => {
    //Update Minutes Total Lenght
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength1 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLenght(musicTotalLength1);
    //Update Minutes Current Time
    let CurrentMinutes = Math.floor(currentAudio.current.currentTime / 60);
    let CurrentSeconds = Math.floor(currentAudio.current.currentTime % 60);
    let currentMusic = `${
      CurrentMinutes < 10 ? `0${CurrentMinutes}` : CurrentMinutes
    } : ${CurrentSeconds < 10 ? `0${CurrentSeconds}` : seconds}`;
    setMusicCurrentTime(currentMusic);

    const pogress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(pogress) ? 0 : pogress);
  };
  useEffect(() => {
    setCurrentMusic({
      songName: musicAPI[0].songName,
      songArtist: musicAPI[0].songArtist,
      songSrc: musicAPI[0].songSrc,
      songVideo: musicAPI[0].songVideo,
      songAvatar: musicAPI[0].songAvatar,
    });
  }, []);
  useEffect(() => {
    currentAudio.current.play();
  }, [updateCurrentMusic]);
  return (
    <div className="container">
      <audio
        src={currentMusic.songSrc?currentMusic.songSrc:'/public/music/Azumi_Takahashi_Lotus_Juice_ATLUS_Sound_Team_ATLUS_GAME_MU.mp3'}
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <video
        src={currentMusic.songVideo}
        autoPlay={true}
        muted={true}
        loop={true}
        ref={currentVideo}
        className="backgroundVideo"
      ></video>
      <div className="blackScreen"></div>
      <div className="music-container">
        <p className="music-Player">Music Player</p>
        <p className="music-Head-Name">{currentMusic.songName}</p>
        <p className="music-Artist-Name">{currentMusic.songArtist}</p>
        <img
          src={currentMusic.songAvatar}
          alt={currentMusic.songAvatar}
          className="songAvatar "
        />
        <div className="musicTimeDiv">
          <div className="currentTime">{musicCurrentTime}</div>
          <p className="musicTotalLenght">{musicTotalLength}</p>
        </div>
        <input
          type="range"
          name="musicProgressBar"
          className="musicProgressBar"
          value={audioProgress}
          onChange={handleMusicProgressBar}
        />
        <div className="musicControlers">
          <button className="musicBtn" onClick={handlePreviusSong}>
            <img src={previous} alt="previous-icon" className="playBtn"></img>
          </button>
          <button className="musicBtn" onClick={handleAudio}>
            <img
              className="playBtn"
              src={isPlayingAudio ? play : pause}
              alt={isPlayingAudio ? "pause-icon" : "play-icon"}
            ></img>
          </button>
          <button onClick={handleNextSong} className="musicBtn">
            <img className="playBtn" src={forward} alt="forward-icon"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
