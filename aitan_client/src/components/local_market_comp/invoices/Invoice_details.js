import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLines, deletLines, saveLine2Update, copy2Lines } from '../../../redux/local_market_actions/invoices/invocies_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditLine';
import AddPage from './AddLine';


const InvoiceDetailsPage = () => {

  const dispatch = useDispatch()

  let invoiceHeader = useSelector(state => state.invoices.invoiceHeader_2_Copy)
  let selectedInvoiceHeaderID = invoiceHeader.id


  useEffect(() => {
    dispatch(loadLines(selectedInvoiceHeaderID))
  }, [selectedInvoiceHeaderID])


  // get the list of invoicelines lines in the store
  let data = useSelector(state => state.invoices.invoiceLines)


  const invoiceNum = invoiceHeader.invoiceNum


  const columns =
    [
      {
        Header: "תעודת משלוח",
        accessor: "deliveryNoteNum",
        width: "10%"
      },
      {
        Header: "מספר משטח",
        accessor: "palletNum",
        width: "10%"
      },

      {
        Header: "פרי",
        accessor: "fruitName",
        width: "10%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "10%"
      },
      {
        Header: "גודל",
        accessor: "size",
        width: "10%"
      },
      {
        Header: "איכות",
        accessor: "quality",
        width: "10%"
      },
      {
        Header: "מחיר סגירה",
        accessor: "closePrice",
        width: "10%"
      },
      {
        Header: "משקל סגירה",
        accessor: "closeWeight",
        width: "10%"
      }
    ]

  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "deliveryNoteNum",
        desc: false
      },
      {
        id: "palletNum",
        desc: false
      }
    ],
    []
  );


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true }

  // check if there is deliveryNote - to remove the delete icon
  const checkButtonDelete = (data) => {

    if (data['fruitName'] === '' && data['invoiceNum'] === '-') /*data['invoiceNum'].length==='')*/ {
      return true
    }
    else {
      return false
    }
  }

  const checkButtonCopy = (data) => {

    if (data['fruitName'] === ''&& data['invoiceNum'] === '-') {
      return true
    }
    else {
      return false
    }
  }


  const checkButtonEdit = (data) => {

    if (data['fruitName'] === ''&& data['invoiceNum'] === '-') {
      return true
    }
    else {
      return false
    }
  }


  return (
    <div className="updatesMain detailsData">
      <GenericActionsPage
        pageName={'נתוני חשבונית  #' + invoiceNum}
        numOfRecordsInTable='5'
        saveObjtoUpdateAction={saveLine2Update}
        deleteObjAction={deletLines}
        toFilter={selectedInvoiceHeaderID}
        copyObjAction={copy2Lines}
        editObjComp={EditPage}
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried}
        col={columns}
        tableRecordsData={data}
        sortingByColumn={sortees}
        checkButtonDelete={checkButtonDelete}
        checkButtonCopy={checkButtonCopy}
        checkButtonEdit={checkButtonEdit}
      />
    </div>
  );
}

export default InvoiceDetailsPage;
