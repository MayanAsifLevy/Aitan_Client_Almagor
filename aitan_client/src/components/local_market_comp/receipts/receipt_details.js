import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLines, deletLines, saveLine2Update, copy2Lines } from '../../../redux/local_market_actions/receipts/receipts_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditLine';
import AddPage from './AddLine';
import moment from "moment";


const ReceiptDetailsPage = () => {

  const dispatch = useDispatch()

  let receiptHeader = useSelector(state => state.receipts.receiptHeader_2_Copy)
  let selectedReceiptHeaderID = receiptHeader.id


  useEffect(() => {
    dispatch(loadLines(selectedReceiptHeaderID))
  }, [selectedReceiptHeaderID])


  // get the list of receiptlines lines in the store
  let data = useSelector(state => state.receipts.receiptLines)


  const receiptNum = receiptHeader.receiptNum


  const columns =
    [
      {
        Header: "סוג תשלום",
        accessor: "paymentType",
        width: "10%"
      },
      {
        Header: "מספר צ'ק",
        accessor: "checkNum",
        width: "10%"
      },

      {
        Header: "שם בנק",
        accessor: "bankName",
        width: "10%"
      },
      {
        Header: "תאריך פרעון",
        accessor: "paymentDueDate",
        width: "10%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "סכום תשלום",
        accessor: "sumPayment",
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
      return true
  }

  const checkButtonCopy = (data) => {
    return true
  }
  

  const checkButtonEdit = (data) => {
    return true
  }


  return (
    <div className="updatesMain detailsData">
      <GenericActionsPage
        pageName={'נתוני קבלה  #' + receiptNum}
        numOfRecordsInTable='5'
        saveObjtoUpdateAction={saveLine2Update}
        deleteObjAction={deletLines}
        toFilter={selectedReceiptHeaderID}
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

export default ReceiptDetailsPage;
