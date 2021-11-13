import { useState, useEffect } from 'react'

import Modal from '../../Components/Modal'

import { getDeviceApiList, editDeviceApi } from '../../Services/api'

import { toast } from 'react-toastify'


export default function Dashboard() {

  const [listOfDevices, setListOfDevices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [deviceToBeEdited, setDeviceToBeEdited] = useState(null)
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    async function getDeviceList() {
      try {
        const res = await getDeviceApiList()
        if (res.status === 200) return setListOfDevices(res.data)

      } catch (error) {
        toast.error('Ops something was wrong! Look at console')
        console.log('Error =>', { error })
      }
    }
    getDeviceList()
  }, [updateList])

  async function updateDevice(device, id) {
    try {
      const res = await editDeviceApi(device, id)

      if (res.data === 1) {
        setUpdateList(!updateList)
        console.log(showModal)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.error('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }

  function togglePostModal(data = false) {
    setShowModal(!showModal)
    setDeviceToBeEdited(data)
  }

  return (
    <div>
      {listOfDevices?.length && listOfDevices.map((device) => {
        return (
          <div key={device.id}>
            <div>
              <div>{device.system_name}</div>
              <div>{device.type}</div>
              <div>{device.hdd_capacity}</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <button onClick={() => togglePostModal(device)}>update</button>
              <button>delete</button>
            </div>
          </div>
        )
      })}
      <button>add</button>

      {showModal && (<Modal deviceToBeEdited={deviceToBeEdited} close={togglePostModal} updateDevice={updateDevice} />)}

    </div>
  )
}