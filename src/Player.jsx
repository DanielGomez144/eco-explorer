import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

export const LIMIT = 40 // límites del mapa
const SPEED = 8
const forward = new Vector3()
const right = new Vector3()

export default function Player() {
  const { camera } = useThree()
  const keys = useRef({})

  useEffect(() => {
    const down = (e) => (keys.current[e.code] = true)
    const up = (e) => (keys.current[e.code] = false)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame((_, dt) => {
    const k = keys.current
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()
    right.crossVectors(forward, camera.up).normalize()

    const step = SPEED * Math.min(dt, 0.05)
    if (k.KeyW || k.ArrowUp) camera.position.addScaledVector(forward, step)
    if (k.KeyS || k.ArrowDown) camera.position.addScaledVector(forward, -step)
    if (k.KeyD || k.ArrowRight) camera.position.addScaledVector(right, step)
    if (k.KeyA || k.ArrowLeft) camera.position.addScaledVector(right, -step)
    if (k.Space) camera.position.y += step
    if (k.ShiftLeft) camera.position.y -= step

    // No salir de los límites del mapa
    camera.position.x = Math.max(-LIMIT, Math.min(LIMIT, camera.position.x))
    camera.position.z = Math.max(-LIMIT, Math.min(LIMIT, camera.position.z))
    camera.position.y = Math.max(1, Math.min(15, camera.position.y))
  })
  return null
}
