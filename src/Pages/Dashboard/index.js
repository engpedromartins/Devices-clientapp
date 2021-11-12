

import { useState, useEffect } from 'react'

export default function Dashboard() {

  const [listOfDevices, setListOfDevices] = useState([{ a: 'a', b: 'b' }])

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