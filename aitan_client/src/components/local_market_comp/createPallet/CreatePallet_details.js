import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLines, deletLines, saveLine2Update, copy2Lines } from '../../../redux/local_market_actions/createPallet/createPallet_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditLine';
import AddPage from './AddLine';


const CreatePalletDetailsPage = () => {

  const dispatch = useDispatch()

  let palletHeader = useSelector(state => state.createPallet.createPalletHeader_2_Copy)
  let selectedPalletID = palletHeader.id

  useEffect(() => {
    dispatch(loadLines(selectedPalletID))
  }, [])

  useEffect(() => {
    dispatch(loadLines(selectedPalletID))
  }, [selectedPalletID])


  // get the list pallets in the store
  const data = useSelector(state => state.createPallet.createPalletLines)

  const palletNumber = palletHeader.palletNum
  const columns =
    [

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
        Header: "סוג אריזה",
        accessor: "marketPackingMatType",
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
      }
    ]

  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: false
      }
    ],
    []
  );


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true }


  // if there is deliveryNote - to remove the delete icon
  const checkButtonDelete = (data) => {


    if (data['deliveryNoteNum'] !== '-') {
      return false
    }
    else {
      return true
    }
  }

  const checkButtonCopy = (data) => {
    if (data['deliveryNoteNum'] === '-') {
      return true
    }
    else {
      return false
    }

  }

  const checkButtonEdit = (data) => {
    if (data['deliveryNoteNum'] === '-') {
      return true
    }
    else {
      return false
    }

  }

  return (
    <div className="updatesMain detailsData">
      <GenericActionsPage
        pageName={'נתוני משטח  #' + palletNumber}
        numOfRecordsInTable='5'
        saveObjtoUpdateAction={saveLine2Update}
        deleteObjAction={deletLines}
        toFilter={selectedPalletID}
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

export default CreatePalletDetailsPage;
