import { useState, useRef, useEffect } from 'react'

/**
 * Camera component props interface
 * @param width - Video width in pixels (default: 640)
 * @param height - Video height in pixels (default: 480)
 */
interface CameraProps {
  width?: number
  height?: number
}

/**
 * Camera Component using Web API (getUserMedia)
 * 
 * How it works:
 * 1. Uses navigator.mediaDevices.getUserMedia() to access camera
 * 2. Creates a MediaStream object containing video tracks
 * 3. Assigns stream to video element's srcObject
 * 4. Manages camera state (start/stop) and error handling
 * 
 * Browser Support:
 * - Modern browsers (Chrome, Firefox, Safari, Edge)
 * - Requires HTTPS in production (except localhost)
 * - User must grant camera permission
 * 
 * API Format:
 * getUserMedia(constraints) where constraints = {
 *   video: { width, height, facingMode, etc. },
 *   audio: boolean
 * }
 */
const Camera: React.FC<CameraProps> = ({ width = 640, height = 480 }) => {
  // Reference to the video element for direct DOM manipulation
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // State to track if camera is currently streaming
  const [isStreaming, setIsStreaming] = useState(false)
  
  // State to store any error messages (permissions, hardware issues)
  const [error, setError] = useState<string>('')
  
  // State to store the MediaStream object for cleanup
  const [stream, setStream] = useState<MediaStream | null>(null)

  /**
   * Start camera stream
   * 
   * Process:
   * 1. Request camera access via getUserMedia
   * 2. Handle user permission (allow/deny)
   * 3. Assign stream to video element
   * 4. Update component state
   * 
   * Error Cases:
   * - Permission denied by user
   * - No camera hardware available
   * - Camera already in use by another app
   */
  const startCamera = async (): Promise<void> => {
    try {
      // Request camera access with specified constraints
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width, 
          height,
          facingMode: 'environment', // Changed to environment to get non-mirrored view
        },
        audio: false
      })
      
      // Assign the stream to video element if ref exists
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setIsStreaming(true)
        setError('')
      }
    } catch (err) {
      // Handle various error scenarios
      setError('Camera access denied or not available')
      console.log('xxCameraError', err)
    }
  }

  /**
   * Stop camera stream
   * 
   * Process:
   * 1. Stop all tracks in the MediaStream
   * 2. Clear stream reference
   * 3. Update component state
   * 
   * Why stop tracks individually:
   * - MediaStream can have multiple tracks (video, audio)
   * - Each track must be stopped separately
   * - Prevents memory leaks and frees camera hardware
   */
  const stopCamera = (): void => {
    if (stream) {
      // Stop all tracks in the stream (video, audio, etc.)
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setIsStreaming(false)
    }
  }

  /**
   * Cleanup effect - runs when component unmounts
   * 
   * Purpose:
   * - Prevents memory leaks
   * - Frees camera hardware for other applications
   * - Ensures proper cleanup even if user navigates away
   */
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="camera-container">
      {/* 
        Video element configuration:
        - autoPlay: Starts playing immediately when stream is assigned
        - playsInline: Prevents fullscreen on mobile devices
        - ref: Direct reference for DOM manipulation
        - style: Responsive sizing with max-width constraint
      */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', maxWidth: width, height: 'auto' }}
      />
      
      {/* Camera control buttons */}
      <div className="camera-controls">
        {!isStreaming ? (
          <button onClick={startCamera} className="camera-btn start">
            Start Camera
          </button>
        ) : (
          <button onClick={stopCamera} className="camera-btn stop">
            Stop Camera
          </button>
        )}
      </div>
      
      {/* Error message display */}
      {error && <div className="camera-error">{error}</div>}
    </div>
  )
}

export default Camera 