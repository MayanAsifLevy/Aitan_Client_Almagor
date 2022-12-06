import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlots, deletPlot, savePlot2Update, copy2Plot , copyAllPlotsfromPrevYear} from '../../../redux/rec_fruit_actions/plotDunam/plotsDunam_actions'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EaditPage from './EditPlotDunam';
import AddPage from './AddPlotDunam';


const PlotPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let selected_season = useSelector(state => state.general.season)

  let _token = useSelector(state => state.login.Token.token)


  let plotsList = useSelector(state => state.plotsDunam.plots)

  useEffect(() => {
    // as ussually we will add more data to the database (תשתית) after we will Edit /Add receiving fruits (where we aleardy bring the list)
     dispatch(loadPlots(selected_season, _token)) 
  }, [])


  let data = []
  let getData = useSelector(state => state.plotsDunam.plots)
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
        Header: "עונה",
        accessor: "season",
        width: "10%"
      },
      {
        Header: "חלקה",
        accessor: "plotName",
        width: "10%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "10%"
      },
      {
        Header: "מספר דונמים",
        accessor: "dunam",
        width: "10%"
      },
      {
        Header: "שנת שתילה",
        accessor: "plantYear",
        width: "10%"
      },
      {
        Header: "שנת הרכבה",
        accessor: "assamblyYear",
        width: "10%"
      },
      {
        Header: "בעל החלקה",
        accessor: "plotOwner",
        width: "10%"
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

   //************************************************************************************* */

   const handleCopyData=()=>
   {
      //copy the data of previous year
      dispatch(copyAllPlotsfromPrevYear(selected_season-1, _token)) 
   }

   let info = (
    <div style={{ width: '40%', fontSize: '1rem', marginRight: '1%' }}>
      {(plotsList.length === 0) ?<input type="button" value="העתק נתוני שנה קודמת לשנה נוכחית" onClick={()=>handleCopyData()}/>:''}

    </div>)
  //************************************************************************************* */



  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: false }


  return (

    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='חלקות' 
        info={info}
        numOfRecordsInTable='10' 
        saveObjtoUpdateAction={savePlot2Update}
        deleteObjAction={deletPlot} 
        copyObjAction={copy2Plot} 
        editObjComp={EaditPage} 
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried} 
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default PlotPage;
