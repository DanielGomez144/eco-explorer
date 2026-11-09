import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { FishModel, CoralModel, TurtleModel, TrashModel } from './models'

function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647 }
export const TRASH_TOTAL = 12

function Fish({ id, radius, speed, y, offset, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 2) * 0.3, Math.sin(t) * radius)
    ref.current.rotation.y = -t
  })
  return <group ref={ref} userData={{ type: 'fish', id }}><FishModel color={color} /></group>
}

export default function Ecosystem({ collected }) {
  const corals = useMemo(() => {
    const r = rng(42)
    const colors = ['#ff6f91', '#ffb347', '#c77dff', '#ff8fab']
    return Array.from({ length: 40 }, (_, i) => ({
      id: 'coral-' + i, position: [(r() - 0.5) * 70, 0, (r() - 0.5) * 70],
      color: colors[Math.floor(r() * colors.length)], height: 1 + r() * 3,
    }))
  }, [])
  const fish = useMemo(() => {
    const r = rng(7)
    return Array.from({ length: 14 }, (_, i) => ({
      id: 'fish-' + i, radius: 6 + r() * 25, speed: 0.15 + r() * 0.25, y: 2 + r() * 6, offset: r() * 6,
      color: ['#ffd166', '#06d6a0', '#ef476f', '#118ab2'][i % 4],
    }))
  }, [])
  const trash = useMemo(() => {
    const r = rng(99)
    const kinds = ['bottle', 'bag', 'can', 'net']
    return Array.from({ length: TRASH_TOTAL }, (_, i) => ({
      id: 'trash-' + i, kind: kinds[i % 4], position: [(r() - 0.5) * 60, 0, (r() - 0.5) * 60], rot: r() * 6,
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
      {corals.map((c) => (
        <group key={c.id} position={c.position} userData={{ type: 'coral', id: c.id }}>
          <CoralModel color={c.color} height={c.height} />
        </group>
      ))}
      {fish.map((f) => <Fish key={f.id} {...f} />)}
      {[[-8, 0, -6], [12, 0, 10]].map((p, i) => (
        <group key={i} position={p} userData={{ type: 'turtle', id: 'turtle-' + i }}><TurtleModel /></group>
      ))}
      {trash.filter((t) => !collected.has(t.id)).map((t) => (
        <group key={t.id} position={t.position} rotation={[0, t.rot, 0]} userData={{ type: 'trash', id: t.id, kind: t.kind }}>
          <TrashModel kind={t.kind} />
        </group>
      ))}
    </>
  )
}
