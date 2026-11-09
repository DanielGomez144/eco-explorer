import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Raycaster, Vector2 } from 'three'

const MAX_DIST = 14
const ray = new Raycaster()
const center = new Vector2(0, 0)
function findData(o) { while (o) { if (o.userData && o.userData.type) return o.userData; o = o.parent } return null }

// Apunta con el centro de la pantalla (mira) y activa con clic o la tecla E
export default function Interactor({ onTarget, onActivate }) {
  const { camera, scene } = useThree()
  const current = useRef(null)
  const cb = useRef({ onTarget, onActivate })
  cb.current = { onTarget, onActivate }

  useFrame(() => {
    ray.setFromCamera(center, camera)
    ray.far = MAX_DIST
    const hit = ray.intersectObjects(scene.children, true)[0]
    const data = hit ? findData(hit.object) : null
    const key = data ? data.type + ':' + data.id : null
    if (key !== (current.current && current.current.key)) {
      current.current = data ? { key, data } : null
      cb.current.onTarget(data)
    }
  })

  useEffect(() => {
    const act = () => cb.current.onActivate(current.current ? current.current.data : null)
    const onClick = () => { if (document.pointerLockElement) act() } // el primer clic solo captura el mouse
    const onKey = (e) => { if (e.code === 'KeyE') act() }
    window.addEventListener('click', onClick)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('click', onClick); window.removeEventListener('keydown', onKey) }
  }, [])
  return null
}
