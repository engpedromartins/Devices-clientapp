
import './style.scss'
import Form from '../Form'
import {
  FaTimesCircle,
  FaCheckCircle
} from 'react-icons/fa'

export default function Modal({
  deviceSelected,
  close,
  updateDevice,
  showDelete,
  deleteDevice,
  createDevice
}) {
  return (
    <div className="modal" >
      <div className="container">
        <div className='style-button-modal'>
          {showDelete
            ? (
              <div className='container-modal'>
                <h1>Are you sure?</h1>
                <div className='button-stack'>
                  <button style={{ marginRight: '5px' }} onClick={() =>
                    deleteDevice(deviceSelected)}><FaCheckCircle />Yes
                  </button>
                  <button onClick={close}><FaTimesCircle />No</button>
                </div>
              </div>
            )
            : <>
              < Form
                deviceSelected={deviceSelected}
                updateDevice={updateDevice}
                createDevice={createDevice}
              />
              <button style={{
                width: '100%',
                margin: 'auto',
                border: 'none',
                background: 'transparent',
                color: 'gray',
                marginTop: '15px'
              }} onClick={close}>
                Cancel
              </button>
            </>
          }
        </div>
      </div>
    </div>
  )
}