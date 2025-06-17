import { useState, useCallback, useRef,useEffect } from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
  title?: string
  controls?: boolean
  loop?: boolean
  muted?: boolean
  playbackRate?: number
  aspectRatio?: string
  thumbnail?: string

}

const VideoPlayer = ({
    url,
    controls = true,
    loop = false,
    muted = false,
    playbackRate = 1,
    aspectRatio = '16/9',

    }: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const playerRef = useRef<ReactPlayer>(null)
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  // Xử lý lỗi phát video
  

  // Xử lý sẵn sàng phát
  const handleReady = useCallback(() => {
    setIsReady(true)
  }, [])

  
  return (
    <div className="video-player-container relative w-full">
      <div
        className="relative overflow-hidden rounded-xl bg-black shadow-xl"
        style={{
          aspectRatio,
          opacity: isReady ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
        }}
      >
        {!isReady && (
          <div
            className="absolute inset-0 z-10 bg-cover bg-center opacity-80 blur-sm"
          />
        )}

        {hasWindow&&<ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={isPlaying}
          muted={muted}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          controls={controls}
          onReady={handleReady}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            },
            vimeo: {
              playerOptions: {
                byline: false,
                portrait: false,
                title: false,
              },
            },
          }}
          className="absolute left-0 top-0"
        />}
      </div>

      {/* Custom Controls (example) */}
      {!controls && (
        <div className="custom-controls mt-4 flex items-center gap-4" >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32"
          />
        </div>
      )}

      
    </div>
  )
}

export default VideoPlayer