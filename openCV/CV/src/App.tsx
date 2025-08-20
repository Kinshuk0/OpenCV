import HandLandmarkerComponent from './components/HandLandmarker'
// import HandDisplay from './components/HandDisplay'
import { HandMapper } from './components/HandMapper'
import { useHandStore } from './store/handStore';
import { WaveSuperposition } from './components/WaveSuperposition';
/**
 * Main App Component
 * 
 * Purpose:
 * - Demonstrates MediaPipe hand landmark detection
 * - Integrates HandLandmarker component with proper dimensions
 * - Provides real-time hand tracking visualization
 * - Shows global state management with Zustand
 * 
 * Hand Landmarker Features:
 * - 21 landmarks per hand (MediaPipe standard)
 * - Real-time detection and visualization
 * - Canvas overlay for landmark drawing
 * - Multiple hand detection support
 * - Global state management for coordinate access
 */
function App() {
  const { leftHand, rightHand } = useHandStore()
  return (
    <div className="h-screen w-screen bg-gray-900 text-white">
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4">
          <div className="flex justify-start items-start">
            <HandLandmarkerComponent width={400} height={400} />
          </div>
          <div className="flex justify-start items-start">
            {/* <HandDisplay /> */}
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
            <HandMapper 
                leftHandCoordinates={leftHand?.landmarks || null}
                rightHandCoordinates={rightHand?.landmarks || null}
            />
            <WaveSuperposition 
                leftHandCoordinates={leftHand?.landmarks || null}
                rightHandCoordinates={rightHand?.landmarks || null}
            />
        </div>
      </div>
    </div>
  )
}

export default App
