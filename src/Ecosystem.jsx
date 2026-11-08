import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647 }

function Coral({ position, color, height }) {
  return (
    <mesh position={[position[0], height / 2, position[2]]}>
      <coneGeometry args={[0.8, height, 6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Fish({ radius, speed, y, offset, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 2) * 0.3, Math.sin(t) * radius)
    ref.current.rotation.y = -t
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.35, 12, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Turtle({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} scale={[1.4, 0.7, 1]}><sphereGeometry args={[1, 16, 12]} /><meshStandardMaterial color="#3d8b4f" /></mesh>
      <mesh position={[1.3, 0.5, 0]}><sphereGeometry args={[0.4, 12, 8]} /><meshStandardMaterial color="#6fbf73" /></mesh>
    </group>
  )
}

export default function Ecosystem() {
  const corals = useMemo(() => {
    const r = rng(42)
    const colors = ['#ff6f91', '#ffb347', '#c77dff', '#ff8fab']
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      position: [(r() - 0.5) * 70, 0, (r() - 0.5) * 70],
      color: colors[Math.floor(r() * colors.length)],
      height: 1 + r() * 3,
    }))
  }, [])

  const fish = useMemo(() => {
    const r = rng(7)
    return Array.from({ length: 14 }, (_, i) => ({
      id: i, radius: 6 + r() * 25, speed: 0.15 + r() * 0.25, y: 2 + r() * 6, offset: r() * 6,
      color: ['#ffd166', '#06d6a0', '#ef476f', '#118ab2'][i % 4],
    }))
  }, [])

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 30, 10]} intensity={1.1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#e3c98e" />
      </mesh>
      {corals.map((c) => <Coral key={c.id} {...c} />)}
      {fish.map((f) => <Fish key={f.id} {...f} />)}
      <Turtle position={[-8, 0, -6]} />
      <Turtle position={[12, 0, 10]} />
    </>
  )
}
