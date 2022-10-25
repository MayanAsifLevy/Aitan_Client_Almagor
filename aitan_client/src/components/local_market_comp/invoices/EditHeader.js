import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateHeaderDB } from '../../../redux/local_market_actions/invoices/invocies_actions'
import { loadTraders } from '../../../redux/local_market_actions/traders/traders_actions'
import { loadManufacturerInvoices } from '../../../redux/local_market_actions/manufacturerInvoice/manufacturerInvoice_actions'
import GenericListCreator from "../../general_comp/GenericListCreator";
import EditableCell from '../../general_comp/EditableCell';
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";


const EditInvoiceHeader = (props) => {


    //************************************************************************************************ */
    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let updatedHeader = useSelector(state => state.invoices.invoiceHeader_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origHeaderToUpdate = updatedHeader

    let [editHeader, setEditHeader] = useState(updatedHeader)


    useEffect(() => {
        setEditHeader(updatedHeader)
        setSelectedDate(new Date(updatedHeader.invoiceDate))
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

   //************************************************************************************************ */
    const cancelBack = () => {
        props.back()
    }
    //************************************************************************************************ */
    let _token = useSelector(state => state.login.Token.token)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTraders(_token))
        dispatch(loadManufacturerInvoices(selected_season, _token))

    }, [])

    let tradersList = useSelector(state => state.traders.traders)
    let manufacturerInvoiceList = useSelector(state => state.manufacturerInvoice.manufacturerInvoices)
    manufacturerInvoiceList = manufacturerInvoiceList.sort((a, b) => (a.ManufacturerInvNum > b.ManufacturerInvNum) ? 1 : -1)

    
    //**********************  for the dropDown lists  ************************************************ */

    let traderIsActiveList = GenericListCreator(tradersList)

    const handleTraderListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setEditHeader({ ...editHeader, traderID: filteredRecord[0].id, traderName: filteredRecord[0].traderName })
        }
        else {
            setEditHeader({ ...editHeader, traderID: 'בחר', traderName: 'בחר' })
        }
    }
   //************************************************************************************************ */

    const handleManufacturerInvoiceListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setEditHeader({ ...editHeader, manufacturerInvoiceID: filteredRecord[0].id, ManufacturerInvNum: filteredRecord[0].ManufacturerInvNum })
        }
        else {
            setEditHeader({ ...editHeader, manufacturerInvoiceID: 'בחר', ManufacturerInvNum: 'בחר' })
        }
    }

    //**********************  for the receivingDate  *************************************************/

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

    const [selectedDate, setSelectedDate] = useState(handleDate(updatedHeader.invoiceDate))

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


    const columns =
        [

            // {
            //     Header: "ID",
            //     accessor: "id" ,
            //     width: "10%"
            // },
            {
                Header: "עונה",
                accessor: "season",
                width: '10%'
            },
            {
                Header: "מספר חשבונית",
                accessor: "invoiceNum",
                width: '25%',
                Cell: EditableCell
            },
            {
                Header: "תאריך חשבונית",
                accessor: "invoiceDate",
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
                Header: 'סוחר',
                accessor: "traderName",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={editHeader.traderID} onChange={(e) => handleTraderListSet(e.target.value, traderIsActiveList)}>
                            <option>בחר</option>
                            {traderIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.traderName} </option>
                            ))}
                        </select>
                    )
                }

            },
            {
                Header: 'חשבונית יצרן',
                accessor: "manufacturerInvoiceID",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={editHeader.manufacturerInvoiceID} onChange={(e) => handleManufacturerInvoiceListSet(e.target.value, manufacturerInvoiceList)}>
                            <option>בחר</option>
                            {manufacturerInvoiceList.map((option) => (
                                <option key={option.id} value={option.id}>{option.ManufacturerInvNum} </option>
                            ))}
                        </select>
                    )
                }

            }
        ]

   //************************************************************************************************ */
    let message = (
        <div>
            <ul>
                <li>חובה להכניס תעודת משלוח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

   //************************************************************************************************ */
    const tableName = 'עריכת תעודת משלוח'
   //************************************************************************************************ */

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


export default EditInvoiceHeader;