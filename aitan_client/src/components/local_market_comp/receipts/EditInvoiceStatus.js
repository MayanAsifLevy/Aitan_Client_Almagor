import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateLineDB } from '../../../redux/local_market_actions/receipts/receipts_actions'
import GenericEditPage from "../../general_comp/GenericEditPage";
import EditableCell from '../../general_comp/EditableCell'


const EditInvoiceStatus = (props) => {


    let updateInvoiceStatus = useSelector(state => state.receipts.receiptLine_2_update)

    let selectInvoiceID = updateInvoiceStatus.invoiceHeaderID
    let selectInvoiceStatus = updateInvoiceStatus.invoiceStatus
    let selectInvoiceNum = updateInvoiceStatus.invoiceNum


    const origLineToUpdate = updateInvoiceStatus

    let [editStatus, setEditStatus] = useState({ 'invoiceHeaderID': selectInvoiceID, 'invoiceStatus': selectInvoiceStatus, 'invoiceNum': selectInvoiceNum })


    const cancelBack = () => {
        props.back()
    }

    //********************************* for drop down list ******************************************** */


    const invoiceStatusList = ['פתוחה', 'סגורה']

    const handleInvoiceStatusListSet = (optionStatus) => {
        setEditStatus({ ...editStatus, invoiceStatus: optionStatus })

    }
    /******************************************************************************/
    /******************************************************************************/

    const columns =
        [
            {
                Header: "מספר חשבונית",
                accessor: "invoiceNum",
                width: '25%',
                Cell: EditableCell
            },
            {
                Header: "סטטוס חשבונית",
                accessor: "invoiceStatus",
                width: '30%',
                Cell: () => {

                    return (

                        <select value={editStatus.invoiceStatus} onChange={(e) => handleInvoiceStatusListSet(e.target.value)}>
                            {invoiceStatusList.map((option, index) => (
                                <option key={`paymentTypeList${index}`} value={option}> {option} </option>
                            ))}
                        </select>
                    )
                }
            }

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
                toFilter={selectInvoiceID}
                // updateMyData={updateMyData}
                columns={columns}
                data={editStatus}
                setData={setEditStatus}
                originalData={origLineToUpdate}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}
            />
        </div>
    )
}


export default EditInvoiceStatus;