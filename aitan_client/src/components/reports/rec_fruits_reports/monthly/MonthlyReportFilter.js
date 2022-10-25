import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadGrowers } from '../../../../redux/rec_fruit_actions/growers/growers_actions'
import GenericListCreator from "../../../general_comp/GenericListCreator";
import { VscDebugStart } from 'react-icons/vsc';
import Popup from '../../../general_comp/popUps/Popup'
import { loadMonthlyData } from '../../../../redux/reports/rec_fruits/reports_actions'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../../redux/mainPage/general_actions"


const MonthlyReportFilter = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let seasonSelected = useSelector(state => state.general.season)

  const [monthReportParams, setMonthReportParams] = useState({ 'reportType': 'בחר', 'growerID': 'בחר', 'growerName': '', 'month': 0, 'season': seasonSelected === '' ? (new Date()).getFullYear() : seasonSelected })


  //========================  report type  =================================

  const reportTypes = ['זן', 'מגדל-זן-עסקה']

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
    setMonthReportParams({ ...monthReportParams, growerID: parseInt(e.target.value), growerName: name })
  }
  //========================  month  ==================================

  let monthsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  //======================== list season ==================================

  const year = (new Date()).getFullYear();
  const minYear = 2017;
  const addition_years = year - minYear;
  let defaultYear = seasonSelected === '' ? (new Date()).getFullYear() : seasonSelected
  const [valueYear, setValueYear] = useState(defaultYear)
  const years = Array.from(new Array(addition_years + 1), (val, index) => index + minYear);

  const handelSeason = (e) => {
    setValueYear(e.target.value)
    setMonthReportParams({ ...monthReportParams, season: parseInt(e.target.value) })
  }

  //=================================================================

  useEffect(() => {
    // must check if we already brought the data from store and if we did, we dont need to do it again
    if (growersList.length === 0) { dispatch(loadGrowers()) }
  }, [])

  //===========================================================

  const handelReportData = () => {

    // we dispatch 
    dispatch(loadMonthlyData(monthReportParams))
      //once done we get the result of the data from the action and saveit in teh localstorage
      .then(function (result) {

        localStorage.setItem('reportData', JSON.stringify(result)

        )
        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {

        // save the DB data in the store
        localStorage.setItem('reportFilters', JSON.stringify(monthReportParams))


        switch (monthReportParams.reportType) {
          case "זן":

            return window.open("/monthlyReportGrowerFruitType/")


          case "מגדל-זן-עסקה":
            return window.open("/monthlyReportGrowerDeal/")


          default:
            return ""
        }
      })
  }


  const [popUp, setPopUp] = useState(false)


  const handleRunReport = () => {
    if (monthReportParams.reportType === 'בחר' || monthReportParams.growerID === 'בחר' || isNaN(monthReportParams.growerID) || monthReportParams.month === 0 || isNaN(monthReportParams.month)) { setPopUp(!popUp) }
    else { handelReportData() }

  }


  return (
    <div className='ContainerForReports'>

      <div className="tableName">
        דוח חודשי
      </div>

      <br /> <br />

      <div className='subReportContainer'>

        <div className="reportsFilters">

          <div className="filtersName">
            <label>סוג דוח:</label>
            <br /> <br />
            <label>מגדל:</label>
            <br /> <br />
            <label>חודש:</label>
            <br /> <br />
            <label>עונה:</label>
          </div>


          <div className="filtersInput">
            <select onChange={(e) => setMonthReportParams({ ...monthReportParams, reportType: e.target.value })}>
              <option value='בחר' >בחר </option>
              {reportTypes.map((option) => (
                <option key={option} >{option} </option>
              ))}
            </select>

            <br /> <br />
            <div id="growers">
              <select onChange={handelGrowerChoise/*(e) => setMonthReportParams({ ...monthReportParams, growerID: parseInt(e.target.value) })*/}>
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

            <br />
            <select onChange={(e) => setMonthReportParams({ ...monthReportParams, month: parseInt(e.target.value) })}>
              <option value='בחר' >בחר </option>
              {monthsList.map((option) => (
                <option key={option} >{option} </option>
              ))}
            </select>

            <br /> <br />

            <select value={valueYear} onChange={handelSeason} >
              {years.map((option) => (
                <option key={option} value={option}>{option} </option>
              ))}
            </select>
          </div>

        </div >

        <div className="reportsOutputButtons">
          <br />
          <div className="ClearTextwithHover" >
            <button className="iconButton r" onClick={handleRunReport}><VscDebugStart style={{ transform: 'rotate(180deg)' }} /> </button>
          </div>
        </div>

      </div>

      <Popup trigger={popUp} setTrigger={setPopUp}>
        <div className='popupMessage'> יש להכניס פילטרים רצויים </div>
      </Popup>

    </div>

  )
}

export default MonthlyReportFilter

