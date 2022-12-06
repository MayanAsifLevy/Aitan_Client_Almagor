import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlots, deletPlot, savePlot2Update, copy2Plot } from '../../../redux/rec_fruit_actions/plotsOld/plots_actions'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EaditPage from './EditPlot';
import AddPage from './AddPlot';


const PlotPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)


  let plotsList = useSelector(state => state.plots.plots)

  useEffect(() => {
    // as ussually we will add more data to teh database (עדכונים) after we will Edit /Add receiving fruits (where we aleardy bring the list)
    if (plotsList.length === 0) { dispatch(loadPlots(_token)) }
  }, [])


  let data = []
  let getData = useSelector(state => state.plots.plots)
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
        Header: "חלקה",
        accessor: "plotName",
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
        pageName='חלקות' 
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
