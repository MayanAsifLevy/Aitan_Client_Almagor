import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { VscDebugStart } from 'react-icons/vsc';
import Popup from '../../../general_comp/popUps/Popup'
import { loadSummaryData } from '../../../../redux/reports/rec_fruits/reports_actions'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../../redux/mainPage/general_actions"


const SummaryReportFilter = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let seasonSelected = useSelector(state => state.general.season)

  const [summaryReportParams, setSummaryReportParams] = useState({ 'reportType': 'בחר', 'season': seasonSelected === '' ? (new Date()).getFullYear() : seasonSelected, 'month': 0 })


  //========================  report type  =================================

  const reportTypes = ['מרכז חודשי', 'מרכז אריזות חודשי', 'מרכז עונתי', 'מרכז עונתי מגדל', 'מרכז עונתי בית אריזה']

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
    setSummaryReportParams({ ...summaryReportParams, season: parseInt(e.target.value) })
  }


  //===========================================================
  let _token = useSelector(state => state.login.Token.token)

  const handelReportData = () => {

    let result1 = ''
    // we dispatch 
    dispatch(loadSummaryData(summaryReportParams, _token))
      //once done we get the result of the data from the action and saveit in teh localstorage
      .then(function (result) {
        result1 = result
        localStorage.setItem('reportData', JSON.stringify(result)

        )
        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {
        if (typeof result1 !== 'string') {
          // save the DB data in the store
          localStorage.setItem('reportFilters', JSON.stringify(summaryReportParams))


          switch (summaryReportParams.reportType) {
            case "מרכז חודשי":
              return window.open("/SummaryMonthReport/")

            case "מרכז אריזות חודשי":
              return window.open("/SummaryMonthPackingMatReport/")

            case "מרכז עונתי":
              return window.open("/summarySeasonReport/")

            case "מרכז עונתי מגדל":
              return window.open("/summarySeasonGrowersReport/")

            case "מרכז עונתי בית אריזה":
              return window.open("/summarySeasonFruitPackhouseReport/")



            default:
              return ""
          }
        }
        else {
          dispatch(clickLogOut())
          navigate("/")
        }
      })

  }


  const [popUp, setPopUp] = useState(false)


  const handleRunReport = () => {
    if (summaryReportParams.reportType === 'בחר' || (summaryReportParams.reportType === 'מרכז חודשי' && summaryReportParams.month === 0)) { setPopUp(!popUp) }
    else { handelReportData() }
  }


  return (
    <div className='ContainerForReports'>

      <div className="tableName">
        דוח מרכז
      </div>

      <br /> <br />

      <div className='subReportContainer'>

        <div className="reportsFilters">

          <div className="filtersName">
            <label>סוג דוח:</label>
            <br /> <br />
            <label>עונה:</label>
            <br /> <br />
            {summaryReportParams.reportType === 'מרכז חודשי' || summaryReportParams.reportType === 'מרכז אריזות חודשי' ? <label>חודש:</label> : ''}
          </div>


          <div className="filtersInput">
            <select onChange={(e) => setSummaryReportParams({ ...summaryReportParams, reportType: e.target.value })}>
              <option value='בחר' >בחר </option>
              {reportTypes.map((option) => (
                <option key={option} >{option} </option>
              ))}
            </select>


            <br /> <br />

            <select value={valueYear} onChange={handelSeason} >
              {years.map((option) => (
                <option key={option} value={option}>{option} </option>
              ))}
            </select>

            <br /> <br />
            {summaryReportParams.reportType === 'מרכז חודשי' || summaryReportParams.reportType === 'מרכז אריזות חודשי' ? <select onChange={(e) => setSummaryReportParams({ ...summaryReportParams, month: parseInt(e.target.value) })}>
              <option value='בחר' >בחר </option>
              {monthsList.map((option) => (
                <option key={option} >{option} </option>
              ))}
            </select> : ''}
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

export default SummaryReportFilter

