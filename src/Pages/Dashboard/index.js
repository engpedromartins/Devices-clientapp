import { useState, useEffect } from 'react'
import './index.scss'
import { toast } from 'react-toastify'
import { orderBy } from 'natural-orderby';

import {
  getDeviceApiList,
  editDeviceApi,
  deleteDeviceApi,
  createDeviceApi
} from '../../Services/api'

import Modal from '../../Components/Modal'


import {
  TableSortLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  useMediaQuery,

} from '@material-ui/core';
import IconSwapVert from '@material-ui/icons/SwapVert';

import {
  FaRegEdit,
  FaPlusCircle,
  FaTrash,
} from 'react-icons/fa'


export default function Dashboard() {

  const [listOfDevices, setListOfDevices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [deviceSelected, setDeviceSelected] = useState(null)
  const [updateList, setUpdateList] = useState(false)
  const [showDeleteMesage, setShowDelete] = useState(false)
  const [columnDirection, setColumnDirection] = useState('asc')
  const [columnToSort, setColumnToSort] = useState('')
  const isMobile = useMediaQuery("(max-width : 1440px)");




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

  function handleSort(column) {
    let direction = columnDirection;
    if (column === columnToSort) {
      direction = columnDirection === 'asc' ? 'desc' : 'asc';
    }
    setColumnToSort(column)
    setColumnDirection(direction)
  };

  return (
    <div className='container'>
      <div className='section'>
        <h2>DashBoard</h2>
        <button className='addButton' onClick={() => { togglePostModal() }}><FaPlusCircle /> add</button>

      </div>


      <div className='section'>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">

            <TableHead

              variant={isMobile ? "scrollable" : "fullWidth"}
            >
              <TableRow>
                <TableCell onClick={() => handleSort('system_name')}>
                  <TableSortLabel hideSortIcon='false'>SYSTEM NAME
                    <IconSwapVert style={{ fontSize: 14 }} />
                  </TableSortLabel>
                </TableCell>
                <TableCell onClick={() => handleSort('type')}>
                  <TableSortLabel hideSortIcon='false'>TYPE
                    <IconSwapVert style={{ fontSize: 14 }} />
                  </TableSortLabel>
                </TableCell>
                <TableCell onClick={() => handleSort('hdd_capacity')}>
                  <TableSortLabel hideSortIcon='false'>HDD CAPACITY
                    <IconSwapVert style={{ fontSize: 14 }} />
                  </TableSortLabel>
                </TableCell>
                <TableCell >
                  OPTIONS
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {orderBy(listOfDevices, [columnToSort], columnDirection)
                .map((device, index) => {
                  return (

                    <TableRow key={index}>
                      <TableCell>
                        {device.system_name}
                      </TableCell>
                      <TableCell>
                        {device.type}
                      </TableCell>
                      <TableCell>
                        {device.hdd_capacity} GB
                      </TableCell>
                      <TableCell>
                        <div className='button-stack'>
                          <button
                            style={{ marginRight: '5px' }}
                            onClick={() =>
                              togglePostModal(device)}>
                            <FaRegEdit /> update
                          </button>
                          <button
                            onClick={() =>
                              togglePostModal(device, { showDelete: true })}>
                            <FaTrash />delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* {listOfDevices?.length && listOfDevices.map((device) => {
        return (
          <div key={device.id}>
            <div>
              <div>{device.system_name}</div>
              <div>{device.type}</div>
              <div>{device.hdd_capacity} GB</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <button onClick={() => togglePostModal(device)}>update</button>
              <button onClick={() => togglePostModal(device, { showDelete: true })}>delete</button>
            </div>
          </div>
        )
      })} */}
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