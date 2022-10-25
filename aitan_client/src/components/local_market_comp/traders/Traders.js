import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loadTraders, deletTrader, saveTrader2Update, copy2Trader } from '../../../redux/local_market_actions/traders/traders_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import EditPage from './EditTrader';
import AddPage from './AddTrader';


const TradersPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  let tradersList = useSelector(state => state.traders.traders)


  useEffect(() => {
    if (tradersList.length === 0) { dispatch(loadTraders(_token)) }
  }, [])


  // get the list of traders in the store
  let data = []
  let getData = useSelector(state => state.traders.traders)
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
        Header: "סוחר",
        accessor: "traderName",
        width: "20%"
      },
      {
        Header: "אזור",
        accessor: "area",
        width: "20%"
      },
      {
        Header: "פעיל?",
        accessor: "isActive",
        width: "40%",
        tipText: "כדי לפלטר  רק את הפעילים יש להכניס 1",
        Cell: (row) => {
          return <input className="checkbox_is_Active" type='checkbox' readOnly={true} checked={row.value} />
        }
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


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true }

  return (
    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='סוחרים' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={saveTrader2Update} 
        deleteObjAction={deletTrader}
        copyObjAction={copy2Trader} 
        editObjComp={EditPage} 
        addPageComp={AddPage} 
        buttonsdRequried={buttonsdRequried}
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default TradersPage;
