

import { useState, useEffect } from 'react'
import { getDevices } from '../../Services/api'

export default function Dashboard() {

  const [listOfDevices, setListOfDevices] = useState([{ a: 'a', b: 'b' },])


  useEffect(() => {
    getDevices()
  }, [])

  return (
    <div>
      {listOfDevices.map((device) => {
        return (
          <>
            <div>{device.a}</div>
            <div>{device.b}</div>
          </>
        )
      })}
    </div>
  )
}