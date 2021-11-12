
import './style.scss'
export default function Modal({ conteudo, close }) {


  return (
    <div className="modal" style={{ background: 'black' }}>
      <div className="container">

        <div className='style-button-modal'>

          <button onClick={close}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}