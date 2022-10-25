import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addManufacturerInvoice } from '../../../redux/local_market_actions/manufacturerInvoice/manufacturerInvoice_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const AddManufacturerInvoice = (props) => {


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

    const blankRecord = { season: selected_season, ManufacturerInvNum: '', invoiceTotal: 0, invoiceRemarks: '', year: y, month: m, day: d }

    let [copyInvoice, setCopyInvoice] = useState(blankRecord)

    let manufacturerInvoice_2_Copy = useSelector(state => state.manufacturerInvoice.manufacturerInvoice_2_Copy)


    //************************************************************************************************ */

    useEffect(() => {
        manufacturerInvoice_2_Copy === '' ? setCopyInvoice(blankRecord) : setCopyInvoice(manufacturerInvoice_2_Copy)

    }, [manufacturerInvoice_2_Copy])

    //************************************************************************************************ */

    const cancelBack = () => {
        props.back()
    }

    //************************************************************************************************ */

    // contain the data we changed and update the setCopyInvoice   
    const updateMyData = (columnId, value) => {
        setCopyInvoice((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };


    //*****  To get the day, year, month fort  the copyInvoice that will go to teh flask ************** */


    let [selectedDate, setSelectedDate] = useState(new Date(manufacturerInvoice_2_Copy.invoiceDate).toString() === 'Invalid Date' ? new Date() : new Date(manufacturerInvoice_2_Copy.invoiceDate))

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
        setCopyInvoice({ ...copyInvoice, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }


    if (selectedDate === new Date()) {
        handelDatePicker(selectedDate)
    }
    //************************************************************************************************ */

    const columns =
        [
            {
                Header: "עונה",
                accessor: "season",
                width: "20%",
                Cell: EditableCell
            },
            {
                Header: "מספר חשבונית יצרן",
                accessor: "ManufacturerInvNum",
                width: "20%",
                Cell: EditableCell
            },
            {
                Header: "סכום סופי (שח)",
                accessor: "invoiceTotal",
                width: "20%",
                Cell: EditableCell
            },
            {
                Header: "ת. חשבונית",
                accessor: "invoiceDate",
                width: '20%',
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
                accessor: "invoiceRemarks",
                width: "20%",
                Cell: EditableCell
            }
        ]

    //************************************************************************************************ */
    let message = (
        <div>
            <ul>
                <li>לא ניתן להוסיף מספר חשבונית הזהה לאחרת</li>
                <li>חובה להכניס מספר חשבונית </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    //************************************************************************************************ */

    return (

        <div>
            <GenericAddPage
                addObjDB={addManufacturerInvoice}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={copyInvoice}
                setData={setCopyInvoice}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddManufacturerInvoice;