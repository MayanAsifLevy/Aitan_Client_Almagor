import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadDealNames, deletDealName, saveDealName2Update, copy2DealName } from '../../../redux/rec_fruit_actions/dealNames/dealNames_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EaditPage from './EditDealName';
import AddPage from './AddDealName';


const DealNamesPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  let dealNamesList = useSelector(state => state.dealNames.dealNames)


  useEffect(() => {
    // as ussually we will add more data to the database (עדכונים) after we will Edit /Add receiving fruits (where we aleardy bring the list)
    if (dealNamesList.length === 0) { dispatch(loadDealNames(_token)) }
  }, [])



  let data = []
  let getData = useSelector(state => state.dealNames.dealNames)
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
        Header: "עסקה",
        accessor: "dealName",
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
        pageName='שם עסקה' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={saveDealName2Update}
        deleteObjAction={deletDealName} 
        copyObjAction={copy2DealName} 
        editObjComp={EaditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default DealNamesPage;
