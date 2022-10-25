import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateManufacturerInvoiceDB } from '../../../redux/local_market_actions/manufacturerInvoice/manufacturerInvoice_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";


const EditManufacturerInvoice = (props) => {


    //************************************************************************************************ */
    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let updatedInvoice = useSelector(state => state.manufacturerInvoice.manufacturerInvoice_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origInvoiceToUpdate = updatedInvoice

    let [editInvoice, setEditInvoice] = useState(updatedInvoice)


    useEffect(() => {
        setEditInvoice(updatedInvoice)
    }, [updatedInvoice])


    // contain the data we changed and update the setEditInvoice   
    const updateMyData = (columnId, value) => {
        setEditInvoice((old) => {
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

    //**********************  for the receivingDate  *******************************/

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

    const [selectedDate, setSelectedDate] = useState(handleDate(updatedInvoice.invoiceDate))


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
        setEditInvoice({ ...editInvoice, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }


    //************************************************************************************************ */

    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
                width: "10%"
            },
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

                Header: "תאריך חשבונית",
                accessor: "invoicedate",
                width: '5%',
                Cell: () => {

                    return (
                        <div className="customDatePickerWidth">
                            <DatePicker
                                wrapperClassName="customDatePickerWidth"
                                selected={selectedDate}
                                onChange={date => handelDatePicker(date)}
                                placeholderText={'dd-MM-yyyy'}
                                dateFormat='dd-MM-yyyy'
                                yearDropdownItemNumber={10}
                                showYearDropdown
                                scrollableYearDropdown
                            />
                        </div>
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
            <GenericEditPage
                updateObjDB={updateManufacturerInvoiceDB}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={editInvoice}
                setData={setEditInvoice}
                originalData={origInvoiceToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditManufacturerInvoice;