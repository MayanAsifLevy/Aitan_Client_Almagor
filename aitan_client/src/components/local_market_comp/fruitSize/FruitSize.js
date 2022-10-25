import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFruitSize, deletFruitSize, saveFruitSize2Update, copy2FruitSize } from '../../../redux/local_market_actions/fruitSize/fruitSize_actions'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { useNavigate } from 'react-router-dom'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditFruitSize';
import AddPage from './AddFruitSize';


const FruitSizePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  let fruitSizeList = useSelector(state => state.fruitSize.fruitSize)


  useEffect(() => {
    if (fruitSizeList.length === 0) { dispatch(loadFruitSize(_token)) }
  }, [])


  // get the list of fruitSize in the store
  let data = []
  let getData = useSelector(state => state.fruitSize.fruitSize)
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
        Header: "גודל",
        accessor: "size",
        width: "40%"
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
        pageName='גודל פרי' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={saveFruitSize2Update}
        deleteObjAction={deletFruitSize} 
        copyObjAction={copy2FruitSize} 
        editObjComp={EditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}


export default FruitSizePage;
