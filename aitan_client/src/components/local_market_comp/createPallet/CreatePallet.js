import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadHeaders, deletHeader, saveHeader2Update, copy2Header } from '../../../redux/local_market_actions/createPallet/createPallet_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage'
import EditPage from './EditHeader';
import AddPage from './AddHeader';
import ShowPage from './CreatePallet_details';
import moment from "moment";

const CreatePalletPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    dispatch(loadHeaders(selected_season, _token))
  }, [])


  // get the list of traders in the store
  let data = []
  let getData = useSelector(state => state.createPallet.createPalletHeaders)
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
        Header: "מספר משטח",
        accessor: "palletNum",
        width: "10%"
      },
      {
        Header: "סוג משטח",
        accessor: "palletMatType",
        width: "10%"
      },
      {
        Header: "ת. אריזה",
        accessor: "packingDate",
        width: "10%",
        //Tue, 02 Aug 2022 00:00:00 GMT"
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "תעודת משלוח",
        accessor: "deliveryNoteNum",
        width: "10%"
      },
      {
        Header: "הערות",
        accessor: "palletRemarks",
        width: "10%"
      }
    ]

  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "palletNum",
        desc: true
      }
    ],
    []
  );

  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true, showDetailsButton: true }

  // check if there is deliveryNote - to remove the delete icon
  const checkButtonDelete = (data) => {

    if (data['deliveryNoteNum'] === '-') {
      return true
    }
    else {
      return false
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
    <div className="updatesMain">
      <GenericActionsPage
        pageName='יצירת משטח'
        numOfRecordsInTable='2'
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
    </div>
  );
}

export default CreatePalletPage;
