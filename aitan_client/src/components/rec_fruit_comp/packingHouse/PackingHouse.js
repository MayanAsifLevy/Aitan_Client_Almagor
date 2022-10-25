import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadpackingHouses, deletPackingHouse, savePackingHouse2Update, copy2PackingHouse } from '../../../redux/rec_fruit_actions/packingHouse/packingHouse_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditPackingHouse';
import AddPage from './AddPackingHouse';


const PackingHousePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();


  let _token = useSelector(state => state.login.Token.token)

  let packingHousesList = useSelector(state => state.packingHouse.packingHouses)

  useEffect(() => {
    // as ussually we will add more data to teh database (עדכונים) after we will Edit /Add receiving fruits (where we aleardy bring the list)
    if (packingHousesList.length === 0) { dispatch(loadpackingHouses(_token)) }
  }, [])


  // get the list of packingHouses in the store
  let data = []
  let getData = useSelector(state => state.packingHouse.packingHouses)
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
        Header: "בית אריזה",
        accessor: "packingHouseName",
        width: "30%"
      },
      {
        Header: "ישוב",
        accessor: "location",
        width: "30%"
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

  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: false }

  return (
    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='בית אריזה' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={savePackingHouse2Update}
        deleteObjAction={deletPackingHouse} 
        copyObjAction={copy2PackingHouse} 
        editObjComp={EditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default PackingHousePage;
