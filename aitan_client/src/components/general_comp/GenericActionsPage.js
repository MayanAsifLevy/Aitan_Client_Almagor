import React from "react";
import { useState, useMemo } from 'react';
import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';
import Popup2Buttons from './popUps/Popup2Buttons'
import PopupActions from './popUps/PopupActions'
import { IoMdAdd } from 'react-icons/io';
import { TbListDetails } from 'react-icons/tb';
import { MdModeEdit, MdContentCopy, MdDelete } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BsPrinter } from 'react-icons/bs';

const GenericActionsPage = (props) => {

  const dispatch = useDispatch()

  const _token= useSelector(state=> state.login.Token.token)

  const [rowShowDetails, setRowShowDetails] = useState( false )
  const [popUp, setPopUp] = useState(false)
  const [row2Delete, setRow2Delete] = useState(0)
  const[popUpShowAdd, setPopUpShowAdd]=useState(false)
  const[popUpShowEdit, setPopUpShowEdit]=useState(false)

  const handleEdit = (row) => {
    dispatch(props.saveObjtoUpdateAction(row))
    setPopUpShowEdit(true)
    setRowShowDetails(false)
  }


  const handleDelete = (row) => {
    setPopUp(!popUp)
    setRow2Delete(row)

    setPopUpShowEdit(false)
    setPopUpShowAdd(false)
    setRowShowDetails(false)
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
    setPopUp(false)
    setPopUpShowEdit(false)
    setPopUpShowAdd(false)
    setRowShowDetails(false)
  }


  const handelPopUpEditBack=()=>
  {
    setPopUpShowEdit(false)
    setRowShowDetails(false)    
  }

  
  const handelPopUpAddBack=()=>
  {
    setPopUpShowAdd(false)
    dispatch(props.copyObjAction(''))
    setRowShowDetails(false)
  }


  const handleCopy = (row) => {
    dispatch(props.copyObjAction(row))
    setPopUpShowAdd(true)
  }


  const handleAdd = () => {
    dispatch(props.copyObjAction(''))
    setPopUpShowAdd(true)
  }


  const handleShowDetails = (row) => {
    dispatch(props.copyObjAction(row))
    setRowShowDetails(true)
  }


  const handlePrint=(row, reportType)=>
  {
    props.handelReportData(row, reportType)
  }

  
  const action_buttons =
  {
    Header: "",
    accessor: "action",
    width: "10%",
    disableFilters: true,
    Cell: (row) => (
      <div className="edit_del_buttons">
        
        {/*props.buttonsdRequried['updateButton'] ?*/props.checkButtonEdit(row.row.original)?
          <button className='iconButton' onClick={() => handleEdit(row.row.original)}><MdModeEdit /></button> : ''}

        {/*props.buttonsdRequried['copyButton'] ?*/props.checkButtonCopy(row.row.original)?
          <button className='iconButton' onClick={() => handleCopy(row.row.original)}><MdContentCopy /></button> : ''}

        {props.buttonsdRequried['showDetailsButton'] ?
          <button className='iconButton' onClick={() => handleShowDetails(row.row.original)}><TbListDetails /></button> : ''}

        {/*props.buttonsdRequried['deleteButton'] ? */props.checkButtonDelete(row.row.original)?
          <button className='iconButton' onClick={() => handleDelete(row.row.original)}><MdDelete /></button> :''}

        {props.buttonsdRequried['printAllButton'] !== undefined? 
              props.buttonsdRequried['printAllButton']?
                      <button className='iconButton' onClick={() => handlePrint(row.row.original, props.reportTypeAll)}><BsPrinter /></button> 
                      : ''
                      :''}
        {props.buttonsdRequried['printButton'] !== undefined? 
              props.buttonsdRequried['printButton']?
                      <button className='iconButton' onClick={() => handlePrint(row.row.original, props.reportPartial)}><HiOutlineDocumentReport /></button> 
                      : ''
                      :''}

      </div>
    )
  }


  const columns = useMemo(
    () => [
     
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

      {/* ========= plus sign right top side  ========== */}
      <div className='changeData'>
        {/*=======  the following will open the Edit page as popup per the props.editObjComp in teh actual page - for example: editHeader.js ======*/}
        {
           <PopupActions trigger={popUpShowEdit}   setTrigger={setPopUpShowEdit}>
           <div className='popupMessage'>  <props.editObjComp back={handelPopUpEditBack}  /> </div>
           </PopupActions>

        }

        {/*{/*=======  the following will open the Add page  as popUp per the props.addPageComp in teh actual page - for example: AppHeader.js ======*/}
        {props.addPageComp!== undefined?  <PopupActions trigger={popUpShowAdd}  setTrigger={setPopUpShowAdd}>
           <div className='popupMessage'>  <props.addPageComp back={handelPopUpAddBack} /></div>
           </PopupActions>
            :''}

      </div>


      {/* ========= main data table========== */}
      <div className='viewData'>
        {/* ========= add (plus sign) button  =========*/}
        <div>
        {props.buttonsdRequried['copyButton']?  <button className='addButton' onClick={handleAdd}><IoMdAdd /></button>:''}
        </div> 

        <div className='tableData'>
        <Table columns={columns} data={props.tableRecordsData} numOfRecords={props.numOfRecordsInTable}  tableSortBy={props.sortingByColumn}/>
        </div>
      </div>
  
      {/* ========= header's details (lines) ========= */}
       
        <div >
          {/*=======  the following will open the details section - for example: CreatePallet_details ======*/}
          {rowShowDetails ? <props.showDetailsComp  /> : ''}
        </div>
    
   
       <Popup2Buttons trigger={popUp}  actionName= {'המשך'} contAction={handelPopUpDelete} contCancel={handelPopUpCancel} setTrigger={setPopUp}>
        <div className='popupMessage'> האם למחוק את הרשומה?</div>
      </Popup2Buttons> 

    </div>
  );
}

export default GenericActionsPage;
