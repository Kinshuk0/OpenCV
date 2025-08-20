import { useState, useRef, useEffect, useCallback } from 'react'
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'
import { useHandStore, handUtils, type HandData } from '../store/handStore'

/**
 * Hand Landmarker Component using MediaPipe
 * 
 * Features:
 * - Real-time hand landmark detection
 * - 21 hand landmarks per hand
 * - Multiple hand detection
 * - Canvas overlay for landmark visualization
 * - Proper handedness detection and mirroring correction
 * - Global state management with Zustand
 * 
 * MediaPipe Hand Landmarks:
 * - 21 points per hand (0-20)
 * - Points include wrist, thumb, index, middle, ring, pinky
 * - 3D coordinates (x, y, z) for each landmark
 */
interface HandLandmarkerProps {
  width?: number
  height?: number
}

const HandLandmarkerComponent: React.FC<HandLandmarkerProps> = ({ 
  width = 640, 
  height = 480 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)

  // Zustand store hooks
  const {
    isStreaming,
    isDetecting,
    error,
    setDetectionState,
    setStreamingState,
    updateHandData,
    clearHandData,
    setError
  } = useHandStore()

  /**
   * Initialize MediaPipe Hand Landmarker
   * 
   * Process:
   * 1. Load MediaPipe fileset resolver
   * 2. Create HandLandmarker with configuration
   * 3. Set up detection parameters
   */
  const initializeHandLandmarker = useCallback(async (): Promise<void> => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      )
      
      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2, // Detect up to 2 hands
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      })
      
      setHandLandmarker(landmarker)
      console.log('xxHandLandmarker', 'Hand landmarker initialized successfully')
    } catch (err) {
      setError('Failed to initialize hand landmarker')
      console.log('xxHandLandmarkerError', err)
    }
  }, [setError])

  /**
   * Start camera stream with hand detection
   */
  const startCamera = async (): Promise<void> => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width, height },
        audio: false
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setStreamingState(true)
        setError(null)
        
        // Initialize hand landmarker after camera starts
        await initializeHandLandmarker()
      }
    } catch (err) {
      setError('Camera access denied or not available')
      console.log('xxCameraError', err)
    }
  }

  /**
   * Stop camera stream
   */
  const stopCamera = (): void => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setStreamingState(false)
      clearHandData()
    }
  }

  /**
   * Process video frame for hand detection
   * 
   * Process:
   * 1. Get current video frame
   * 2. Run hand landmark detection
   * 3. Draw landmarks on canvas overlay with proper mirroring
   * 4. Update global state with hand data
   */
  const processFrame = useCallback(async (): Promise<void> => {
    if (!handLandmarker || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Run hand detection
    const results = handLandmarker.detectForVideo(video, Date.now())
    
    if (results.landmarks.length > 0) {
      // Convert MediaPipe results to our HandData format
      const handData: HandData[] = results.landmarks.map((handLandmarks: any[], handIndex: number) => {
        const handedness = results.handedness[handIndex]
        const isLeftHand = handedness[0]?.categoryName === 'Left'
        
        return {
          landmarks: handLandmarks.map((landmark: any) => ({
            x: landmark.x,
            y: landmark.y,
            z: landmark.z
          })),
          handedness: isLeftHand ? 'Left' : 'Right',
          confidence: handedness[0]?.score || 0
        }
      })

      // Update global state with hand data
      updateHandData(handData)
      
      // Draw landmarks on canvas with proper handedness
      results.landmarks.forEach((handLandmarks: any[], handIndex: number) => {
        const handedness = results.handedness[handIndex]
        const isLeftHand = handedness[0]?.categoryName === 'Left'
        
        // Draw connections between landmarks with proper mirroring
        drawHandConnections(ctx, handLandmarks, canvas.width, canvas.height, isLeftHand)
        
        // Draw individual landmarks with proper mirroring
        handLandmarks.forEach((landmark: any, landmarkIndex: number) => {
          // Use original coordinates since video and canvas are flipped with CSS transform
          const x = landmark.x * canvas.width
          const y = landmark.y * canvas.height
          
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, 2 * Math.PI)
          ctx.fillStyle = isLeftHand ? '#00FF00' : '#FF00FF' // Green for left, magenta for right
          ctx.fill()
          
          // Add landmark index and hand label for debugging
          ctx.fillStyle = '#FFFFFF'
          ctx.font = '10px Arial'
          ctx.fillText(`${landmarkIndex}${isLeftHand ? 'L' : 'R'}`, x + 5, y - 5)
        })
      })
    } else {
      setDetectionState(false)
      clearHandData()
    }
  }, [handLandmarker, updateHandData, setDetectionState, clearHandData])

  /**
   * Draw hand landmark connections with proper mirroring
   * 
   * Hand landmark connections follow MediaPipe's hand model:
   * - Thumb: 0-4, 4-3, 3-2, 2-1
   * - Index: 0-5, 5-6, 6-7, 7-8
   * - Middle: 0-9, 9-10, 10-11, 11-12
   * - Ring: 0-13, 13-14, 14-15, 15-16
   * - Pinky: 0-17, 17-18, 18-19, 19-20
   */
  const drawHandConnections = (
    ctx: CanvasRenderingContext2D, 
    landmarks: any[], 
    canvasWidth: number, 
    canvasHeight: number,
    isLeftHand: boolean
  ): void => {
    const connections = [
      // Thumb
      [0, 1], [1, 2], [2, 3], [3, 4],
      // Index finger
      [0, 5], [5, 6], [6, 7], [7, 8],
      // Middle finger
      [0, 9], [9, 10], [10, 11], [11, 12],
      // Ring finger
      [0, 13], [13, 14], [14, 15], [15, 16],
      // Pinky finger
      [0, 17], [17, 18], [18, 19], [19, 20]
    ]

    ctx.strokeStyle = isLeftHand ? '#00FF00' : '#FF00FF' // Green for left, magenta for right
    ctx.lineWidth = 2

    connections.forEach(([start, end]) => {
      const startPoint = landmarks[start]
      const endPoint = landmarks[end]
      
      if (startPoint && endPoint) {
        // Use original coordinates since video and canvas are flipped with CSS transform
        const startX = startPoint.x * canvasWidth
        const endX = endPoint.x * canvasWidth
        const startY = startPoint.y * canvasHeight
        const endY = endPoint.y * canvasHeight
        
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }
    })
  }

  /**
   * Animation loop for continuous detection
   */
  useEffect(() => {
    let animationId: number

    const animate = (): void => {
      if (isStreaming && handLandmarker) {
        processFrame()
        animationId = requestAnimationFrame(animate)
      }
    }

    if (isStreaming && handLandmarker) {
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isStreaming, handLandmarker, processFrame])

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-block border-2 border-gray-300 rounded-lg shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ 
            width: '100%', 
            maxWidth: width, 
            height: 'auto',
            transform: 'scaleX(-1)' // Flip video horizontally to show normal view
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            maxWidth: width,
            height: 'auto',
            pointerEvents: 'none',
            transform: 'scaleX(-1)' // Flip canvas to match video
          }}
        />
      </div>
      
      <div className="flex gap-3 justify-center">
        {!isStreaming ? (
          <button 
            onClick={startCamera} 
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Start Hand Detection
          </button>
        ) : (
          <button 
            onClick={stopCamera} 
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Stop Detection
          </button>
        )}
      </div>
      
      {/* {isDetecting && (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Hand Detected
        </div>
      )} */}
      
      {error && (
        <div className="px-4 py-3 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}

export default HandLandmarkerComponent 