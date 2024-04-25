import {useRef, useState} from "react";
import './App.css'

function App() {
    const [currentMusic, setCurrentMusic] = useState({
        songName: 'Full Moon Full Life',
        songArtist: 'Persona 3 Reload',
        songSrc: '../public/music/Azumi_Takahashi_Lotus_Juice_ATLUS_Sound_Team_ATLUS_GAME_MU.mp3',
        songAvatar: '../public/img/images-1.jpeg',
        songVideo: '../public/video/full-moon-full-life-full-version-lyrics-persona-3-reload_video_360p.mp4'
    })
    const currentAudio = useRef()
    const [isPlayingAudio, setIsPlayingAudio] = useState(true)
    const [musicIndex, setMusicIndex] = useState(0)
    const [musicTotalLength, setMusicTotalLenght] = useState('04:54')
    const [musicCurrentTime, setMusicCurrentTime] = useState('00:00')
    const musicAPI = [{
        songName: 'Full Moon Full Life',
        songArtist: 'Persona 3 Reload',
        songSrc: '/public/music/Azumi_Takahashi_Lotus_Juice_ATLUS_Sound_Team_ATLUS_GAME_MU.mp3',
        songAvatar: '/public/img/images-1.jpeg',
        songVideo: '/public/video/full-moon-full-life-full-version-lyrics-persona-3-reload_video_360p.mp4'
    }, {
        songName: 'Color Of Your Night',
        songArtist: 'Persona 3 Reload',
        songSrc: '/public/music/Lotus_Juice_Azumi_Takahashi_ATLUS_Sound_Team_ATLUS_GAME_MU.mp3',
        songAvatar: '/public/img/images-2.jpg',
        songVideo: '/public/video/Color-Your-Night-Persona-3-Reload.mp4'
    },
        {
            songName: 'ROAD LESS TAKEN',
            songArtist: 'Lyn/Lotus/Shihoko/Yumi',
            songSrc: '/public/music/Yumi Kawamura_Shihoko Hirata_Lyn_Lotus Juice - ROAD LESS TAK.mp3',
            songAvatar: '/public/img/persona-q2.webp',
            songVideo: '/public/video/Color-Your-Night-Persona-3-Reload.mp4'
        }]
    const handleAudio = () => {
        try {
            if (currentAudio.current.paused) {
                currentAudio.current.play();
                setIsPlayingAudio(true)
            } else {
                currentAudio.current.pause();

                setIsPlayingAudio(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handlePreviusSong = () => {
        if (musicIndex < musicAPI.length - 1) {
            let setNumber = musicAPI.length - 1;
            setMusicIndex(setNumber)
            updateCurrentMusic(setNumber)
        } else {
            let setNumber = musicIndex - 1;
            setMusicIndex(setNumber)
            updateCurrentMusic(setNumber)
        }
    }
    const handleNextSong = () => {
        if (musicIndex >= musicAPI.length - 1) {
            let setNumber = 0;
            setMusicIndex(setNumber)
            updateCurrentMusic(setNumber)
        } else {
            let setNumber = musicIndex + 1;
            setMusicIndex(setNumber)
            updateCurrentMusic(setNumber)
        }
    }
    const updateCurrentMusic = (index) => {
        let musicObject = musicAPI[index]
        currentAudio.current.src = musicObject.songSrc
        currentAudio.current.play()
        setCurrentMusic({
            songName: musicObject.songName,
            songArtist: musicObject.songArtist,
            songSrc: musicObject.songSrc,
            songVideo: musicObject.songVideo,
            songAvatar: musicObject.songAvatar
        })

        setIsPlayingAudio(true)
    }

    const [audioProgress, setAudioProgress] = useState(0)
    const handleMusicProgressBar = (e) => {
        setAudioProgress(e.target.value);
        currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
    }
    const handleAudioUpdate = () => {
        //Update Minutes Total Lenght
        let minutes = Math.floor(currentAudio.current.duration / 60);
        let seconds = Math.floor(currentAudio.current.duration % 60);
        let musicTotalLength1 = `${minutes < 10 ? (`0${minutes}`) : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`
        setMusicTotalLenght(musicTotalLength1)
        //Update Minutes Current Time
        let CurrentMinutes = Math.floor(currentAudio.current.currentTime / 60);
        let CurrentSeconds = Math.floor(currentAudio.current.currentTime % 60);
        let currentMusic = `${CurrentMinutes < 10 ? (`0${CurrentMinutes}`) : CurrentMinutes} : ${CurrentSeconds < 10 ? `0${CurrentSeconds}` : seconds}`
        setMusicCurrentTime(currentMusic)

        const pogress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100)
        setAudioProgress(isNaN(pogress) ? 0 : pogress)
    }
    return (

        <div className='container'>
            <audio src={currentMusic.songSrc} ref={currentAudio} onEnded={handleNextSong}
                   onTimeUpdate={handleAudioUpdate}></audio>
            <video src={currentMusic.songVideo}
                   autoPlay={true} muted={true} loop={true} className='backgroundVideo'></video>
            <div className='blackScreen'></div>
            <div className='music-container'>
                <p className='music-Player'>Music Player</p>
                <p className='music-Head-Name'>{currentMusic.songName}</p>
                <p className='music-Artist-Name'>{currentMusic.songArtist}</p>
                <img src={currentMusic.songAvatar} alt={currentMusic.songAvatar} className='songAvatar '/>
                <div className='musicTimeDiv'>
                    <div className='currentTime'>{musicCurrentTime}</div>
                    <p className='musicTotalLenght'>{musicTotalLength}</p>
                </div>
                <input type='range' name='musicProgressBar' className='musicProgressBar' value={audioProgress}
                       onChange={handleMusicProgressBar}/>
                <div className='musicControlers'>
                    <button className='musicBtn' onClick={handlePreviusSong}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-player-track-prev playBtn">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M21 5v14l-8 -7z"/>
                            <path d="M10 5v14l-8 -7z"/>
                        </svg>
                    </button>
                    <button className='musicBtn' onClick={handleAudio}>
                        {!isPlayingAudio ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-player-pause playBtn">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"/>
                                <path
                                    d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"/>
                            </svg>) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="playBtn icon icon-tabler icons-tabler-outline icon-tabler-player-play">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 4v16l13 -8z"/>
                            </svg>)}
                    </button>

                    <button onClick={handleNextSong} className='musicBtn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="playBtn icon icon-tabler icons-tabler-outline icon-tabler-player-track-next">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 5v14l8 -7z"/>
                            <path d="M14 5v14l8 -7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default App
