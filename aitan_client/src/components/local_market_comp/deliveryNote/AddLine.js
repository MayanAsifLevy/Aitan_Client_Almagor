import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addLine } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import { loadDistinctCreatePalletWithLines } from '../../../redux/local_market_actions/createPallet/createPallet_actions';
import GenericAddPage from "../../general_comp/GenericAddPage"


const AddDeliveryNoteLine = (props) => {


    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

/******************************************************************************/

    let line2Copy = useSelector(state => state.deliveryNote.deliveryNoteLine_2_Copy)

    let headerCopy = useSelector(state => state.deliveryNote.deliveryNoteHeader_2_Copy)

    let selectedDeliveryHeaderID = headerCopy.id // in order to get the lines' deliveryNoteHeader id



    const blankRecord = { deliveryNote_headerID: selectedDeliveryHeaderID, fruitPalletCreation_headerID: 'בחר', 'deliveryNoteNum': headerCopy.deliveryNoteNum }

    let [copyLine, setCopyLine] = useState(blankRecord)

    /******************************************************************************/
    useEffect(() => {
        line2Copy === '' ? setCopyLine(blankRecord) : setCopyLine(line2Copy)

    }, [line2Copy])


    //********************************* for drop down list ************************/

    const dispatch = useDispatch()

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        dispatch(loadDistinctCreatePalletWithLines(selected_season))

    }, [])

    let createPallesList = useSelector(state => state.createPallet.palletNum_withLines)

    let palletNumIntStock = []
    if (createPallesList.length !== 0) { palletNumIntStock = createPallesList.filter(item => item.deliveryNoteNum === '-') }// not in deliveryNote

    //*********** add the current pallet to the palletnum list that the user can choose from ***** */

    palletNumIntStock = palletNumIntStock.sort((a, b) => (a.palletNum > b.palletNum) ? 1 : -1)


    const handlePalletNumInStockListSet = (optionID, list) => {

        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setCopyLine({ ...copyLine, fruitPalletCreation_headerID: filteredRecord[0].id, palletNum: filteredRecord[0].palletNum })

        }
        else {
            setCopyLine({ ...copyLine, fruitPalletCreation_headerID: 'בחר', palletNum: 'בחר' })
        }
    }

    /******************************************************************************/

    const cancelBack = () => {
        props.back()
    }

    /******************************************************************************/

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
    /******************************************************************************/

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
                width: '20%',
                Cell: () => {

                    return (

                        <select value={copyLine.fruitPalletCreation_headerID} onChange={(e) => handlePalletNumInStockListSet(e.target.value, palletNumIntStock)}>
                            <option>בחר</option>
                            {palletNumIntStock.map((option) => (
                                <option key={option.id} value={option.id}> {option.palletNum} </option>
                            ))}
                        </select>
                    )
                }
            },
        ]


    let message = (
        <div>
            <ul>
                <li>מספרי משטח  הינם יחודיים</li>
                <li>חובה להכניס מס משטח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)



    /******************************************************************************/

    const tableName = 'הוספת שורה בתעודת משלוח'
    /******************************************************************************/


    return (

        <div>
            <GenericAddPage
                addObjDB={addLine}
                toFilter={selectedDeliveryHeaderID}
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


export default AddDeliveryNoteLine;