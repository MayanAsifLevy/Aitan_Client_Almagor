import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadFruits, deletFruit, saveFruit2Update, copy2Fruit } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EaditPage from './EditFruit';
import AddPage from './AddFruit';


const FruitsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();


  let _token = useSelector(state => state.login.Token.token)

  let fruitTypesList = useSelector(state => state.fruits.fruits)

  // as the load contains the unique list of fruits and we run the load only once a page (useEffect[])
  //  in case we added new fruit but we didnt add it to teh DB, next time we will enter the page - it iwll dissapear - which is good (save us the need to deleteing incorrect fruitNames )

  useEffect(() => {
    // as ussually we will add more data to teh database (עדכונים) after we will Edit /Add receiving fruits (where we aleardy bring the list)
    if (fruitTypesList.length === 0) { dispatch(loadFruits(_token)) }
  }, [])

  let data = []
  let getData = useSelector(state => state.fruits.fruits)
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
        Header: "פרי",
        accessor: "fruitName",
        width: "30%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
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


  const buttonsdRequried = { updateButton: true, copyButton: true, deleteButton: true }


  return (

    <div className="updatesMain">
      <GenericUpdatesPage
        pageName='פירות'
        numOfRecordsInTable='10'
        saveObjtoUpdateAction={saveFruit2Update}
        deleteObjAction={deletFruit}
        copyObjAction={copy2Fruit}
        editObjComp={EaditPage}
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried}
        col={columns}
        tableRecordsData={data}
        sortingByColumn={sortees} />
    </div>
  );
}

export default FruitsPage;
