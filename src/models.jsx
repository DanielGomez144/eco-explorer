// TH-03: modelos 3D de bajo poligonaje con geometrías y materiales COMPARTIDOS
// (una sola instancia por tipo -> menos memoria y menos llamadas de dibujo).
import { SphereGeometry, ConeGeometry, CylinderGeometry, TorusGeometry, MeshStandardMaterial } from 'three'

const G = {
  fish: new SphereGeometry(0.35, 10, 8),
  coral: new ConeGeometry(0.8, 1, 6),
  shell: new SphereGeometry(1, 14, 10),
  head: new SphereGeometry(0.4, 10, 8),
  bottle: new CylinderGeometry(0.18, 0.18, 0.8, 8),
  can: new CylinderGeometry(0.2, 0.2, 0.4, 8),
  bag: new SphereGeometry(0.4, 8, 6),
  net: new TorusGeometry(0.6, 0.08, 6, 12),
}
const cache = new Map()
const mat = (c) => {
  if (!cache.has(c)) cache.set(c, new MeshStandardMaterial({ color: c }))
  return cache.get(c)
}

export const FishModel = ({ color }) => <mesh geometry={G.fish} material={mat(color)} />

export const CoralModel = ({ color, height }) => (
  <mesh geometry={G.coral} material={mat(color)} scale={[1, height, 1]} position={[0, height / 2, 0]} />
)

export const TurtleModel = () => (
  <group>
    <mesh geometry={G.shell} material={mat('#3d8b4f')} position={[0, 0.5, 0]} scale={[1.4, 0.7, 1]} />
    <mesh geometry={G.head} material={mat('#6fbf73')} position={[1.3, 0.5, 0]} />
  </group>
)

export const TrashModel = ({ kind }) => {
  switch (kind) {
    case 'bottle': return <mesh geometry={G.bottle} material={mat('#9ad1ff')} rotation={[0, 0, 1.4]} position={[0, 0.2, 0]} />
    case 'can': return <mesh geometry={G.can} material={mat('#b8b8b8')} position={[0, 0.2, 0]} />
    case 'bag': return <mesh geometry={G.bag} material={mat('#f5f5f5')} scale={[1.4, 0.5, 1]} position={[0, 0.3, 0]} />
    default: return <mesh geometry={G.net} material={mat('#2f7d4f')} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} />
  }
}
