import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLines, deletLines, saveLine2Update, copy2Lines } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditLine';
import AddPage from './AddLine';


const DeliveryNoteDetailsPage = () => {

  const dispatch = useDispatch()

  let deliveryNoteHeader = useSelector(state => state.deliveryNote.deliveryNoteHeader_2_Copy)
  let selectedDeliveryHeaderID = deliveryNoteHeader.id

  useEffect(() => {
    dispatch(loadLines(selectedDeliveryHeaderID))
  }, [selectedDeliveryHeaderID])


  // get the list of deliveryNotes in the store
  let data = useSelector(state => state.deliveryNote.deliveryNoteLines)


  const deliveryNoteNum = deliveryNoteHeader.deliveryNoteNum

  const columns =
    [
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
        Header: "אריזה",
        accessor: "packingMat",
        width: "10%"
      },
      {
        Header: "כמות באריזה",
        accessor: "packMatQty",
        width: "10%"
      },
      {
        Header: "משקל נטו",
        accessor: "weightNeto",
        width: "10%"
      },
      {
        Header: "נתוני סגירה הוכנסו?",
        accessor: "closingDataID",
        width: "15%",
        Cell: ({ value }) => (value != null ? 'כן' : ''),
        // Cell: (props) => {
        //   return (
        //     <p style={{ color: props.value === null ?  "black" :''}}>
        //       {props.value!=null?  'יש':''}
        //     </p>
        //   );
        // }
      }
    ]


  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "palletNum",
        desc: false
      },
      {
        id: "fruitName",
        desc: false
      }
    ],
    []
  );


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true }

  // check if there is deliveryNote - to remove the delete icon
  const checkButtonDelete = (data) => {

    if (data['fruitName'] === '' && data['closingData'].length === 0 && data['invoiceNum'] === '-') {

      return true
    }
    else {
      return false
    }
  }


  const checkButtonCopy = (data) => {

    if (data['fruitName'] === ''&& data['closingData'].length === 0 && data['invoiceNum'] === '-') {
      return true
    }
    else {
      return false
    }
  }


  const checkButtonEdit = (data) => {

    if (data['fruitName'] === ''&& data['closingData'].length === 0 && data['invoiceNum'] === '-') {
      return true
    }
    else {
      return false
    }
  }


  return (

    <div className="updatesMain detailsData">

      <GenericActionsPage
        pageName={'נתוני תעודת משלוח  #' + deliveryNoteNum}
        numOfRecordsInTable='5'
        saveObjtoUpdateAction={saveLine2Update}
        deleteObjAction={deletLines}
        // otherDeleteFilter={otherDeleteFilter} // for deleting the closing data
        toFilter={selectedDeliveryHeaderID}
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


export default DeliveryNoteDetailsPage;
