
import './style.scss'

import Form from '../Form'
export default function Modal({
  deviceSelected,
  close,
  updateDevice,
  showDelete,
  deleteDevice,
  createDevice
}) {

  return (
    <div className="modal" style={{ background: 'black' }}>
      <div className="container">

        <div className='style-button-modal'>
          {showDelete
            ? (
              <>
                <h1>Are you sure</h1>
                <button onClick={() => deleteDevice(deviceSelected)}>Yes</button>
                <button onClick={close}>No</button>
              </>
            )
            : <>
              < Form
                deviceSelected={deviceSelected}
                updateDevice={updateDevice}
                createDevice={createDevice}
              />
              <button onClick={close}>
                Cancelar
              </button>
            </>
          }
        </div>

      </div>
    </div>
  )
}