import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadGrowers, deletGrower, saveGrower2Update, copy2Grower } from '../../../redux/rec_fruit_actions/growers/growers_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EaditPage from './EditGrower';
import AddPage from './AddGrower';


const GrowersPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const _token = useSelector(state => state.login.Token.token)

  let growersList = useSelector(state => state.growers.growers)

  useEffect(() => {
    // as usually we will add more data to teh database (עדכונים) after we will Edit /Add receiving fruits (where we aleardy bring the list)
    if (growersList.length === 0) { dispatch(loadGrowers(_token)) }

  }, [])

  let data = []
  let getData = useSelector(state => state.growers.growers)
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
        Header: "מגדל",
        accessor: "growerName",
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


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: false }


  return (

    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='מגדלים' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={saveGrower2Update}
        deleteObjAction={deletGrower} 
        copyObjAction={copy2Grower} 
        editObjComp={EaditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default GrowersPage;
