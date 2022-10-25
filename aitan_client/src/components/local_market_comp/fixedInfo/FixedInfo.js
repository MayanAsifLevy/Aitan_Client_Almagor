import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadFixedInfo, saveFixedInfo2Update } from '../../../redux/local_market_actions/fixedInfo/fixedInfo_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EditPage from './EditFixedInfo';
import * as  genericfunctions from '../../general_comp/GenericFunctions'


const FixedInfoPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    dispatch(loadFixedInfo(_token))
  }, [])


  // get the list of fixedInfo in the store
  let data = []
  let getData = useSelector(state => state.fixedInfo.fixedInfo)
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
        Header: "שם ערך עברית",
        accessor: "name_hebrew",
        width: "20%"
      },
      {
        Header: "ערך",
        accessor: "value",
        Cell: ({ value }) => genericfunctions.formatPercentage(value),
        width: "20%"
      }
    ]

  //    the deafult sort column
  const sortees = React.useMemo(
    () => [
      {
        id: "name_hebrew",
        desc: false
      }
    ],
    []
  );


  const buttonsdRequried = { updateButton: true }

  return (
    <div className="updatesMain">
      <GenericUpdatesPage 
        pageName='מידע קבוע' 
        numOfRecordsInTable='3' 
        saveObjtoUpdateAction={saveFixedInfo2Update}
        editObjComp={EditPage} 
        buttonsdRequried={buttonsdRequried}
        col={columns} 
        tableRecordsData={data} 
        sortingByColumn={sortees} />
    </div>
  );
}

export default FixedInfoPage;
