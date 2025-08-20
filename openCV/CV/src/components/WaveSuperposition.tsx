import { useEffect, useRef } from 'react'
import type { HandLandmark } from '../store/handStore'

interface WaveSuperpositionProps {
    leftHandCoordinates: HandLandmark[] | null
    rightHandCoordinates: HandLandmark[] | null
    title?: string
}

export const WaveSuperposition = ({ leftHandCoordinates, rightHandCoordinates, title = "Wave Superposition" }: WaveSuperpositionProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const timeRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const drawSuperposition = () => {
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            if (!leftHandCoordinates && !rightHandCoordinates) {
                ctx.fillStyle = 'white'
                ctx.font = '16px Arial'
                ctx.fillText('No hands detected', 10, 30)
                return
            }

            let leftIndexTip = null
            let rightIndexTip = null
            let leftIndexX = 0, leftIndexY = 0, rightIndexX = 0, rightIndexY = 0

            if (leftHandCoordinates && leftHandCoordinates.length > 8) {
                leftIndexTip = leftHandCoordinates[8]
                leftIndexX = (1 - leftIndexTip.x) * canvas.width
                leftIndexY = leftIndexTip.y * canvas.height

                ctx.fillStyle = 'lime'
                ctx.beginPath()
                ctx.arc(leftIndexX, leftIndexY, 5, 0, 2 * Math.PI)
                ctx.fill()
            }

            if (rightHandCoordinates && rightHandCoordinates.length > 8) {
                rightIndexTip = rightHandCoordinates[8]
                rightIndexX = (1 - rightIndexTip.x) * canvas.width
                rightIndexY = rightIndexTip.y * canvas.height

                ctx.fillStyle = 'yellow'
                ctx.beginPath()
                ctx.arc(rightIndexX, rightIndexY, 5, 0, 2 * Math.PI)
                ctx.fill()
            }

            ctx.strokeStyle = 'magenta'
            ctx.lineWidth = 3
            ctx.beginPath()

            for (let i = 0; i < canvas.width; i++) {
                let superpositionY = 0
                let activeWaves = 0

                if (leftIndexTip && i >= leftIndexX) {
                    const leftWaveY = leftIndexY + Math.tan((i - leftIndexX + timeRef.current) * 0.05) * 20
                    superpositionY += leftWaveY - leftIndexY
                    activeWaves++
                }

                if (rightIndexTip && i <= rightIndexX) {
                    const rightWaveY = rightIndexY + Math.cos((rightIndexX - i + timeRef.current) * 0.05) * 20
                    superpositionY += rightWaveY - rightIndexY
                    activeWaves++
                }

                if (activeWaves > 0) {
                    superpositionY /= activeWaves
                    superpositionY += canvas.height / 2
                }

                if (i === 0) {
                    ctx.moveTo(i, superpositionY)
                } else {
                    ctx.lineTo(i, superpositionY)
                }
            }
            ctx.stroke()

            ctx.fillStyle = 'white'
            ctx.font = '12px Arial'
            ctx.fillText(`${title} - Superposition of 2 waves`, 10, 20)
        }

        const animate = () => {
            timeRef.current += 2
            drawSuperposition()
            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
}, [leftHandCoordinates, rightHandCoordinates, title])

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold mb-4">{title}</h1>
            <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="border border-gray-600 rounded"
            />
        </div>
    )
} 