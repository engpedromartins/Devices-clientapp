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
import FilterTypeOfDevice from '../../Components/FilterByType';


import {
  TableSortLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,

} from '@material-ui/core';
import IconSwapVert from '@material-ui/icons/SwapVert';

import {
  FaRegEdit,
  FaPlusCircle,
  FaTrash,
} from 'react-icons/fa'


export default function Dashboard() {

  //set variables
  const [listOfDevices, setListOfDevices] = useState([])
  const [listOfDevicesFiltered, setListOfDevicesFiltered] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [deviceSelected, setDeviceSelected] = useState(null)
  const [updateList, setUpdateList] = useState(0)
  const [showDeleteMesage, setShowDelete] = useState(false)
  const [columnDirection, setColumnDirection] = useState('asc')
  const [columnToSort, setColumnToSort] = useState('')
  const [listElementeTobeFiltered, setListElementToBeFiltered] = useState([])

  //load devices and update
  useEffect(() => {

    //GET DEVICES
    async function getDeviceList() {
      try {
        const res = await getDeviceApiList()
        if (res.status === 200) {
          setListOfDevices(res.data)
        }
      } catch (error) {
        toast.info('Ops something was wrong! Look at console')
        console.log('Error =>', { error })
      }
    }
    getDeviceList()
  }, [updateList])

  useEffect(() => {
    //filter device by type
    function filterByType(typeOfdevices) {

      //filter
      const elementsToBeFilter = typeOfdevices.map(element => {
        return listOfDevices.filter((device) => device.type === element)
      });

      //transform any array for one array
      var elementFiltered = elementsToBeFilter.reduce((list, sub) =>
        list.concat(sub), [])

      //define the list of exibition
      elementFiltered.length
        ? setListOfDevicesFiltered(elementFiltered)
        : setListOfDevicesFiltered(listOfDevices)
      setListElementToBeFiltered(typeOfdevices)
    }

    // CREATE LIST DEVICE SHOW
    if (listElementeTobeFiltered.length) return filterByType(listElementeTobeFiltered)
    setListOfDevicesFiltered(listOfDevices)
  }, [listElementeTobeFiltered, listOfDevices])



  //UPDATE
  async function updateDevice(device, id) {
    try {
      const res = await editDeviceApi(device, id)

      if (res.data === 1) {
        setUpdateList(updateList + 1)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.info('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }

  //DELETE
  async function deleteDevice(id) {
    try {
      const res = await deleteDeviceApi(id)

      if (res.data === 1) {
        setUpdateList(updateList + 1)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.info('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }

  //CREATE
  async function createDevice(device) {
    try {
      const res = await createDeviceApi(device)
      if (res.status === 200) {
        setUpdateList(updateList + 1)
        setShowModal(!showModal)
      }
    } catch (error) {
      toast.info('Ops something was wrong! Look at console')
      console.log('Error =>', { error })

    }
  }

  //Open or Close modal function and send some params for component
  function togglePostModal(device = false, showDelete = false) {
    setShowModal(!showModal)
    setDeviceSelected(device)
    setShowDelete(showDelete)
  }

  //order by column name and desc or asc
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
        <button className='button-send' onClick={() => { togglePostModal() }}>
          <FaPlusCircle />
          add
        </button>

      </div>

      {/* Select for filter by type */}
      <div className='align-component'>
        <FilterTypeOfDevice filterByType={setListElementToBeFiltered} />
      </div>
      <div className='section'>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>

                <TableCell onClick={() => handleSort('system_name')}>
                  <TableSortLabel hideSortIcon={true} >SYSTEM NAME
                    <IconSwapVert style={{ fontSize: 14 }} />
                  </TableSortLabel>
                </TableCell>

                <TableCell onClick={() => handleSort('type')}>
                  <TableSortLabel hideSortIcon={true} >TYPE
                    <IconSwapVert style={{ fontSize: 14 }} />
                  </TableSortLabel>
                </TableCell>

                <TableCell onClick={() => handleSort('hdd_capacity')}>
                  <TableSortLabel hideSortIcon={true} >HDD CAPACITY
                    <IconSwapVert style={{ fontSize: 14 }} />
                  </TableSortLabel>
                </TableCell>

                <TableCell >
                  OPTIONS
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {orderBy(listOfDevicesFiltered, [columnToSort], columnDirection)
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

      {
        showModal && (
          <Modal
            deviceSelected={deviceSelected}
            close={togglePostModal}
            updateDevice={updateDevice}
            showDelete={showDeleteMesage}
            deleteDevice={deleteDevice}
            createDevice={createDevice}
          />)
      }

    </div >
  )
}