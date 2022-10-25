import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadPackingMaterials, deletPackingMaterial, savePackingMaterial2Update, copy2PackingMaterial } from '../../../redux/rec_fruit_actions/packingMaterial/packingMaterial_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditPackingMaterial';
import AddPage from './AddPackingMaterial';


const PackingMaterialPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)


  let packingMaterialsList = useSelector(state => state.packingMaterials.packingMaterials)


  useEffect(() => {
    // as ussually we will add more data to teh database (עדכונים) after we will Edit /Add receiving fruits (where we aleardy bring the list)
    if (packingMaterialsList.length === 0) { dispatch(loadPackingMaterials(_token)) }
  }, [])


  // get the list of packingMaterials in the store
  let data = []
  let getData = useSelector(state => state.packingMaterials.packingMaterials)

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
        Header: "סוג אריזה",
        accessor: "packingType",
        width: "30%"
      },
      {
        Header: "משקל אריזה",
        accessor: "weight",
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
        pageName='אריזות' 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={savePackingMaterial2Update}
        deleteObjAction={deletPackingMaterial} 
        copyObjAction={copy2PackingMaterial} 
        editObjComp={EditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default PackingMaterialPage;
