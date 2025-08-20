import { create } from 'zustand'

/**
 * Hand landmark coordinate interface
 * Represents a single landmark point with x, y, z coordinates
 */
export interface HandLandmark {
  x: number
  y: number
  z: number
}

/**
 * Hand data interface
 * Contains landmarks, handedness, and detection confidence
 */
export interface HandData {
  landmarks: HandLandmark[]
  handedness: 'Left' | 'Right'
  confidence: number
}

/**
 * Hand store state interface
 * Global state for hand detection and coordinates
 */
interface HandStore {
  // Detection state
  isDetecting: boolean
  isStreaming: boolean
  
  // Hand data
  leftHand: HandData | null
  rightHand: HandData | null
  
  // Detection results
  handsDetected: number
  lastDetectionTime: number | null
  
  // Actions
  setDetectionState: (isDetecting: boolean) => void
  setStreamingState: (isStreaming: boolean) => void
  updateHandData: (handData: HandData[]) => void
  clearHandData: () => void
  setError: (error: string | null) => void
  
  // Error state
  error: string | null
}

/**
 * Zustand store for hand landmark management
 * 
 * Features:
 * - Stores left and right hand coordinates
 * - Tracks detection and streaming state
 * - Provides actions for updating hand data
 * - Manages error states
 * - Enables real-time coordinate access across components
 */
export const useHandStore = create<HandStore>((set, get) => ({
  // Initial state
  isDetecting: false,
  isStreaming: false,
  leftHand: null,
  rightHand: null,
  handsDetected: 0,
  lastDetectionTime: null,
  error: null,

  // Actions
  setDetectionState: (isDetecting: boolean) => 
    set({ isDetecting }),

  setStreamingState: (isStreaming: boolean) => 
    set({ isStreaming }),

  updateHandData: (handData: HandData[]) => {
    const leftHand = handData.find(hand => hand.handedness === 'Left') || null
    const rightHand = handData.find(hand => hand.handedness === 'Right') || null
    
    set({
      leftHand,
      rightHand,
      handsDetected: handData.length,
      lastDetectionTime: Date.now(),
      isDetecting: handData.length > 0
    })
  },

  clearHandData: () => 
    set({
      leftHand: null,
      rightHand: null,
      handsDetected: 0,
      lastDetectionTime: null,
      isDetecting: false
    }),

  setError: (error: string | null) => 
    set({ error })
}))

/**
 * Utility functions for hand coordinate access
 */
export const handUtils = {
  /**
   * Get all landmarks from both hands
   */
  getAllLandmarks: () => {
    const { leftHand, rightHand } = useHandStore.getState()
    const landmarks: { left: HandLandmark[] | null, right: HandLandmark[] | null } = {
      left: leftHand?.landmarks || null,
      right: rightHand?.landmarks || null
    }
    return landmarks
  },

  /**
   * Get specific hand landmarks
   */
  getHandLandmarks: (handedness: 'Left' | 'Right') => {
    const state = useHandStore.getState()
    return handedness === 'Left' ? state.leftHand?.landmarks : state.rightHand?.landmarks
  },

  /**
   * Get hand position (center of palm)
   */
  getHandPosition: (handedness: 'Left' | 'Right') => {
    const landmarks = handUtils.getHandLandmarks(handedness)
    if (!landmarks || landmarks.length < 21) return null
    
    // Use wrist position (landmark 0) as hand center
    return landmarks[0]
  },

  /**
   * Get finger tip positions
   */
  getFingerTips: (handedness: 'Left' | 'Right') => {
    const landmarks = handUtils.getHandLandmarks(handedness)
    if (!landmarks || landmarks.length < 21) return null
    
    return {
      thumb: landmarks[4],    // Thumb tip
      index: landmarks[8],    // Index tip
      middle: landmarks[12],  // Middle tip
      ring: landmarks[16],    // Ring tip
      pinky: landmarks[20]    // Pinky tip
    }
  },

  /**
   * Check if hand is making a specific gesture
   */
  isGestureDetected: (handedness: 'Left' | 'Right', gesture: 'fist' | 'open' | 'pointing') => {
    const landmarks = handUtils.getHandLandmarks(handedness)
    if (!landmarks || landmarks.length < 21) return false
    
    // Simple gesture detection logic
    const fingerTips = handUtils.getFingerTips(handedness)
    if (!fingerTips) return false
    
    switch (gesture) {
      case 'fist':
        // Check if all fingers are closed (simplified)
        return true // Placeholder logic
      case 'open':
        // Check if all fingers are extended
        return true // Placeholder logic
      case 'pointing':
        // Check if index finger is pointing
        return true // Placeholder logic
      default:
        return false
    }
  }
} 