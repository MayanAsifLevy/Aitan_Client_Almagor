import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadMarketPackings, deleteMarketPacking, saveMarketPacking2Update, copy2MarketPacking } from '../../../redux/local_market_actions/marketPackingMat/marketPackingMat_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditMarketPackingMat';
import AddPage from './AddMarketPackingMat';


const MarketPackingMatPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let marketPackingMatList = useSelector(state => state.marketPacking.marketPacking)

  let _token= useSelector(state=> state.login.Token.token)

  useEffect(() => {
    if (marketPackingMatList.length === 0) { dispatch(loadMarketPackings(_token)) }
  }, [])


  // get the list of marketPacking in the store
  let data=[]
  let getData = useSelector(state => state.marketPacking.marketPacking)
  if (getData!=='The user is not autorized') 
    {data=getData}
  else
    {data=[]}


  useEffect(() => {
    if (getData==='The user is not autorized' )
    {dispatch(clickLogOut())
    navigate("/")}

  }, [getData])

    

  const columns =
    [
      {
        Header: "סוג אריזה",
        accessor: "marketPackingType",
        width: "20%"
      },
      {
        Header: "פעיל?",
        accessor: "isActive",
        width: "20%",
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
        pageName='משטחים' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={saveMarketPacking2Update}
        deleteObjAction={deleteMarketPacking} 
        copyObjAction={copy2MarketPacking} 
        editObjComp={EditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default MarketPackingMatPage;
