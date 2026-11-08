import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import Ecosystem from './Ecosystem'
import Player from './Player'

export default function App() {
  const [entered, setEntered] = useState(false)

  //  ingreso al ecosistema 3D
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
        <Ecosystem />
        <Player />
        <PointerLockControls />
      </Canvas>
      <div className="hud">Clic: capturar mouse · W A S D: moverse · Espacio / Shift: subir / bajar · Esc: soltar mouse</div>
    </>
  )
}
