import { useState, useEffect } from 'react'
import { getDeviceApiList, editDeviceApi } from '../../Services/api'

import { toast } from 'react-toastify'


export default function Dashboard() {

  const [listOfDevices, setListOfDevices] = useState([])

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
  }, [])

  async function updateDevice(device) {
    try {
      const res = await editDeviceApi(device)
      if (res.status === 200) console.log()
    } catch (error) {
      toast.error('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
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
              <button onClick={() => console.log('clicou')}>update</button>
              <button>delete</button>
            </div>
          </div>
        )
      })}
      <button>add</button>
    </div>
  )
}