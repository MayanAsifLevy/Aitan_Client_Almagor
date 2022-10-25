import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateLineDB } from '../../../redux/local_market_actions/receipts/receipts_actions'
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import EditableCell from '../../general_comp/EditableCell'
import moment from "moment";


const EditReceiptLine = (props) => {


    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let updatedLine = useSelector(state => state.receipts.receiptLine_2_update)

    let selectedReceiptHeaderID = updatedLine.receiptHeaderID

    // in case we cant update and we want to re turn the edit table to contain the original data
    const origLineToUpdate = updatedLine

    let [editLine, setEditLine] = useState(updatedLine)


    useEffect(() => {
        setEditLine(updatedLine)

    }, [updatedLine])

    // contain the data we changed and update the setEditLine   
    const updateMyData = (columnId, value) => {
        setEditLine((old) => {
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

    //********************************* for drop down list ******************************************** */


    const paymentTypeList = ['מזומן', 'צק', 'העברה בנקאית']

    const handlePaymentTypeListSet = (optionName) => {
        setEditLine({ ...editLine, paymentType: optionName })

    }

    //******************************************************************************/
    //**********************  for the date  *******************************/

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

    const [selectedDate, setSelectedDate] = useState(handleDate(updatedLine.paymentDueDate))


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
        setEditLine({ ...editLine, year: parseInt(new_date_data['year']), month: parseInt(new_date_data['month']), day: parseInt(new_date_data['day']) })
    }


    /******************************************************************************/
    /******************************************************************************/

    const columns =
        [
            {
                Header: "סוג תשלום",
                accessor: "paymentType",
                width: '30%',
                Cell: () => {

                    return (

                        <select value={editLine.paymentType} onChange={(e) => handlePaymentTypeListSet(e.target.value)}>
                            <option>בחר</option>
                            {paymentTypeList.map((option, index) => (
                                <option key={`paymentTypeList${index}`} value={option}> {option} </option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "מספר צ'ק",
                accessor: "checkNum",
                Cell: EditableCell
            },
            {
                Header: "שם בנק",
                accessor: "bankName",
                Cell: EditableCell
            },
            {
                Header: "תאריך פרעון",
                accessor: "paymentDueDate",
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
                Header: "סכום תשלום",
                accessor: "sumPayment",
                Cell: EditableCell
            },

        ]

    /******************************************************************************/

    let message = (
        <div>
            <ul>
                <li>חובה להכניס סוג תשלום </li>
                <li>במידה ושיטת התשלום הינה צק, חובה להכניס מס צק ושם בנק </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    /******************************************************************************/
    const tableName = 'הוספת שורה בקבלה'
    /******************************************************************************/
    return (

        <div>
            <GenericEditPage
                updateObjDB={updateLineDB}
                toFilter={selectedReceiptHeaderID}
                updateMyData={updateMyData}
                columns={columns}
                data={editLine}
                setData={setEditLine}
                originalData={origLineToUpdate}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}
            />
        </div>
    )

}

export default EditReceiptLine;