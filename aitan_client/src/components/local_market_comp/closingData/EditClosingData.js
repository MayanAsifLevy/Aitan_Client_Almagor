import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateClosingDataDB } from '../../../redux/local_market_actions/closingData/closingData_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";


const EditManufacturerInvoice = (props) => {


  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

  //************************************************************************************************ */

  let updatedClosingData = useSelector(state => state.closingData.closingData_2_update)

  // in case we cant update and we want to return the edit table to contain the original data
  const origClosingDataToUpdate = updatedClosingData

  let [editClosingData, setEditClosingData] = useState(updatedClosingData)


  useEffect(() => {
    setEditClosingData(updatedClosingData)
  }, [updatedClosingData])


  // contain the data we changed and update the setEditClosingData   
  const updateMyData = (columnId, value) => {
    setEditClosingData((old) => {
      return {
        ...old,
        [columnId]: value,
      };
    }
    );
  };


  const cancelBack = () => {
    props.back()
  }

  //******************************************************************************/
  //**********************  for the receivingDate  *******************************/

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


  const handleDate = (date) => {
    // convert date to string in required format ('DD-MM-YYYY')
    if (date !== undefined) {
      const fromDate_var = moment(new Date(date).toISOString()).utc().format('DD-MM-YYYY')
      //01-01-1970 meaning there was no date
      return fromDate_var !== '01-01-1970' ? new Date(date) : ''
    }
    else {
      return ''
    }

  }

  const [selectedDate, setSelectedDate] = useState(handleDate(updatedClosingData.closeDate))


  const convertFromDatepicker_mysql = (date) => {

    if (date !== null && date !== undefined) {

      let strDate = new Date(date.toString())
      let new_date = {}
      new_date['day'] = '' + strDate.getDate()
      new_date['month'] = '' + (strDate.getMonth() + 1)
      new_date['year'] = strDate.getFullYear();
      return (new_date)
    }
    else {
      return { 'day': d, 'month': m, 'year': y }
    }
  }


  const handelDatePicker = (date) => {
    setSelectedDate(date)
    let new_date_data = convertFromDatepicker_mysql(date)
    setEditClosingData({ ...editClosingData, year: parseInt(new_date_data['year']), month: parseInt(new_date_data['month']), day: parseInt(new_date_data['day']) })
  }


  //************************************************************************************************ */


  const columns =
    [
      {
        Header: "ID",
        accessor: "id",
        width: "5%"
      }, {
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
        width: "5%"
      },
      {
        Header: "איכות",
        accessor: "quality",
        width: "5%"
      },
      {
        Header: "אריזה",
        accessor: "marketPackingType",
        width: "5%"
      },
      {
        Header: "כמות באריזה",
        accessor: "packMatQty",
        width: "9%"
      },
      {
        Header: "משקל נטו",
        accessor: "weightNeto",
        width: "10%"
      },
      {
        Header: "משקל סגירה",
        accessor: "closeWeight",
        width: "10%",
        Cell: EditableCell
      },
      {
        Header: "מחיר סגירה",
        accessor: "closePrice",
        width: "10%",
        Cell: EditableCell
      },
      {
        Header: "ת. סגירה",
        accessor: "closeDate",
        width: '10%',
        Cell: () => {

          return (
            <DatePicker className="datepicker"
              selected={selectedDate}
              seasonFilter={selected_season}
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


  return (

    <div>
      <GenericEditPage
        updateObjDB={updateClosingDataDB}
        toFilter={selected_season}
        updateMyData={updateMyData}
        columns={columns}
        data={editClosingData}
        setData={setEditClosingData}
        originalData={origClosingDataToUpdate}
        back={cancelBack}
      />
    </div>
  )

}

export default EditManufacturerInvoice;