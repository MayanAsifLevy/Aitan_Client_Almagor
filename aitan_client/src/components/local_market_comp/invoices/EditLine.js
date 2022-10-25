import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateLineDB } from '../../../redux/local_market_actions/invoices/invocies_actions'
import { loadDistinctdeliveryNotestWithLines } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import GenericEditPage from "../../general_comp/GenericEditPage";


const EditInvoiceLine = (props) => {


    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let updatedLine = useSelector(state => state.invoices.invoiceLine_2_update)

    let selectedinvoiceHeaderID = updatedLine.invoiceHeaderID

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
    //********************************* for drop down list *************************************************************** */

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
            setEditLine({ ...editLine, deliveryNote_headerID: filteredRecord[0].id, deliveryNoteNum: filteredRecord[0].deliveryNoteNum })

        }
        else {
            setEditLine({ ...editLine, deliveryNote_headerID: 'בחר', deliveryNoteNum: '-' })
        }
    }



    //****************************************************************************** */
    const columns =
        [
            {
                Header: "מספר חשבונית",
                accessor: "invoiceNum",
                width: "15%"
            },
            {
                Header: "תעודת משלוח ללא חשבונית",
                accessor: "deliveryNum",
                width: '30%',
                Cell: () => {

                    return (

                        <select value={editLine.deliveryNote_headerID} onChange={(e) => handleDeliveryNoteWOInvoiceListSet(e.target.value, deliveryNoteInInvoice)}>
                            <option>בחר</option>
                            {deliveryNoteInInvoice.map((option) => (
                                <option key={option.id} value={option.id}> {option.deliveryNoteNum} </option>
                            ))}
                        </select>
                    )
                }
            },

        ]
    /******************************************************************************/
    let message = (
        <div>
            <ul>
                <li>חובה להכניס תעודת משלוח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)
    /******************************************************************************/
    const tableName = 'עריכת שורה בחשבונית'
    /******************************************************************************/
    return (

        <div>
            <GenericEditPage
                updateObjDB={updateLineDB}
                toFilter={selectedinvoiceHeaderID}
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

export default EditInvoiceLine;