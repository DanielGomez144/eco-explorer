import { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import Ecosystem from './Ecosystem'
import Player from './Player'
import Interactor from './Interactor'
import UI from './UI'
import { INFO } from './info'

const POINTS_TRASH = 10 // valor provisorio: se ajusta en el diseño de gamificación
const HEALTH_PER_TRASH = 3

export default function App() {
  const [entered, setEntered] = useState(false)
  const [collected, setCollected] = useState(new Set())
  const [points, setPoints] = useState(0)
  const [health, setHealth] = useState(50)
  const [target, setTarget] = useState(null)
  const [info, setInfo] = useState(null)
  const seen = useRef(new Set())

  const onActivate = useCallback((data) => {
    if (!data) return setInfo(null)
    if (data.type === 'trash') {
      if (seen.current.has(data.id)) return
      seen.current.add(data.id)
      setCollected(new Set(seen.current))
      setPoints((p) => p + POINTS_TRASH) // HU-04
      setHealth((h) => Math.min(100, h + HEALTH_PER_TRASH))
      setInfo({ ...INFO.trash[data.kind], reward: `+${POINTS_TRASH} puntos de conservación` })
    } else {
      setInfo(INFO[data.type]) // HU-03
    }
  }, [])

  if (!entered) {
    return (
      <div className="start">
        <h1>🌊 EcoExplorer</h1>
        <p>Explora un ecosistema marino y descubre cómo cuidarlo.</p>
        <button onClick={() => setEntered(true)}>Entrar al ecosistema</button>
      </div>
    )
  }

  return (
    <>
      <Canvas camera={{ position: [0, 2, 12], fov: 70 }}>
        <color attach="background" args={['#0a4f7a']} />
        <fog attach="fog" args={['#0a4f7a', 8, 55]} />
        <Ecosystem collected={collected} />
        <Player />
        <Interactor onTarget={setTarget} onActivate={onActivate} />
        <PointerLockControls />
      </Canvas>
      <UI target={target} info={info} points={points} health={health} collectedCount={collected.size} />
    </>
  )
}
