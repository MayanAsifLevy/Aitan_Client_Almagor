import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadPalletsMatCost, deletePalletMatCost, savePalletMatCost2Update, copy2PalletMatCost } from '../../../redux/local_market_actions/palletsMatCost/palletsMatCost_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditPalletMatCost';
import AddPage from './AddPalletMatCost';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const PalletsMatCostPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let _token = useSelector(state => state.login.Token.token)

  let matrecordSelected = useSelector(state => state.palletsMat.savePalletMat4cost)
  let matIDSelected = matrecordSelected.id


  useEffect(() => {
    dispatch(loadPalletsMatCost(matIDSelected, _token))
  }, [])


  // get the list of pallets in the store
  let data = []
  let getData = useSelector(state => state.palletsMatCost.palletsMatCost)
  if (getData !== 'The user is not autorized') { data = getData }
  else { data = [] }


  useEffect(() => {
    if (getData === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [getData])

  const handelback = () => {
    navigate('/mainPage/palletsMat/')
  }
  const columns =
    [
      {
        Header: "סוג משטח",
        accessor: "palletMatType",
        width: "20%"
      },
      {
        Header: "מתאריך",
        accessor: "fromDate",
        width: "20%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "עד תאריך",
        accessor: "toDate",
        width: "20%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "עלות משטח",
        accessor: "palletMatCost",
        width: "20%",
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
      <span> * עבור כל סוג משטח יכולים להיות מחירים שונים בתקופות שונות</span>
      <br />
      <span> * לרשומה בעלת התאריך האחרון יש להכניס " עד תאריך" : 2048</span>
      <br /> <br />
      <button className="cost_button" onClick={handelback}>חזור לעמוד משטחים</button>
    </div>)


  return (
    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='עלות משטחים' 
        info={info} 
        numOfRecordsInTable='10'
        saveObjtoUpdateAction={savePalletMatCost2Update} 
        toFilter={matIDSelected} 
        deleteObjAction={deletePalletMatCost}
        copyObjAction={copy2PalletMatCost} 
        editObjComp={EditPage} 
        addPageComp={AddPage} 
        buttonsdRequried={buttonsdRequried}
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default PalletsMatCostPage;
