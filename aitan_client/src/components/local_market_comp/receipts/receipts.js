import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { useDispatch, useSelector } from 'react-redux';
import { loadReceiptHeaders, deletHeader, saveHeader2Update, copy2Header, updateInvoiceStatus } from '../../../redux/local_market_actions/receipts/receipts_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditHeader';
import AddPage from './AddHeader';
import ShowPage from './receipt_details';
import moment from "moment";
import { TbEdit } from "react-icons/tb";
import Popup2Buttons from '../../general_comp/popUps/Popup2Buttons'

const ReceiptsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  const [popUp, setPopUp] = useState(false)

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  useEffect(() => {
    dispatch(loadReceiptHeaders(selected_season, _token))
  }, [])

  const [rowtoUpdatestatus, setRowtoUpdatestatus] = useState()

  const handelPopUpCancel = () => {
    setPopUp(false)
  }

  const handelPopUpCont = (row) => {
    dispatch(updateInvoiceStatus(row, selected_season))
    setPopUp(false)
  }

  const handelEditInvoiceStatus = (row) => {
    setRowtoUpdatestatus(row)
    setPopUp(true)
  }


  // get the list of receipts in the store 
  let data = []
  let getData = useSelector(state => state.receipts.receiptHeaders)

  if (getData !== 'The user is not autorized') { data = getData }
  else { data = [] }


  useEffect(() => {
    if (getData === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [getData])



  const columns =
    [
      {
        Header: "עונה",
        accessor: "season",
        width: "10%"
      },
      {
        Header: "מספר קבלה",
        accessor: "receiptNum",
        width: "10%"
      },
      {
        Header: "תאריך קבלה",
        accessor: "receiptDate",
        width: "10%",
        //Tue, 02 Aug 2022 00:00:00 GMT"
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "מספר חשבונית",
        accessor: "invoiceNum",
        width: "10%"
      },
      {
        Header: "סטטוס חשבונית",
        accessor: "invoiceStatus",
        width: "10%",
        Cell: ({ row, value }) => {
          return <div >  {value}
            <button className='iconButton' onClick={() => handelEditInvoiceStatus(row.original)}><TbEdit /></button> </div>
        }
      },
      {
        Header: "הערות",
        accessor: "receiptRemarks",
        width: "10%"
      },

    ]

  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: true
      }
    ],
    []
  );

  //************************************************************************************* */


  //printAllButtn: for the entire invoices
  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true, showDetailsButton: true }


  // set if to show action button or not
  const checkButtonDelete = () => {
    return true
  }

  const checkButtonCopy = () => {
    return true
  }


  const checkButtonEdit = () => {
    return true

  }

  //************************************************************************************* */

  let info = (
    <div style={{ width: '45%', fontSize: '1rem', marginRight: '1%' }}>
      <span> <strong> הסבר:</strong></span>
      <span> * ניתן ליצר 2 חשבוניות עבור אותה חשבונית. במידה והחשבונית עדיין פתוחה יש לסמן זאת</span>

    </div>)
  //************************************************************************************* */

  return (
    <div className="updatesMain">
      <GenericActionsPage
        pageName='יצירת קבלה'
        numOfRecordsInTable='2'
        info={info}
        saveObjtoUpdateAction={saveHeader2Update}
        deleteObjAction={deletHeader}
        toFilter={selected_season}
        copyObjAction={copy2Header}
        editObjComp={EditPage}
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried}
        col={columns}
        tableRecordsData={data}
        showDetailsComp={ShowPage}
        sortingByColumn={sortees}
        checkButtonDelete={checkButtonDelete}
        checkButtonCopy={checkButtonCopy}
        checkButtonEdit={checkButtonEdit}
      />


      <Popup2Buttons trigger={popUp} contAction={() => handelPopUpCont(rowtoUpdatestatus)} actionName={'המשך'} contCancel={handelPopUpCancel} setTrigger={setPopUp}>
        <div className='popupMessage'>האם לשנות סטטוס לחשבונית?</div>
      </Popup2Buttons>

    </div>
  );
}

export default ReceiptsPage;
