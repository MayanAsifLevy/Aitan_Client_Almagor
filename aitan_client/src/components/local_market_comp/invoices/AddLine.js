import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addLine } from '../../../redux/local_market_actions/invoices/invocies_actions'
import { loadDistinctdeliveryNotestWithLines } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import GenericAddPage from "../../general_comp/GenericAddPage"


const AddInvoiceLine = (props) => {


    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let line2Copy = useSelector(state => state.invoices.invoiceLine_2_copy)

    let headerCopy = useSelector(state => state.invoices.invoiceHeader_2_Copy)
    let selectedInvoiceHeaderID = headerCopy.id // in order to get the lines' invoice header id


    const blankRecord = { invoiceHeaderID: selectedInvoiceHeaderID, deliveryNote_headerID: 'בחר', invoiceNum: headerCopy.invoiceNum }

    let [copyLine, setCopyLine] = useState(blankRecord)

    //************************************************************************************************ */
    useEffect(() => {
        line2Copy === '' ? setCopyLine(blankRecord) : setCopyLine(line2Copy)

    }, [line2Copy])


    //********************************* for drop down list ******************************************* */

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadDistinctdeliveryNotestWithLines(selected_season))
    }, [])

    let deliveryNoteList = useSelector(state => state.deliveryNote.deliveryNotes_witLines)

    let deliveryNoteInInvoice = []
    if (deliveryNoteList.length !== 0) { deliveryNoteInInvoice = deliveryNoteList.filter(item => item.invoiceNum === '-') }// not in invoice


    if (deliveryNoteList.length > 1) {
        deliveryNoteInInvoice = deliveryNoteInInvoice.sort((a, b) => (a.deliveryNoteNum > b.deliveryNoteNum) ? 1 : -1)
    }
    //}


    const handleDeliveryNoteWOInvoiceListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String


        if (filteredRecord.length !== 0) {
            setCopyLine({ ...copyLine, deliveryNote_headerID: filteredRecord[0].id, deliveryNoteNum: filteredRecord[0].deliveryNoteNum })

        }
        else {
            setCopyLine({ ...copyLine, deliveryNote_headerID: 'בחר', deliveryNoteNum: '-' })
        }
    }
    
    //************************************************************************************************ */

    const cancelBack = () => {
        props.back()
    }

    //************************************************************************************************ */

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

    //************************************************************************************************ */

    const columns =
        [
            {
                Header: "מספר חשבונית",
                accessor: "invoiceNum",
                width: "10%"
            },
            {
                Header: "תעודת משלוח ללא חשבונית",
                accessor: "deliveryNum",
                width: '30%',
                Cell: () => {

                    return (

                        <select value={copyLine.deliveryNote_headerID} onChange={(e) => handleDeliveryNoteWOInvoiceListSet(e.target.value, deliveryNoteInInvoice)}>
                            <option>בחר</option>
                            {deliveryNoteInInvoice.map((option) => (
                                <option key={option.id} value={option.id}> {option.deliveryNoteNum} </option>
                            ))}
                        </select>
                    )
                }
            },

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

    const tableName = 'הוספת שורה  בחשבונית'
    //************************************************************************************************ */

    return (

        <div>
            <GenericAddPage
                addObjDB={addLine}
                toFilter={selectedInvoiceHeaderID}
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


export default AddInvoiceLine;