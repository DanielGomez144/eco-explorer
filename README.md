# EcoExplorer

Experiencia web 3D educativa (React + Three.js + react-three-fiber).

## Ejecutar
```
npm install
npm run dev
```

## Sprint 1
TH-01 proyecto base · TH-02 Canvas 3D · HU-01 ingreso al ecosistema · HU-02 movimiento con límites.

## Sprint 2
- HU-03: apunta con la mira y haz clic (o E) en peces, tortugas, corales o residuos para ver su información.
- HU-04: recoge residuos (+10 puntos de conservación y sube el estado del ecosistema).
- TH-03: modelos 3D de bajo poligonaje en `src/models.jsx`, con geometrías y materiales compartidos.

### Reemplazar por modelos .glb reales
1. Optimiza el archivo (por ejemplo con `npx gltf-transform optimize in.glb out.glb`).
2. Colócalo en `public/models/` y cárgalo con `useGLTF('/models/pez.glb')` de `@react-three/drei`.
3. Devuelve `<primitive object={scene.clone()} />` dentro del componente correspondiente de `models.jsx`.
