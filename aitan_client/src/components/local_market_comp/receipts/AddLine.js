import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addLine } from '../../../redux/local_market_actions/receipts/receipts_actions'
import GenericAddPage from "../../general_comp/GenericAddPage"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import EditableCell from '../../general_comp/EditableCell'


const AddReceiptLine = (props) => {


    /********************** get current date in case for blankRecord ****************************** */
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

    let line2Copy = useSelector(state => state.receipts.receiptLine_2_copy)

    let headerCopy = useSelector(state => state.receipts.receiptHeader_2_Copy)
    let selectedReceiptHeaderID = headerCopy.id // in order to get the lines' receipt header id


    const blankRecord = { receiptHeaderID: selectedReceiptHeaderID, paymentType: 'בחר', checkNum: '', bankName: '', sumPayment: 0, year: y, month: m, day: d }

    let [copyLine, setCopyLine] = useState(blankRecord)

    //************************************************************************************************ */
    useEffect(() => {
        line2Copy === '' ? setCopyLine(blankRecord) : setCopyLine(line2Copy)

    }, [line2Copy])


    //********************************* for drop down list ******************************************** */

    const paymentTypeList = ['מזומן', 'צק', 'העברה בנקאית']

    const handlePaymentTypeListSet = (optionName) => {
        setCopyLine({ ...copyLine, paymentType: optionName })

    }

    /******************************************************************************/
    //*****  To get the day, year, month ******** *******************************/


    let [selectedDate, setSelectedDate] = useState(new Date(line2Copy.paymentDueDate).toString() === 'Invalid Date' ? new Date() : new Date(line2Copy.paymentDueDate))

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
        setCopyLine({ ...copyLine, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }


    if (selectedDate === new Date()) {
        handelDatePicker(selectedDate)
    }
    //******************************************************************************/

    const cancelBack = () => {
        props.back()
    }

    //****************************************************************************** */

    // contain the data we changed and update the setCopyLine
    const updateMyData = (columnId, value) => {
        setCopyLine((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    /******************************************************************************/

    const columns =
        [
            {
                Header: "סוג תשלום",
                accessor: "paymentType",
                width: '30%',
                Cell: () => {

                    return (

                        <select value={copyLine.paymentType} onChange={(e) => handlePaymentTypeListSet(e.target.value)}>
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
            <GenericAddPage
                addObjDB={addLine}
                toFilter={selectedReceiptHeaderID}
                updateMyData={updateMyData}
                columns={columns}
                data={copyLine}
                setData={setCopyLine}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}

            />
        </div>
    )
}


export default AddReceiptLine;