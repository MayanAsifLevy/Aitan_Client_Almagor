import React from "react";
import { useState, useMemo } from 'react';
import Table from './Table';
import { useDispatch , useSelector} from 'react-redux';
import Popup2Buttons from './popUps/Popup2Buttons'
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit, MdContentCopy, MdDelete } from 'react-icons/md';


const UpdatesTamplate = (props) => {

  const dispatch = useDispatch()

  const [rowEdit, setRowEdit] = useState({ 'rowid': '', rowdata: [], 'isEditing': false })
  const [rowAdd, setRowAdd] = useState({ rowdata: [], 'isAdding': false })
  const [button2Disable, setButton2disable] = useState(false) // once we click on Edit/Copy/Add we doesnt want to see the plus sign
  const [popUp, setPopUp] = useState(false)
  const [row2Delete, setRow2Delete] = useState(0)

  const _token= useSelector(state=> state.login.Token.token)

  const handleEdit = (row) => {
    dispatch(props.saveObjtoUpdateAction(row))
    setButton2disable(true)
    setRowEdit({ ...rowEdit, rowid: row.id, rowdata: row, isEditing: !rowEdit.isEditing })
  }


  const handleDelete = (row) => {
    setPopUp(!popUp)
    setRow2Delete(row)
  }


  const handelPopUpDelete = () => {
    if (props.toFilter !== undefined) {
      dispatch(props.deleteObjAction(row2Delete.id, props.toFilter, _token))
    }
    else {
      dispatch(props.deleteObjAction(row2Delete.id, _token))
    }

    setRow2Delete(0)
    setPopUp(!popUp)
  }


  const handelPopUpCancel = () => {
    setPopUp(!popUp)
  }


  const handleCopy = (row) => {
    dispatch(props.copyObjAction(row))
    setButton2disable(true)
    setRowAdd({ ...rowAdd, rowdata: row, isAdding: !rowAdd.isAdding })
  }

  const handleAdd = () => {
    dispatch(props.copyObjAction(''))
    setRowAdd({ ...rowAdd, isAdding: !rowAdd.isAdding })
    setButton2disable(true)
  }


  const editBack = () => {
    dispatch(props.saveObjtoUpdateAction(''))
    setRowAdd({ ...rowAdd, isAdding: false })
    setRowEdit({ ...rowEdit, isEditing: !rowEdit.isEditing })
    setButton2disable(false)
  }


  const addBack = () => {
    dispatch(props.copyObjAction(''))
    setRowAdd({ ...rowAdd, isAdding: false })
    setButton2disable(false)

  }

  // which button needs to be avaiable for the user to click on
  const action_buttons =
  {
    Header: "",
    accessor: "action",
    width:"10%",
    disableFilters: true,
    Cell: (row) => (
      <div className="edit_del_buttons">

        {props.buttonsdRequried['updateButton'] ?
          <button className='iconButton' onClick={() => handleEdit(row.row.original)}><MdModeEdit /></button> : ''}

        {props.buttonsdRequried['copyButton'] ?
          <button className='iconButton' onClick={() => handleCopy(row.row.original)}><MdContentCopy /></button> : ''}

        {props.buttonsdRequried['deleteButton'] ?
          <button className='iconButton' onClick={() => handleDelete(row.row.original)}><MdDelete /></button> : ''}

      </div>
    )
  }


  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: true,
        width: "5%"
      }
    ], [])
    ;


  // add the other tables from prevComp (== like 'Growers')
  props.col.map((extracol) => {
    return (columns.push(extracol))
  })

  // add the action_buttons - add, edit, delete
  columns.push(action_buttons)


  return (

    <div className="updatesMain">

      {/* ========= add table name ========== */}
      <div className="tableName">
        {props.pageName}
      </div>

      <div>
        {props.info}
      </div>

      {/* ========= plus sign on the right side data ========== */}
      <div className='changeData'>
        {/*=======  the following will open the Edit page per the props.editObjComp in teh original page - for example: Growers.js ======*/}
        {rowEdit.isEditing ? <props.editObjComp back={editBack} /> : ''}

        {/*{/*=======  the following will open the Add page per the props.addPageComp in teh original page - for example: Growers.js ======*/}
        {rowAdd.isAdding && !rowEdit.isEditing ? <props.addPageComp back={addBack} /> : ''}

      </div>


      {/* ========= main data table========== */}
      <div className='viewData'>
        {/* ========= add (plus sign) button  ========= */}
        <div>
              {props.buttonsdRequried['copyButton']?
                 <button className='addButton' disabled={button2Disable} onClick={handleAdd}><IoMdAdd /></button>
                 :''
                 }
        </div>

        <div className='tableData'>
         
          <Table columns={columns} data={props.tableRecordsData} numOfRecords={props.numOfRecordsInTable} tableSortBy={props.sortingByColumn}/>
        </div>
      </div>

      <Popup2Buttons trigger={popUp} contAction={handelPopUpDelete} actionName={'המשך'} contCancel={handelPopUpCancel} setTrigger={setPopUp}>
        <div className='popupMessage'> האם למחוק את הרשומה?</div>
      </Popup2Buttons>

    </div>
  );
}

export default UpdatesTamplate;
