import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clickLogOut } from "../../../redux/mainPage/general_actions";
import { useDispatch, useSelector } from 'react-redux';
import { loadClosingData, deleteClosingData, saveClosingData2Update, copy2ClosingData } from '../../../redux/local_market_actions/closingData/closingData_actions'
import GenericActionsPage from '../../general_comp/GenericActionsPage';
import EditPage from './EditClosingData';
import moment from "moment";

const ClosingDataPage = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate();

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    dispatch(loadClosingData(selected_season, _token))
  }, [])


  // get the list of closingData in the store
  let data = []
  let getData = useSelector(state => state.closingData.closingData)
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
        Header: "ת. משלוח",
        accessor: "deliveryNoteNum",
        width: "7%"
      },
      {
        Header: "סוחר",
        accessor: "traderName",
        width: "5%"
      },
      {
        Header: "משטח",
        accessor: "palletNum",
        width: "5%"
      },
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "5%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "5%"
      },

      {
        Header: "גודל",
        accessor: "size",
        width: "3%"
      },
      {
        Header: "איכות",
        accessor: "quality",
        width: "3%"
      },
      {
        Header: "אריזה",
        accessor: "marketPackingType",
        width: "5%"
      },
      {
        Header: "כמות באריזה",
        accessor: "packMatQty",
        width: "9%"
      },
      {
        Header: "משקל נטו",
        accessor: "weightNeto",
        width: "7%"
      },
      {
        Header: "משקל סגירה",
        accessor: "closeWeight",
        width: "10%"
      },
      {
        Header: "מחיר סגירה",
        accessor: "closePrice",
        width: "8%"
      },
      {
        Header: "ת. סגירה ",
        accessor: "closeDate",
        width: "10%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return value == null ? value : moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "הערות",
        accessor: "closeRemarks",
        width: "5%"
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


  const buttonsdRequried = { updateButton: true, copyButton: false, deleteButton: true }

  // check if there is deliveryNote - to remove the delete icon
  const checkButtonDelete = (data) => {
    if (data['id'] === null) {
      return false
    }
    else {
      return true
    }
  }


  const checkButtonCopy = () => {
    return false
  }

  const checkButtonEdit = () => {
    return true
  }


  let info = (
    <div style={{ width: '40%', fontSize: '1rem', marginRight: '1%' }}>
      <span> <strong> הסבר:</strong></span>
      <br />
      <span> * רק משטחים הקיימים בתעודת משלוח יהיו זמינים בטבלה זו- לעונה זו</span>
      <br />
      <span> * ברגע המחיקה - ימחקו כל נתוני הסגירה מהשורה בצורה אוטומטית</span>
    </div>)



  return (
    <div className="updatesMain">

      <GenericActionsPage
        pageName='נתוני סגירה'
        numOfRecordsInTable='10'
        saveObjtoUpdateAction={saveClosingData2Update}
        deleteObjAction={deleteClosingData}
        toFilter={selected_season}
        copyObjAction={copy2ClosingData}
        editObjComp={EditPage}
        info={info}
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

export default ClosingDataPage;
