import { useEffect, useRef } from 'react'
import type { HandLandmark } from '../store/handStore'

interface HandMapperProps {
    leftHandCoordinates: HandLandmark[] | null
    rightHandCoordinates: HandLandmark[] | null
    title?: string
}

export const HandMapper = ({ leftHandCoordinates, rightHandCoordinates, title = "Hand Mapper" }: HandMapperProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const timeRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const drawHandCoordinates = () => {
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

            ctx.fillStyle = 'white'
            ctx.font = '12px Arial'
            ctx.fillText(`${title} - Index Fingers`, 10, 20)

            ctx.lineWidth = 2

            if (leftIndexTip && leftHandCoordinates && leftHandCoordinates.length > 20) {
                ctx.strokeStyle = 'lime'
                ctx.beginPath()
                for (let i = leftIndexX; i < canvas.width; i++) {
                    const waveY = leftIndexY + Math.tan((i - leftIndexX + timeRef.current) * 0.05) * 20
                    if (i === leftIndexX) {
                        ctx.moveTo(i, waveY)
                    } else {
                        ctx.lineTo(i, waveY)
                    }
                }
                ctx.stroke()
            }

            if (rightIndexTip && rightHandCoordinates && rightHandCoordinates.length > 20) {
                ctx.strokeStyle = 'yellow'
                ctx.beginPath()
                for (let i = rightIndexX; i >= 0; i--) {
                    const waveY = rightIndexY + Math.cos((rightIndexX - i + timeRef.current) * 0.05) * 20
                    if (i === rightIndexX) {
                        ctx.moveTo(i, waveY)
                    } else {
                        ctx.lineTo(i, waveY)
                    }
                }
                ctx.stroke()
            }

            ctx.fillStyle = 'white'
            ctx.font = '10px Arial'
            ctx.fillText(`Waves Active`, 10, 35)
        }

        const animate = () => {
            timeRef.current += 2
            drawHandCoordinates()
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