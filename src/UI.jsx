import { TRASH_TOTAL } from './Ecosystem'
import { INFO } from './info'

export default function UI({ target, info, points, health, collectedCount }) {
  const name = target && (target.type === 'trash' ? INFO.trash[target.kind].title : INFO[target.type].title)
  return (
    <>
      <div className="crosshair">+</div>
      <div className="score">
        <div>🏆 Puntos de conservación: <b>{points}</b></div>
        <div>🗑️ Residuos recogidos: {collectedCount}/{TRASH_TOTAL}</div>
        <div className="bar"><div style={{ width: health + '%' }} /></div>
        <small>Estado del ecosistema: {health}%</small>
      </div>
      {target && <div className="prompt">{name} · {target.type === 'trash' ? 'Clic o E para recoger' : 'Clic o E para ver información'}</div>}
      {info && (
        <div className="info">
          <h3>{info.title}</h3>
          <p>{info.text}</p>
          {info.reward && <p className="reward">{info.reward}</p>}
          <small>Haz clic en el vacío para cerrar</small>
        </div>
      )}
      {collectedCount === TRASH_TOTAL && <div className="info"><h3>🎉 ¡Recogiste todos los residuos!</h3></div>}
      <div className="hud">Clic: capturar mouse · W A S D: moverse · Espacio / Shift: subir / bajar · E o clic: interactuar · Esc: soltar mouse</div>
    </>
  )
}
