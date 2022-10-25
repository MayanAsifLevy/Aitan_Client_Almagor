import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateHeaderDB } from '../../../redux/local_market_actions/receipts/receipts_actions'
import { loadHeaders } from '../../../redux/local_market_actions/invoices/invocies_actions'
import EditableCell from '../../general_comp/EditableCell';
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";


const EditReceiptHeader = (props) => {


    //************************************************************************************************ */
    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let updatedHeader = useSelector(state => state.receipts.receiptHeader_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origHeaderToUpdate = updatedHeader

    let [editHeader, setEditHeader] = useState(updatedHeader)


    useEffect(() => {
        setEditHeader(updatedHeader)
        setSelectedDate(new Date(updatedHeader.receiptDate))
    }, [updatedHeader])

    // contain the data we changed and update the setEditTrader   
    const updateMyData = (columnId, value) => {
        setEditHeader((old) => {
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
    //************************************************************************************************ */
    let _token = useSelector(state => state.login.Token.token)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadHeaders(selected_season, _token))
    }, [])


    let invoiceHeaderList = useSelector(state => state.invoices.invoiceHeaders)

    invoiceHeaderList = invoiceHeaderList.filter(inv => inv.invoiceStatus === 'פתוחה')

    //****************************************************************************** */
    //**********************  for the dropDown lists  ****************************** */

    const handleInvoiceListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setEditHeader({ ...editHeader, invoiceHeaderID: filteredRecord[0].id, invoiceNum: filteredRecord[0].invoiceNum })
        }
        else {
            setEditHeader({ ...editHeader, invoiceHeaderID: 'בחר', invoiceNum: '-' })
        }
    }

    //******************************************************************************/
    //**********************  for the date  *******************************/

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

    const [selectedDate, setSelectedDate] = useState(handleDate(updatedHeader.receiptDate))


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
            return { 'day': 0, 'month': 0, 'year': '0' }
        }
    }


    const handelDatePicker = (date) => {
        setSelectedDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditHeader({ ...editHeader, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }

    //******************************************************************************/
    const columns =
        [
            {
                Header: "עונה",
                accessor: "season",
                width: '10%'
            },
            {
                Header: "מספר קבלה",
                accessor: "receiptNum",
                width: '25%',
                Cell: EditableCell
            },
            {
                Header: "תאריך קבלה",
                accessor: "receiptDate",
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
                Header: 'מספר חשבונית',
                accessor: "invoiceNum",
                width: '20%',
                tipText: "ניתן לבחור רק חשבוניות  בסטטוס פתוח",
                Cell: () => {

                    return (

                        <select value={editHeader.invoiceHeaderID} onChange={(e) => handleInvoiceListSet(e.target.value, invoiceHeaderList)}>
                            <option>בחר</option>
                            {invoiceHeaderList.map((option) => (
                                <option key={option.id} value={option.id}>{option.invoiceNum} </option>
                            ))}
                        </select>
                    )
                }

            },
            {
                Header: "הערות",
                accessor: "receiptRemarks",
                width: '25%',
                Cell: EditableCell
            },
        ]



    let message = (
        <div>
            <ul>
                <li>עונה + מספר קבלה חייבים להיות יחודיים</li>
                <li>חובה להכניס מספר קבלה ומספר חשבונית </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    const tableName = 'עריכת חשבונית'


    return (

        <div>
            <GenericEditPage
                updateObjDB={updateHeaderDB}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={editHeader}
                setData={setEditHeader}
                originalData={origHeaderToUpdate}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}
            />
        </div>
    )
}


export default EditReceiptHeader;