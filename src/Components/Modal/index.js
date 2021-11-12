
import './style.scss'

import Form from '../Form'
export default function Modal({ data, close }) {


  return (
    <div className="modal" style={{ background: 'black' }}>
      <div className="container">

        <div className='style-button-modal'>
          <Form data={data} />
          <button onClick={close}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}