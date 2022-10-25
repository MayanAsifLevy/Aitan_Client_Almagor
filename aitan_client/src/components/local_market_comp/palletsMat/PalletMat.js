import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadPalletsMat, deletePalletMat, savePalletMat2Update, copy2PalletMat, savePallet4Cost } from '../../../redux/local_market_actions/palletsMat/palletsMat_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditPalletMat';
import AddPage from './AddPalletMat';
import { useNavigate } from 'react-router-dom';



const PalletsMatPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let palletsMatList = useSelector(state => state.palletsMat.palletsMat)

  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    if (palletsMatList.length === 0) { dispatch(loadPalletsMat(_token)) }
  }, [])


  // get the list of pallets in the store
  let data = []
  let getData = useSelector(state => state.palletsMat.palletsMat)
  if (getData !== 'The user is not autorized') { data = getData }
  else { data = [] }


  useEffect(() => {
    if (getData === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [getData])

  const handelCosts = (row) => {
    dispatch(savePallet4Cost(row.row.original))
    navigate('/mainPage/palletsMatCost/')
  }

  const columns =
    [
      {
        Header: "סוג משטח",
        accessor: "palletType",
        width: "20%"
      },
      {
        Header: "משקל",
        accessor: "palletWeight",
        width: "20%"
      },
      {
        Header: "פעיל?",
        accessor: "isActive",
        width: "15%",
        tipText: "כדי לפלטר  רק את הפעילים יש להכניס 1",
        Cell: (row) => {
          return <input className="checkbox_is_Active" type='checkbox' readOnly={true} checked={row.value} />
        }
      },
      {
        Header: "צפיה בעלויות",
        disableFilters: true,
        accessor: 'costview',
        width: "10%",
        Cell: (row) => {
          return <button className="cost_button" onClick={() => handelCosts(row)}> עלויות</button>

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


  let info = (
    <div style={{ width: '40%', fontSize: '1rem', marginRight: '1%' }}>
      <span> <strong> הסבר:</strong></span>
      <br />
      <span> * עבור כל סוג משטח יש להכניס עלות גם אם היא  0 - דרך "צפייה בעלויות"</span>
      <br />

    </div>)


  return (
    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='משטחים' 
        info={info} 
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={savePalletMat2Update}
        deleteObjAction={deletePalletMat} 
        copyObjAction={copy2PalletMat} 
        editObjComp={EditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default PalletsMatPage;
