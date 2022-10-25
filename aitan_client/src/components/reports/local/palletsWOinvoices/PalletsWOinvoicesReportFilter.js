import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadTraders } from '../../../../redux/local_market_actions/traders/traders_actions';
import GenericListCreator from "../../../general_comp/GenericListCreator";
import { VscDebugStart } from 'react-icons/vsc';
import Popup from '../../../general_comp/popUps/Popup'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../../redux/mainPage/general_actions"
import DatePicker from 'react-datepicker'

import { loadPalletsWOinvoiceData } from '../../../../redux/reports/local/localReports_actions';


const PalletsWOinvoicesReportFilter = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate();

  //=================================================================
  let _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    // must check if we already brought the data from store and if we did, we dont need to do it again
    if (tradersList.length === 0) { dispatch(loadTraders(_token)) }

  }, [])

  //======================== get current date in case the user didnt select a date manually  ========================
  const monthToNum = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
  }



  let newDate = new Date().toString()
  let y = parseInt(newDate.substring(11, 15))
  let m = monthToNum[newDate.substring(4, 7)]
  let d = parseInt(newDate.substring(8, 10))


  const [reportParams, setRportParams] = useState({ 'fromDateFilter': { month: m, day: d, year: y }, 'toDateFilter': { month: m, day: d, year: y }, 'traderID': 'בחר', 'traderName': 'בחר', 'fromDateForReport': newDate, 'toDateForReport': newDate })


  //======================== trader  ==================================

  let tradersList = []
  let tradersList_pre = useSelector(state => state.traders.traders)
  if (tradersList_pre !== 'The user is not autorized') { tradersList = tradersList_pre }
  else { tradersList = [] }

  useEffect(() => {
    if (tradersList_pre === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [tradersList_pre])


  let tradersIsActiveList = GenericListCreator(tradersList)

  const [isOnlyActiveTrader, setIsOnlyActiveTrader] = useState(true);

  // if the isOnlyActiveTrader is true ==> need to provide traders that are active
  let filterTradersList = isOnlyActiveTrader ? tradersIsActiveList : tradersList


  const handelTraderisActive = () => {
    setIsOnlyActiveTrader(!isOnlyActiveTrader)

  }

  const handelTraderChoise = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const name = option.getAttribute('option-name');
    setRportParams({ ...reportParams, traderID: parseInt(e.target.value), traderName: name })
  }

  //========================  date  ==================================


  let [selectedFromDate, setSelectedFromDate] = useState(new Date())
  let [selectedToDate, setSelectedToDate] = useState(new Date())

  function convertFromDatepicker_mysql(str) {
    let new_date = {}
    new_date['month'] = monthToNum[str.substring(4, 7)]
    new_date['day'] = parseInt(str.substring(8, 10))
    new_date['year'] = parseInt(str.substring(11, 15))
    return (new_date)
  }

  // input example: Sun Sep 04 2022 12:07:53 GMT+0300 (Israel Daylight Time)
  const handelDatePicker = (date, type) => {

    if (type === 'from') {
      setSelectedFromDate(date)
      let new_date_data = convertFromDatepicker_mysql(date.toString())
      setRportParams({ ...reportParams, fromDateFilter: new_date_data, fromDateForReport: date })
    }

    if (type === 'to') {
      setSelectedToDate(date)
      let new_date_data = convertFromDatepicker_mysql(date.toString())
      setRportParams({ ...reportParams, toDateFilter: new_date_data, toDateForReport: date })
    }
  }


  if (setSelectedFromDate === new Date()) {
    handelDatePicker(setSelectedFromDate)
  }

  if (setSelectedToDate === new Date()) {
    handelDatePicker(setSelectedToDate)
  }
  
  //===========================================================


  let palletsWOInvoice = useSelector(state => state.localReports.palletsWOInvoice_data)

  const handelReportData = () => {
    // we dispatch 
    dispatch(loadPalletsWOinvoiceData(reportParams))
      //once done we get the result of the data from the action and saveit in teh localstorage
      .then(function (result) {

        localStorage.setItem('reportData', JSON.stringify(result))


        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {

        // save the DB data in the store
        localStorage.setItem('reportFilters', JSON.stringify(reportParams))

        return window.open("/palletsWOinvoicesReport/")
      })
  }


  const [popUp, setPopUp] = useState(false)


  const handleRunReport = () => {

    if (reportParams.traderID === 'בחר' || isNaN(reportParams.traderID)) { setPopUp(!popUp) }
    else { handelReportData() }
  }


  return (
    <div className='ContainerForReports'>

      <div className="tableName">
        דוח משטחים ללא חשבונית
      </div>

      <br /> <br />

      <div className='subReportContainer'>

        <div className="reportsFilters">

          <div className="filtersName">
            <label>מתאריך:</label>
            <br /> <br />
            <label>עד תאריך:</label>
            <br /> <br />
            <label>סוחר:</label>
            <br /> <br />
          </div>


          <div className="filtersInput">
            <div className='datepickerContainerReport'>
              <DatePicker className="datepicker datepick"
                selected={selectedFromDate}
                onChange={date => handelDatePicker(date, 'from')}
                placeholderText={'dd-MM-yyyy'}
                dateFormat='dd-MM-yyyy'
                yearDropdownItemNumber={10}
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
            <br />

            <div className='datepickerContainerReport'>
              <DatePicker className="datepicker datepick"
                selected={selectedToDate}
                onChange={date => handelDatePicker(date, 'to')}
                placeholderText={'dd-MM-yyyy'}
                dateFormat='dd-MM-yyyy'
                yearDropdownItemNumber={10}
                showYearDropdown
                scrollableYearDropdown
              />
            </div>

            <br />
            <div id="growers">
              <select onChange={handelTraderChoise}>
                <option value='בחר' >בחר סוחר </option>
                {filterTradersList.map((option) => (
                  <option key={option.id} value={option.id} option-name={option.traderName}>{option.traderName} </option>
                ))}
              </select>

              <div id='checkboxActive'>
                <input type='checkbox' defaultChecked={isOnlyActiveTrader} onClick={handelTraderisActive} />
                <span>פעילים בלבד</span>
              </div>

            </div>
          </div>

        </div >


        <div className="reportsOutputButtons">
          <div className="ClearTextwithHover" >
            <button className="iconButton r" onClick={handleRunReport}><VscDebugStart style={{ transform: 'rotate(180deg)' }} /> </button>
          </div>
        </div>

      </div>

      {localStorage.setItem('reportData', JSON.stringify({ palletsWOInvoice }))}


      <Popup trigger={popUp} setTrigger={setPopUp}>
        <div className='popupMessage'> יש להכניס פילטרים רצויים </div>
      </Popup>

    </div>

  )
}


export default PalletsWOinvoicesReportFilter

