
import './style.scss'

import Form from '../Form'
export default function Modal({ deviceToBeEdited, close, updateDevice, }) {


  return (
    <div className="modal" style={{ background: 'black' }}>
      <div className="container">

        <div className='style-button-modal'>
          <Form deviceToBeEdited={deviceToBeEdited} updateDevice={updateDevice} />
          <button onClick={close}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}