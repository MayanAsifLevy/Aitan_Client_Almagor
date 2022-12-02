import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadHeaders, deletHeader, saveHeader2Update, copy2Header, loadDeliveryNoteReportData } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditHeader';
import AddPage from './AddHeader';
import ShowPage from './DeliveryNote_details';
import moment from "moment";
import * as  genericfunctions from '../../general_comp/GenericFunctions'


const DeliveryNotePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  useEffect(() => {
    dispatch(loadHeaders(selected_season, _token))
  }, [])


  // get the list of deliveryNote headers in the store
  let data = []
  let getData = useSelector(state => state.deliveryNote.deliveryNoteHeaders)
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
        Header: "ID",
        accessor: "id",
        disableFilters: true,
        width: "5%"
      }
      ,
      {
        Header: "עונה",
        accessor: "season",
        width: "10%"
      },
      {
        Header: "תעודת משלוח",
        accessor: "deliveryNoteNum",
        width: "10%"
      },
      {
        Header: "ת. תעודת משלוח",
        accessor: "deliveryDate",
        width: "15%",
        //Tue, 02 Aug 2022 00:00:00 GMT"
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "סוחר",
        accessor: "traderName",
        width: "10%"
      },
      {
        Header: "%  עמלת סוחר",
        accessor: "traderPrcnt",
        width: "10%",
        Cell: ({ value }) => genericfunctions.formatPercentage(value),
      },
      {
        Header: "% עמלת משווק",
        accessor: "distributerPrcnt",
        width: "10%",
        Cell: ({ value }) => genericfunctions.formatPercentage(value),
      },
      {
        Header: "מעמ",
        accessor: "VAT",
        width: "10%",
        Cell: ({ value }) => genericfunctions.formatPercentage(value),
      },
      {
        Header: "חשבונית",
        accessor: "invoiceNum",
        width: "10%"
      }
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

  //printButton: for the 2% deliveryNote
  //printAllButtn: for the entire deliveryNote
  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true, showDetailsButton: true, printAllButton: true, printButton: true }

 
  // check if there is deliveryNote - to remove the delete icon for each record in the table!!
  const checkButtonDelete = (data) => {


    if ((data['closingData'].length === 0) && data['invoiceNum'] === '-') /*(data['invoiceNum'].length===0))*/ {
      return true
    }
    else {
      return false
    }
  }


  const checkButtonCopy = () => {
    return true
  }


  const checkButtonEdit = () => {
    return true

  }


  //************************************************************************************* */

  const handelReportData = (row, reportType) => {

    const reportParams = { 'deliveryNoteNum': row.deliveryNoteNum, 'traderName': row.traderName, 'deliveryDate': row.deliveryDate, 'deliveryHeaderID': row.id, 'season': row.season }

    dispatch(loadDeliveryNoteReportData(reportType, reportParams['deliveryNoteNum'], reportParams['season']))

      //once done we get the result of the data from the action and saveit in teh localstorage
      .then(function (result) {

        localStorage.setItem('reportData', JSON.stringify(result))


        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {

        // save the DB data in the store
        localStorage.setItem('reportFilters', JSON.stringify(reportParams))
        switch (reportType) {
          case "all":
            return window.open("/deliveryNoteReport/")

          case "2prct":
            return window.open("/deliveryNote2prctReport/")


          default:
            return ""
        }
      })
  }
  //************************************************************************************* */

  let info = (
    <div style={{ width: '40%', fontSize: '1rem', marginRight: '1%' }}>
      <span> <strong> הסבר:</strong></span>
      <span> *  ניתן למחוק תעודת משלוח או לעדכנה רק במידה ולא קיימים נתוני סגירה או חשבונית</span>

    </div>)
  //************************************************************************************* */

  return (

    <div className="updatesMain">

      <GenericActionsPage
        pageName='יצירת תעודת משלוח'
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
        handelReportData={handelReportData}
        reportTypeAll={'all'}
        reportPartial={'2prct'}
      />

    </div>
  );
}


export default DeliveryNotePage;
