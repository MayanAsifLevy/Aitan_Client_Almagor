import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateLineDB } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import { loadDistinctCreatePalletWithLines } from '../../../redux/local_market_actions/createPallet/createPallet_actions';
import GenericEditPage from "../../general_comp/GenericEditPage";


const EditDeliveryNoteLine = (props) => {


    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //**************************************************************************************/

    let updatedLine = useSelector(state => state.deliveryNote.deliveryNoteLine_2_update)

    let selectedDeliveryHeaderID = updatedLine.deliveryNote_headerID


    // in case we cant update and we want to return the edit table to contain the original data
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
    //********************************* for drop down list ****************************** */

    const dispatch = useDispatch()

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        dispatch(loadDistinctCreatePalletWithLines(selected_season))

    }, [])

    let createPallesList = useSelector(state => state.createPallet.palletNum_withLines)

    let palletNumIntStock = []
    if (createPallesList.length !== 0) { palletNumIntStock = createPallesList.filter(item => item.deliveryNoteNum === '-') }// not in deliveryNote

    //*********** add the current pallet to the palletnum list that the user can choose from ***** */
 
    // palletNumIntStock.push(currentPallet)
    if (createPallesList.length > 1) {
        palletNumIntStock = palletNumIntStock.sort((a, b) => (a.palletNum > b.palletNum) ? 1 : -1)
    }
    //}

    const handlePalletNumInStockListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String


        if (filteredRecord.length !== 0) {
            setEditLine({ ...editLine, fruitPalletCreation_headerID: filteredRecord[0].id, palletNum: filteredRecord[0].palletNum })

        }
        else {
            setEditLine({ ...editLine, fruitPalletCreation_headerID: 'בחר', palletNum: 'בחר' })
        }
    }


    //**************************************************************************************/
    const columns =
        [
            {
                Header: "תעודת משלוח",
                accessor: "deliveryNoteNum",
                width: "10%"
            },
            {
                Header: "מספר משטח שקיים במלאי",
                accessor: "palletNum",
                width: '30%',
                Cell: () => {

                    return (

                        <select value={editLine.fruitPalletCreation_headerID} onChange={(e) => handlePalletNumInStockListSet(e.target.value, palletNumIntStock)}>
                            <option>בחר</option>
                            {palletNumIntStock.map((option) => (
                                <option key={option.id} value={option.id}> {option.palletNum} </option>
                            ))}
                        </select>
                    )
                }
            },

        ]

    //**************************************************************************************/
    let message = (
        <div>
            <ul>
                <li>חובה להכניס מספר משטח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    //**************************************************************************************/
    const tableName = 'עריכת שורה בתעודת משלוח'

    //**************************************************************************************/
    
    return (

        <div>
            <GenericEditPage
                ade
                updateObjDB={updateLineDB}
                toFilter={selectedDeliveryHeaderID}
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

export default EditDeliveryNoteLine;