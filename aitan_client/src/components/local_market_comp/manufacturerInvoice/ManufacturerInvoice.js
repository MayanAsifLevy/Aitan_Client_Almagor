import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loadManufacturerInvoices, deletManufacturerInvoice, saveManufacturerInvoice2Update, copy2ManufacturerInvoice } from '../../../redux/local_market_actions/manufacturerInvoice/manufacturerInvoice_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import EditPage from './EditManufacturerInvoice';
import AddPage from './AddManufacturerInvoice';
import moment from "moment";

const ManufacturerInvoicePage = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate();


  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    dispatch(loadManufacturerInvoices(selected_season, _token))
  }, [])


  // get the list of manufacturerInvoices in the store
  let data = []
  let getData = useSelector(state => state.manufacturerInvoice.manufacturerInvoices)
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
        width: "20%"
      },
      {
        Header: "מספר חשבונית יצרן",
        accessor: "ManufacturerInvNum",
        width: "20%"
      },
      {
        Header: "סכום סופי (שח)",
        accessor: "invoiceTotal",
        width: "20%"
      },
      {
        Header: "תאריך חשבונית ",
        accessor: "invoiceDate",
        width: "20%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "הערות",
        accessor: "invoiceRemarks",
        width: "20%"
      }
    ]


  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "ManufacturerInvNum",
        desc: true
      }
    ],
    []
  );


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true }

  return (
    <div className="updatesMain">
      <GenericUpdatesPage
        pageName='חשבוניות יצרן'
        toFilter={selected_season}
        numOfRecordsInTable='10'
        saveObjtoUpdateAction={saveManufacturerInvoice2Update}
        deleteObjAction={deletManufacturerInvoice}
        copyObjAction={copy2ManufacturerInvoice}
        editObjComp={EditPage}
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried}
        col={columns}
        tableRecordsData={data}
        sortingByColumn={sortees} />
    </div>
  );
}

export default ManufacturerInvoicePage;
