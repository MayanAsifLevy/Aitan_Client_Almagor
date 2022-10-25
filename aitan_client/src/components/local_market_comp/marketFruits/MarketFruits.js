import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadMarketFruits, deletMarketFruit, saveMarketFruit2Update, copy2MarketFruit } from '../../../redux/local_market_actions/marketFruits/marketFruits_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditMarketFruit';
import AddPage from './AddMarketFruit';


const MarketFruitsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    dispatch(loadMarketFruits(_token))
  }, [])


  // get the list of marketFruits in the store
  let data = []
  let getData = useSelector(state => state.marketFruits.marketFruits)
  if (getData !== 'The user is not autorized') { data = getData }
  else { data = [] }


  useEffect(() => {
    if (getData === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [getData])

    /**************************************************** */
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
        Header: "פעיל?",
        accessor: "isActive",
        width: "10%",
        tipText: "כדי לפלטר  רק את הפעילים יש להכניס 1",
        Cell: (row) => {
          return <input className="checkbox_is_Active" type='checkbox' readOnly={true} checked={row.value} />
        }
      }
    ]

    /**************************************************** */

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

    /**************************************************** */
  return (

    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='פירות (שיווק)' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={saveMarketFruit2Update}
        deleteObjAction={deletMarketFruit} 
        copyObjAction={copy2MarketFruit} 
        editObjComp={EditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default MarketFruitsPage;
