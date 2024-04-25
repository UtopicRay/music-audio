import {useRef, useState} from "react";
import './App.css'

function App() {
    const [currentMusic, setCurrentMusic] = useState({
        songName: 'Full Moon Full Life',
        songArtist: 'Persona 3 Reload',
        songSrc: '../public/music/Beneath-the-Mask-Persona-5.mp3',
        songAvatar: '../public/img/images-1.jpeg',
        songVideo: '../public/video/full-moon-full-life-full-version-lyrics-persona-3-reload_video_360p.mp4'
    })
    const currentAudio = useRef()
    const [isPlayingAudio, setIsPlayingAudio] = useState(false)
    const [musicIndex, setMusicIndex] = useState(0)
    const musicAPI = [{
        songName: 'Full Moon Full Life',
        songArtist: 'Persona 3 Reload',
        songSrc: '../public/music/Beneath-the-Mask-Persona-5.mp3',
        songAvatar: '../public/img/images-1.jpeg',
        songVideo: '../public/video/full-moon-full-life-full-version-lyrics-persona-3-reload_video_360p.mp4'
    }, {
        songName: 'Color Of Your Night',
        songArtist: 'Persona 3 Reload',
        songSrc: '../public/music/AL2.mp3',
        songAvatar: '../public/img/images-2.jpeg',
        songVideo: '../public/video/full-moon-full-life-full-version-lyrics-persona-3-reload_video_360p.mp4'
    }]
    const handleAudio = () => {
        try {
            if (currentAudio.current.paused) {
                currentAudio.current.play();
                setIsPlayingAudio(!isPlayingAudio)
            } else {
                currentAudio.current.pause();

                setIsPlayingAudio(!isPlayingAudio)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleNextSong = () => {
        if (musicIndex >= currentMusic.length - 1) {
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
        setCurrentMusic({
            sonName: musicObject.songName,
            songArtist: musicObject.songArtist,
            songSrc: musicObject.songSrc,
            songVideo: musicObject.songVideo,
            songAvatar: musicObject.songAvatar
        })
        setIsPlayingAudio(!isPlayingAudio)
        currentAudio.current.play()
    }
    const changeCurrentMusic = (e) => {
        e.preventDefault()
        setCurrentMusic()
    }
    const [audioProgress, setAudioProgress] = useState(60)
    const handleMusicProgressBar = (e) => {
        setAudioProgress(e.target.value);
    }
    return (
        <>
            <div className='container'>
                <audio src={currentMusic.songSrc} ref={currentAudio}></audio>
                <video src={currentMusic.songVideo}
                       autoPlay={true} muted={true} loop={true} className='backgroundVideo'></video>
                <div className='blackScreen'></div>
                <div className='music-container'>
                    <p className='music-Player'>Music Player</p>
                    <p className='music-Head-Name'>{currentMusic.songName}</p>
                    <p className='music-Artist-Name'>{currentMusic.songArtist}</p>
                    <img src={currentMusic.songAvatar} alt={currentMusic.songAvatar} className='songAvatar '/>
                    <div className='musicTimeDiv'>
                        <div className='currentTime'>00:00</div>
                        <p className='musicTotalLenght'>03:49</p>
                    </div>
                    <input type='range' name='musicProgressBar' className='musicProgressBar' value={audioProgress}
                           onChange={handleMusicProgressBar}/>
                    <div className='musicControlers'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-player-track-prev playBtn">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M21 5v14l-8 -7z"/>
                            <path d="M10 5v14l-8 -7z"/>
                        </svg>
                        {!isPlayingAudio ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 onClick={handleAudio}
                                 className="playBtn icon icon-tabler icons-tabler-outline icon-tabler-circle-caret-right">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 12l-4 -4v8z"/>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                            </svg>) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 onClick={handleAudio}
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-player-pause playBtn">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"/>
                                <path
                                    d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"/>
                            </svg>)}


                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="playBtn icon icon-tabler icons-tabler-outline icon-tabler-player-track-next">
                            onClick={handleNextSong}
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 5v14l8 -7z"/>
                            <path d="M14 5v14l8 -7z"/>
                        </svg>

                    </div>
                </div>
            </div>
        </>
    )
}

export default App
