import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadReceivingFruits, deletReceivingFruit, saveReceivingFruit2Update, copy2ReceivingFruit } from '../../../redux/rec_fruit_actions/receivingFruits/receivingFruits_actions'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditReceiveFruit';
import AddPage from './AddReceiveFruit';
import moment from "moment";



const ReceiveFruitsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)


  let _token = useSelector(state => state.login.Token.token)


  useEffect(() => {
    dispatch(loadReceivingFruits(selected_season, _token))
  }, [])

  let data = []
  let getData = useSelector(state => state.receivingFruits.receivingFruits)
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
        Header: "ת. קבלה",
        accessor: "receivingDate",
        width: "10%",
        //Tue, 02 Aug 2022 00:00:00 GMT"
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "עונה",
        accessor: "season",
        width: "8%",
      },
      {
        Header: 'ביא"ר',
        accessor: "packingHouseName",
        width: "8%",
        filter: 'equals',
      },
      {
        Header: "מגדל",
        accessor: "growerName",
        width: "8%"
      },
      {
        Header: "ת. משלוח",
        accessor: "deliverNote",
        width: "8%"
      },
      {
        Header: "חלקה",
        accessor: "plotName",
        width: "8%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "10%"
      },
      {
        Header: "עסקה",
        accessor: "dealName",
        width: "10%"
      },
      {
        Header: "אריזה",
        accessor: "packingType",
        width: "8%"
      },
      {
        Header: "יח' אריזה",
        accessor: "qtyInPacking",
        width: "8%",
        //filter: 'equals'
      },
      {
        Header: "משקל ברוטו",
        accessor: "weightBruto",
        width: "10%",
       // filter: 'equals'        
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
        pageName='קבלת פרי'
        numOfRecordsInTable='10'
        saveObjtoUpdateAction={saveReceivingFruit2Update}
        deleteObjAction={deletReceivingFruit}
        toFilter={selected_season}
        copyObjAction={copy2ReceivingFruit}
        editObjComp={EditPage}
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried}
        col={columns}
        tableRecordsData={data}
        sortingByColumn={sortees} />

    </div>
  );
}

export default ReceiveFruitsPage;

