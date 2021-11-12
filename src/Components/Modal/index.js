
import './style.scss'

import Form from '../Form'
export default function Modal({ conteudo, close }) {


  return (
    <div className="modal" style={{ background: 'black' }}>
      <div className="container">

        <div className='style-button-modal'>
          <Form />
          <button onClick={close}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}