import { useHandStore, handUtils } from '../store/handStore'

/**
 * Hand Display Component
 * 
 * Demonstrates how to access and display hand coordinates
 * from the global Zustand store in other components
 */
const HandDisplay: React.FC = () => {
  const { leftHand, rightHand, isDetecting, handsDetected, lastDetectionTime } = useHandStore()

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Hand Coordinates Display</h2>
      
      {/* Detection Status */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-3 h-3 rounded-full ${isDetecting ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="font-medium">
            {isDetecting ? 'Hands Detected' : 'No Hands Detected'}
          </span>
        </div>
        <p className="text-sm text-gray-300">
          Hands detected: {handsDetected}
        </p>
        {lastDetectionTime && (
          <p className="text-xs text-gray-400">
            Last update: {new Date(lastDetectionTime).toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {/* Left Hand Data */}
        {leftHand && (
          <div className="mb-4 p-3 bg-green-900 rounded">
            <h3 className="font-semibold text-green-300 mb-2">Left Hand</h3>
            <div className="text-xs space-y-1">
              <p>Confidence: {(leftHand.confidence * 100).toFixed(1)}%</p>
              <p>Landmarks: {leftHand.landmarks.length}</p>
              
              {/* Hand Position */}
              {handUtils.getHandPosition('Left') && (
                <div className="mt-2">
                  <p className="font-medium">Hand Position:</p>
                  <p>X: {handUtils.getHandPosition('Left')?.x.toFixed(3)}</p>
                  <p>Y: {handUtils.getHandPosition('Left')?.y.toFixed(3)}</p>
                  <p>Z: {handUtils.getHandPosition('Left')?.z.toFixed(3)}</p>
                </div>
              )}

              {/* Finger Tips */}
              {handUtils.getFingerTips('Left') && (
                <div className="mt-2">
                  <p className="font-medium">Finger Tips:</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>Thumb: ({handUtils.getFingerTips('Left')?.thumb.x.toFixed(2)}, {handUtils.getFingerTips('Left')?.thumb.y.toFixed(2)})</span>
                    <span>Index: ({handUtils.getFingerTips('Left')?.index.x.toFixed(2)}, {handUtils.getFingerTips('Left')?.index.y.toFixed(2)})</span>
                    <span>Middle: ({handUtils.getFingerTips('Left')?.middle.x.toFixed(2)}, {handUtils.getFingerTips('Left')?.middle.y.toFixed(2)})</span>
                    <span>Ring: ({handUtils.getFingerTips('Left')?.ring.x.toFixed(2)}, {handUtils.getFingerTips('Left')?.ring.y.toFixed(2)})</span>
                    <span>Pinky: ({handUtils.getFingerTips('Left')?.pinky.x.toFixed(2)}, {handUtils.getFingerTips('Left')?.pinky.y.toFixed(2)})</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Hand Data */}
        {rightHand && (
          <div className="mb-4 p-3 bg-fuchsia-900 rounded">
            <h3 className="font-semibold text-fuchsia-300 mb-2">Right Hand</h3>
            <div className="text-xs space-y-1">
              <p>Confidence: {(rightHand.confidence * 100).toFixed(1)}%</p>
              <p>Landmarks: {rightHand.landmarks.length}</p>
              
              {/* Hand Position */}
              {handUtils.getHandPosition('Right') && (
                <div className="mt-2">
                  <p className="font-medium">Hand Position:</p>
                  <p>X: {handUtils.getHandPosition('Right')?.x.toFixed(3)}</p>
                  <p>Y: {handUtils.getHandPosition('Right')?.y.toFixed(3)}</p>
                  <p>Z: {handUtils.getHandPosition('Right')?.z.toFixed(3)}</p>
                </div>
              )}

              {/* Finger Tips */}
              {handUtils.getFingerTips('Right') && (
                <div className="mt-2">
                  <p className="font-medium">Finger Tips:</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>Thumb: ({handUtils.getFingerTips('Right')?.thumb.x.toFixed(2)}, {handUtils.getFingerTips('Right')?.thumb.y.toFixed(2)})</span>
                    <span>Index: ({handUtils.getFingerTips('Right')?.index.x.toFixed(2)}, {handUtils.getFingerTips('Right')?.index.y.toFixed(2)})</span>
                    <span>Middle: ({handUtils.getFingerTips('Right')?.middle.x.toFixed(2)}, {handUtils.getFingerTips('Right')?.middle.y.toFixed(2)})</span>
                    <span>Ring: ({handUtils.getFingerTips('Right')?.ring.x.toFixed(2)}, {handUtils.getFingerTips('Right')?.ring.y.toFixed(2)})</span>
                    <span>Pinky: ({handUtils.getFingerTips('Right')?.pinky.x.toFixed(2)}, {handUtils.getFingerTips('Right')?.pinky.y.toFixed(2)})</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* No Hands Detected */}
      {!leftHand && !rightHand && isDetecting && (
        <div className="text-center text-gray-400">
          <p>No hand data available</p>
        </div>
      )}

      {/* Instructions */}
      {!isDetecting && (
        <div className="text-center text-gray-400">
          <p>Start hand detection to see coordinates</p>
        </div>
      )}
    </div>
  )
}

export default HandDisplay 