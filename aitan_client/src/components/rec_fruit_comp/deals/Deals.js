import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../redux/mainPage/general_actions"
import { loadDeals, deletDeal, saveDeal2Update, copy2Deal } from '../../../redux/rec_fruit_actions/deals/deals_actions'
import { loadReceivingFruits } from '../../../redux/rec_fruit_actions/receivingFruits/receivingFruits_actions'
import GenericUpdatesPage from '../../general_comp/GenericUpdatesPage'
import EaditPage from './EditDeal';
import AddPage from './AddDeal';
import moment from "moment";


const DealsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const _token = useSelector(state => state.login.Token.token)

  let DealTypesList = useSelector(state => state.deals.deals)
  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  useEffect(() => {
    // as ussually we will add more data to teh database (עדכונים) after we will Edit /Add receiving deals (where we aleardy bring the list)
    if (DealTypesList.length === 0) { dispatch(loadDeals(selected_season, _token)) }
    if (receivingFruitsList.length === 0) { dispatch(loadReceivingFruits(selected_season, _token)) }
  }, [])

  let data = []
  let getData = useSelector(state => state.deals.deals)
  if (getData !== 'The user is not autorized') { data = getData }
  else { data = [] }


  useEffect(() => {
    if (getData === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [getData])



  let receivingFruitsList = useSelector(state => state.receivingFruits.receivingFruits)


  const fruitDealList = useSelector(state => state.deals.fruit_deal_list)

  if (fruitDealList.length !== 0) {
    data['fruitDeal'] = fruitDealList
  }

  const columns =
    [
      {
        Header: "מתאריך",
        accessor: "fromDate",
        width: "10%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }

      },
      {
        Header: "עד תאריך",
        accessor: "toDate",
        width: "10%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "עונה",
        accessor: "season",
        width: "8%",
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "8%",
      },
      {
        Header: "עסקה",
        accessor: "dealName",
        width: "8%",
      },
      {
        Header: "מחיר1",
        accessor: "price1",
        width: "6%",
      },
      {
        Header: "תאריך1",
        accessor: "price1Date",
        width: "11%",
        // tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => {
          if (moment(value).format('DD-MM-YYYY') === 'Invalid date') {
            return ''
          }
          else {
            return moment(value).format('DD-MM-YYYY')
          }
        }
      },
      {
        Header: "מחיר2",
        accessor: "price2",
        width: "6%",
      },
      {
        Header: "תאריך2",
        accessor: "price2Date",
        width: "11%",
        // tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => {
          if (moment(value).format('DD-MM-YYYY') === 'Invalid date') {
            return ''
          }
          else {
            return moment(value).format('DD-MM-YYYY')
          }
        }
      },
      {
        Header: "מחיר3",
        accessor: "price3",
        width: "6%",
      },
      {
        Header: "תאריך3",
        accessor: "price3Date",
        width: "11%",
        // tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => {
          if (moment(value).format('DD-MM-YYYY') === 'Invalid date') {
            return ''
          }
          else {
            return moment(value).format('DD-MM-YYYY')
          }
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
        pageName='עסקאות'
        numOfRecordsInTable='10'
        saveObjtoUpdateAction={saveDeal2Update}
        deleteObjAction={deletDeal}
        toFilter={selected_season}
        copyObjAction={copy2Deal}
        editObjComp={EaditPage}
        addPageComp={AddPage}
        buttonsdRequried={buttonsdRequried}
        col={columns}
        tableRecordsData={data}
        sortingByColumn={sortees} />
    </div>
  );
}

export default DealsPage;
