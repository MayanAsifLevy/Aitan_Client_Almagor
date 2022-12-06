import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadPlots } from '../../../../redux/rec_fruit_actions/plotDunam/plotsDunam_actions'
import GenericListCreator from "../../../general_comp/GenericListCreator";
import { VscDebugStart } from 'react-icons/vsc';
import Popup from '../../../general_comp/popUps/Popup'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import { clickLogOut } from "../../../../redux/mainPage/general_actions"
import { loadPlotData } from '../../../../redux/reports/rec_fruits/reports_actions'


const PlotReportFilter = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  //========================  report type  =================================

  const reportTypes = ['צובר חלקה', 'צובר חלקות']

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


  const [plotReportParams, setPlotReportParams] = useState({
    'reportType': 'בחר', 'plotName': 0, 'fromDateFilter': { month: m, day: d, year: y }, 'fromDateForReport': newDate,
    'toDateFilter': { month: m, day: d, year: y }, 'toDateForReport': newDate
  })

  //======================== plots  ==================================


  let plotsList = []
  let plotsList_pre = useSelector(state => state.plotsDunam.plots)
  if (plotsList_pre !== 'The user is not autorized') { plotsList = plotsList_pre }
  else { plotsList = [] }

  useEffect(() => {
    if (plotsList_pre === 'The user is not autorized') {
      dispatch(clickLogOut())
      navigate("/")
    }

  }, [plotsList_pre])

  let plotsIsActiveList = GenericListCreator(plotsList)

  const [isOnlyActivePlot, setIsOnlyActivePlot] = useState(true);

  // if the isActiveplot is true ==> need to provide plots that are active
  let filterPlotsList = isOnlyActivePlot ? plotsIsActiveList : plotsList
   
  //leave only the unique dicts from filterPlotsList
   const uniquePlots = filterPlotsList.filter((o, i) =>
   i === filterPlotsList.findIndex(oo => o.plotName === oo.plotName )
);


  const handelPlotisActive = () => {
    setIsOnlyActivePlot(!isOnlyActivePlot)

  }

  const handelPlotChoise = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const name = option.getAttribute('option-name');
    setPlotReportParams({ ...plotReportParams, plotName: name })
  }

  //========================  from date  ==================================


  function convertFromDatepicker_mysql(str) {
    let new_date = {}
    new_date['month'] = monthToNum[str.substring(4, 7)]
    new_date['day'] = parseInt(str.substring(8, 10))
    new_date['year'] = parseInt(str.substring(11, 15))
    return (new_date)
  }



  let [selectedFromDate, setSelectedFromDate] = useState(new Date())


  // input example: Sun Sep 04 2022 12:07:53 GMT+0300 (Israel Daylight Time)
  const handelDatePickerFromDate = (date) => {

    setSelectedFromDate(date)
    let new_date_data = convertFromDatepicker_mysql(date.toString())
    setPlotReportParams({ ...plotReportParams, fromDateFilter: new_date_data, fromDateForReport: date })
  }


  if (selectedFromDate === new Date()) {
    handelDatePickerFromDate(selectedFromDate)
  }

  //========================  to date  ==================================

  let [selectedToDate, setSelectedToDate] = useState(new Date())


  // input example: Sun Sep 04 2022 12:07:53 GMT+0300 (Israel Daylight Time)
  const handelDatePickerToDate = (date) => {

    setSelectedToDate(date)
    let new_date_data = convertFromDatepicker_mysql(date.toString())
    setPlotReportParams({ ...plotReportParams, toDateFilter: new_date_data, toDateForReport: date })
  }


  if (selectedFromDate === new Date()) {
    handelDatePickerToDate(selectedToDate)
  }

  //=================================================================
  const _token = useSelector(state => state.login.Token.token)

  useEffect(() => {
    // must check if we already brought the data from store and if we did, we dont need to do it again
    if (plotsList.length === 0) { dispatch(loadPlots('2999', _token)) }
  }, [])

  //===========================================================


  const handelReportData = () => {
    // we dispatch 
    dispatch(loadPlotData(plotReportParams))
      //once done we get the result of the data from the action and save it in the localstorage
      .then(function (result) {
        localStorage.setItem('reportData', JSON.stringify(result))
        //once done do the rest of the process and then open a new window with teh required data
      }).then(function () {
        // save the DB data in the store
        localStorage.setItem('reportFilters', JSON.stringify(plotReportParams))
        return window.open("/plotReportPerDates/")
      })
  }


  const [popUp, setPopUp] = useState(false)


  const handleRunReport = () => {
    if (plotReportParams.reportType === 'בחר' || (plotReportParams.reportType === 'צובר חלקה' && plotReportParams.plotName === 0)) { setPopUp(!popUp) }
    else { handelReportData() }

  }

  let plot_data = useSelector(state => state.reportsReducer.plot_data)

  return (
    <div className='ContainerForReports'>

      <div className="tableName">
        דוח צובר חלקות
      </div>

      <br /> <br />

      <div className='subReportContainer'>

        <div className="reportsFilters">

          <div className="filtersName">
            <label>סוג דוח:</label>
            {plotReportParams.reportType === 'צובר חלקה' ? <div><br /> </div> : ''}
            {plotReportParams.reportType === 'צובר חלקה' ? <label>חלקה:</label> : ''}
            <br /> <br />
            <label>מתאריך:</label>
            <br /> <br />
            <label>עד תאריך:</label>
          </div>


          <div className="filtersInput">

            <select onChange={(e) => setPlotReportParams({ ...plotReportParams, reportType: e.target.value })}>
              <option value='בחר' >בחר </option>
              {reportTypes.map((option) => (
                <option key={option} >{option} </option>
              ))}
            </select>

            <br /> <br />
            {plotReportParams.reportType === 'צובר חלקה' ? <div id="growers">
              <select onChange={handelPlotChoise}>
                <option value='בחר' >בחר חלקה </option>
                {uniquePlots.map((option) => (
                  <option key={option.id} value={option.id} option-name={option.plotName}>{option.plotName} </option>
                ))}
              </select>

              <div id='checkboxActive'>
                <input type='checkbox' defaultChecked={isOnlyActivePlot} onClick={handelPlotisActive} />
                <span>פעילים בלבד</span>
              </div>

            </div> : ''}

            {plotReportParams.reportType === 'צובר חלקה' ? <div><br /> </div> : ''}
            <div className='datepickerContainerReport'>

              <DatePicker className="datepicker datepick"
                selected={selectedFromDate}
                onChange={date => handelDatePickerFromDate(date)}
                placeholderText={'dd-MM-yyyy'}
                dateFormat='dd-MM-yyyy'
                yearDropdownItemNumber={10}
                showYearDropdown
                scrollableYearDropdown
              />
            </div>

            <br />

            <div className='datepickerContainerReport '>
              <DatePicker className="datepicker datepick"
                selected={selectedToDate}
                onChange={date => handelDatePickerToDate(date)}
                placeholderText={'dd-MM-yyyy'}
                dateFormat='dd-MM-yyyy'
                yearDropdownItemNumber={10}
                showYearDropdown
                scrollableYearDropdown
              />

            </div>

          </div>

        </div >

        <div className="reportsOutputButtons">
          <br />
          <div className="ClearTextwithHover" >
            <button className="iconButton r" onClick={handleRunReport}><VscDebugStart style={{ transform: 'rotate(180deg)' }} /> </button>


          </div>

        </div>

      </div>

      {localStorage.setItem('reportData', JSON.stringify({ plot_data }))}


      <Popup trigger={popUp} setTrigger={setPopUp}>
        <div className='popupMessage'> יש להכניס פילטרים רצויים </div>
      </Popup>

    </div>

  )
}

export default PlotReportFilter

