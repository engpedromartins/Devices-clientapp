import { useState, useEffect } from 'react'

import Modal from '../../Components/Modal'

import {
  getDeviceApiList,
  editDeviceApi,
  deleteDeviceApi,
  createDeviceApi
} from '../../Services/api'

import { toast } from 'react-toastify'


export default function Dashboard() {

  const [listOfDevices, setListOfDevices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [deviceSelected, setDeviceSelected] = useState(null)
  const [updateList, setUpdateList] = useState(false)
  const [showDeleteMesage, setShowDelete] = useState(false)

  useEffect(() => {

    //LIST
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

  //UPDATE
  async function updateDevice(device, id) {
    try {
      const res = await editDeviceApi(device, id)

      if (res.data === 1) {
        setUpdateList(!updateList)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.error('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }

  //DELETE
  async function deleteDevice(id) {
    try {
      const res = await deleteDeviceApi(id)

      if (res.data === 1) {
        setUpdateList(!updateList)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.error('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }

  //CREATE
  async function createDevice(device) {
    try {
      const res = await createDeviceApi(device)
      console.log(res)
      if (res.status === 200) {
        setUpdateList(!updateList)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.error('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }




  function togglePostModal(device = false, showDelete = false) {
    setShowModal(!showModal)
    setDeviceSelected(device)
    setShowDelete(showDelete)
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
              <button onClick={() => togglePostModal(device, { showDelete: true })}>delete</button>
            </div>
          </div>
        )
      })}
      <button onClick={() => { togglePostModal() }}>add</button>

      {showModal && (
        <Modal
          deviceSelected={deviceSelected}
          close={togglePostModal}
          updateDevice={updateDevice}
          showDelete={showDeleteMesage}
          deleteDevice={deleteDevice}
          createDevice={createDevice}
        />)}

    </div>
  )
}