import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addClosingData } from '../../../redux/local_market_actions/closingData/closingData_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const AddClosingData = (props) => {


  //********************** get current date in case for blankRecord ****************************** */
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

  //************************************************************************************************ */

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)


  //************************************************************************************************ */

  const blankRecord = { season: selected_season, fruitPalletCreationLineID: 'בחר', closeWeight: 0, closeRemarks: '', year: y, month: m, day: d }

  let [copyData, setCopyData] = useState(blankRecord)

  let closingData_2_Copy = useSelector(state => state.closingData.closingData_2_Copy)


  //************************************************************************************************ */

  useEffect(() => {
    closingData_2_Copy === '' ? setCopyData(blankRecord) : setCopyData(closingData_2_Copy)

  }, [closingData_2_Copy])

  //************************************************************************************************ */

  const cancelBack = () => {
    props.back()
  }

  /****************************************************************************** */

  // contain the data we changed and update the setCopyData   
  const updateMyData = (columnId, value) => {
    setCopyData((old) => {
      return {
        ...old,
        [columnId]: value,
      };
    }
    );
  };

  //******************************************************************************/
  //*****  To get the day, year, month fort  the copyInvoice that will go to teh flask *******************************/


  let [selectedDate, setSelectedDate] = useState(new Date(closingData_2_Copy.closeDate).toString() === 'Invalid Date' ? new Date() : new Date(closingData_2_Copy.closeDate))

  function convertFromDatepicker_mysql(str) {
    let new_date = {}
    new_date['month'] = monthToNum[str.substring(4, 7)]
    new_date['day'] = parseInt(str.substring(8, 10))
    new_date['year'] = parseInt(str.substring(11, 15))
    return (new_date)
  }

  const handelDatePicker = (date) => {
    setSelectedDate(date)
    let new_date_data = convertFromDatepicker_mysql(date.toString())
    setCopyData({ ...copyData, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
  }


  if (selectedDate === new Date()) {
    handelDatePicker(selectedDate)
  }
  //******************************************************************************/

  const columns =
    [
      {
        Header: "ת. משלוח",
        accessor: "deliveryNoteNum",
        width: "7%"
      },
      {
        Header: "סוחר",
        accessor: "traderName",
        width: "5%"
      },
      {
        Header: "משטח",
        accessor: "palletNum",
        width: "5%"
      },
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "5%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "5%"
      },

      {
        Header: "גודל",
        accessor: "size",
        width: "3%"
      },
      {
        Header: "איכות",
        accessor: "quality",
        width: "3%"
      },
      {
        Header: "אריזה",
        accessor: "marketPackingType",
        width: "5%"
      },
      {
        Header: "באריזה",
        accessor: "packMatQty",
        width: "5%"
      },
      {
        Header: "משקל נטו",
        accessor: "weightNeto",
        width: "7%"
      },
      {
        Header: "משקל סגירה",
        accessor: "closeWeight",
        width: "8%",
        Cell: EditableCell
      },
      {
        Header: "מחיר סגירה",
        accessor: "closePrice",
        width: "8%",
        Cell: EditableCell
      },
      {
        Header: "ת. אריזה",
        accessor: "closeDate",
        width: '20%',
        Cell: () => {

          return (
            <DatePicker className="datepicker"
              selected={selectedDate}
              toFilter={selected_season}
              onChange={date => handelDatePicker(date)}
              placeholderText={'dd-MM-yyyy'}
              dateFormat='dd-MM-yyyy'
              yearDropdownItemNumber={10}
              showYearDropdown
              scrollableYearDropdown
            />


          )

        }
      },
      {
        Header: "הערות",
        accessor: "closeRemarks",
        width: "5%",
        Cell: EditableCell
      }
    ]



  let message = (
    <div>
      <ul>
        <li>לא ניתן להוסיף מספר חשבונית הזהה לאחרת</li>
        <li>חובה להכניס מספר חשבונית </li>
      </ul>
      <br />
      <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
    </div>)


  return (

    <div>
      <GenericAddPage
        addObjDB={addClosingData}
        toFilter={selected_season}
        updateMyData={updateMyData}
        columns={columns}
        data={copyData}
        setData={setCopyData}
        blankRecord={blankRecord}
        back={cancelBack}
        popUpMessage={message}
      />
    </div>
  )
}

export default AddClosingData;