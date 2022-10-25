import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadGrowers } from '../../../../redux/rec_fruit_actions/growers/growers_actions'
import GenericListCreator from "../../../general_comp/GenericListCreator";
import { VscDebugStart } from 'react-icons/vsc';
import Popup from '../../../general_comp/popUps/Popup'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../../redux/mainPage/general_actions"
import DatePicker from 'react-datepicker'

import { loadDailyData } from '../../../../redux/reports/rec_fruits/reports_actions'


const DailyReportFilter = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate();

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

  const [dailyReportParams, setDailyReportParams] = useState({ 'dateFilter': { month: m, day: d, year: y }, 'growerID': 'בחר', 'growerName': '', 'dateForReport': newDate })


  //======================== grower  ==================================


  let growersList = []
  let growersList_pre = useSelector(state => state.growers.growers)
  if (growersList_pre !== 'The user is not autorized') { growersList = growersList_pre }
  else { growersList = [] }

  useEffect(() => {
    if (growersList_pre === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [growersList_pre])


  let growersIsActiveList = GenericListCreator(growersList)

  const [isOnlyActiveGrower, setIsOnlyActiveGrower] = useState(true);

  // if the isActivegrowers is true ==> need to provide growers that are active
  let filterGrowersList = isOnlyActiveGrower ? growersIsActiveList : growersList


  const handelGrowerisActive = () => {
    setIsOnlyActiveGrower(!isOnlyActiveGrower)

  }

  const handelGrowerChoise = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const name = option.getAttribute('option-name');
    setDailyReportParams({ ...dailyReportParams, growerID: parseInt(e.target.value), growerName: name })
  }

  //========================  date  ==================================


  let [selectedDate, setSelectedDate] = useState(new Date())


  function convertFromDatepicker_mysql(str) {
    let new_date = {}
    new_date['month'] = monthToNum[str.substring(4, 7)]
    new_date['day'] = parseInt(str.substring(8, 10))
    new_date['year'] = parseInt(str.substring(11, 15))
    return (new_date)
  }

  // input example: Sun Sep 04 2022 12:07:53 GMT+0300 (Israel Daylight Time)
  const handelDatePicker = (date) => {

    setSelectedDate(date)
    let new_date_data = convertFromDatepicker_mysql(date.toString())
    setDailyReportParams({ ...dailyReportParams, dateFilter: new_date_data, dateForReport: date })
  }


  if (selectedDate === new Date()) {
    handelDatePicker(selectedDate)
  }

  //=================================================================
  const _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    // must check if we already brought the data from store and if we did, we dont need to do it again
    if (growersList.length === 0) { dispatch(loadGrowers(_token)) }
  }, [])

  //===========================================================

  let daily_data = useSelector(state => state.reportsReducer.daily_data)

  const handelReportData = () => {
    // we dispatch 
    dispatch(loadDailyData(dailyReportParams))
      //once done we get the result of the data from the action and saveit in teh localstorage
      .then(function (result) {

        localStorage.setItem('reportData', JSON.stringify(result))


        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {

        // save the DB data in the store
        localStorage.setItem('reportFilters', JSON.stringify(dailyReportParams))

        return window.open("/dailyReportGrower/")
       })
  }


  const [popUp, setPopUp] = useState(false)


  const handleRunReport = () => {

    if (dailyReportParams.growerID === 'בחר' || isNaN(dailyReportParams.growerID)) { setPopUp(!popUp) }
    else { handelReportData() }
  }


  return (
    <div className='ContainerForReports'>

      <div className="tableName">
        דוח יומי
      </div>

      <br /> <br />

      <div className='subReportContainer'>

        <div className="reportsFilters">

          <div className="filtersName">
            <label>תאריך מבוקש:</label>
            <br /> <br />
            <label>מגדל:</label>
            <br /> <br />
          </div>


          <div className="filtersInput">
            <div className='datepickerContainerReport'>
              <DatePicker className="datepicker datepick"
                selected={selectedDate}
                onChange={date => handelDatePicker(date)}
                placeholderText={'dd-MM-yyyy'}
                dateFormat='dd-MM-yyyy'
                yearDropdownItemNumber={10}
                showYearDropdown
                scrollableYearDropdown
              />
            </div>

            <br />
            <div id="growers">
              <select onChange={handelGrowerChoise}>
                <option value='בחר' >בחר מגדל </option>
                {filterGrowersList.map((option) => (
                  <option key={option.id} value={option.id} option-name={option.growerName}>{option.growerName} </option>
                ))}
              </select>

              <div id='checkboxActive'>
                <input type='checkbox' defaultChecked={isOnlyActiveGrower} onClick={handelGrowerisActive} />
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

      {localStorage.setItem('reportData', JSON.stringify({ daily_data }))}


      <Popup trigger={popUp} setTrigger={setPopUp}>
        <div className='popupMessage'> יש להכניס פילטרים רצויים </div>
      </Popup>


    </div>

  )
}

export default DailyReportFilter

