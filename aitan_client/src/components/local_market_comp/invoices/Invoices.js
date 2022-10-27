import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { useDispatch, useSelector } from 'react-redux';
import { loadHeaders, deletHeader, saveHeader2Update, copy2Header, loadInvocieReportData } from '../../../redux/local_market_actions/invoices/invocies_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditHeader';
import AddPage from './AddHeader';
import ShowPage from './Invoice_details';
import moment from "moment";


const InvoicesPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  let _token = useSelector(state => state.login.Token.token)


  useEffect(() => {
    dispatch(loadHeaders(selected_season, _token))
  }, [])


  // get the list of invocies in the store
  let data = []
  let getData = useSelector(state => state.invoices.invoiceHeaders)

  if (getData !== 'The user is not autorized') { data = getData }
  else { data = [] }


  useEffect(() => {
    if (getData === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [getData])


  const intersperse = (arr, sep) => arr.reduce((a, v) => [...a, v, sep], []).slice(0, -1)


  const columns =
    [
      // {
      //   Header: "ID",
      //   accessor: "id",
      //   disableFilters: true,
      //   width: "5%",
      //   Cell: (props) => {
      //   return (
      //   <div style={{ color: 'gray'}}>
      //      {props.value}
      //       </div>
      //   );
      //   }
      // },

      {
        Header: "עונה",
        accessor: "season",
        width: "10%"
      },
      {
        Header: "מספר חשבונית",
        accessor: "invoiceNum",
        width: "10%"
      },
      {
        Header: "תאריך חשבונית",
        accessor: "invoiceDate",
        width: "10%",
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
        Header: "חשבונית יצרן",
        accessor: "ManufacturerInvNum",
        width: "11%"
      },
      {
        Header: "סטטוס חשבונית ",
        accessor: "invoiceStatus",
        width: "15%",
        tipText: "ניתן לשנות רק דרך קבלה",
      },
      {
        Header: "מספר קבלה",
        accessor: "receiptNum",
        width: "10%",
        Cell: ({ value }) => { return value = intersperse(value, ", "); }
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


  //printAllButtn: for the entire invoices
  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true, showDetailsButton: true, printAllButton: true /*, printButton: true*/ }

  // Mayan - check if there is receipts - to remove the delete icon
  const checkButtonDelete = (data) => {


    if (data['receiptNum'].length === 0) {
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

  const handelReportData = (row) => {


    const reportParams = { 'invoiceHeaderID': row.id, 'palletNum': row.palletNum, 'traderName': row.traderName, 'invoiceDate': row.invoiceDate, 'invoiceNum': row.invoiceNum }

    dispatch(loadInvocieReportData(reportParams['invoiceHeaderID']))

      //once done we get the result of the data from the action and saveit in teh localstorage
      .then(function (result) {

       localStorage.setItem('invoiceLinesFilter', JSON.stringify(result['invoiceLines']))
        localStorage.setItem('palletCostFilter', JSON.stringify(result['palletCost']))
        localStorage.setItem('resellerInfoFilter', JSON.stringify(result['resellerInfo']))

        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {

        // save the DB data in the store
        localStorage.setItem('reportFilters', JSON.stringify(reportParams))
        return window.open("/invoiceReport/")

      })
  }
  //************************************************************************************* */

  let info = (
    <div style={{ width: '45%', fontSize: '1rem', marginRight: '1%' }}>
      <span> <strong> הסבר:</strong></span>
      <span> * ניתן למחוק חשבונית רק במידה ולא קיימות קבלות עבורה</span>

    </div>)
  //************************************************************************************* */

  return (
    <div className="updatesMain">
      <GenericActionsPage
        pageName='יצירת חשבונית'
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
      />

    </div>
  );
}

export default InvoicesPage;
