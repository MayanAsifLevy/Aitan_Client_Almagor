import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addLine } from '../../../redux/local_market_actions/createPallet/createPallet_actions'
import { loadMarketFruits } from '../../../redux/local_market_actions/marketFruits/marketFruits_actions';
import { loadMarketPackings } from '../../../redux/local_market_actions/marketPackingMat/marketPackingMat_actions';
import GenericAddPage from "../../general_comp/GenericAddPage"
import EditableCell from '../../general_comp/EditableCell'
import GenericListCreator from "../../general_comp/GenericListCreator";


const AddCreatePalletLine = (props) => {

    let line2Copy = useSelector(state => state.createPallet.createPalletLine_2_Copy)

    let header2Copy = useSelector(state => state.createPallet.createPalletHeader_2_Copy)
    let selectedPalletID = header2Copy.id  // in order to get teh lines'pallet id
    let deliveryNoteNum4Pallet = header2Copy.deliveryNoteNum




    const blankRecord = {
        fruitPalletCreation_headerID: selectedPalletID, matketFruitID: 0, marketPackingMatTypeID: 0,
        packMatQty: 0, weightNeto: 0, deliveryNoteNum: deliveryNoteNum4Pallet
    }

    let [copyLine, setCopyLine] = useState(blankRecord)

    //************************************************************************************************ */
    useEffect(() => {
        line2Copy === '' ? setCopyLine(blankRecord) : setCopyLine(line2Copy)

    }, [line2Copy])


    //************************************************************************************************ */

    let _token = useSelector(state => state.login.Token.token)

    const dispatch = useDispatch()

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        dispatch(loadMarketFruits(_token))
        dispatch(loadMarketPackings(_token))


    }, [])

    let marketFruitsList = useSelector(state => state.marketFruits.marketFruits)
    let marketPackingMatList = useSelector(state => state.marketPacking.marketPacking)



    //****************************************************************************** */
    //**********************  for the dropDown lists  ****************************** */



    let marketFruitsIsActiveList = GenericListCreator(marketFruitsList)

    const handleMarketFruitsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String


        if (filteredRecord.length !== 0) {
            setCopyLine({ ...copyLine, matketFruitID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType, size: filteredRecord[0].size, quality: filteredRecord[0].quality })
        }
        else {
            setCopyLine({ ...copyLine, matketFruitID: 'בחר', fruitName: 'בחר', fruitType: 'בחר', size: 'בחר', quality: 'בחר' })
        }
    }



    let marketPackingMatIsActiveList = GenericListCreator(marketPackingMatList)

    const handleMarketPackingMatListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setCopyLine({ ...copyLine, marketPackingMatTypeID: filteredRecord[0].id, marketPackingType: filteredRecord[0].marketPackingType })
        }
        else {
            setCopyLine({ ...copyLine, marketPackingMatTypeID: 'בחר', marketPackingType: 'בחר' })
        }
    }

    //************************************************************************************************ */

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
    /******************************************************************************/

    const columns =
        [
            {
                Header: "id-זן-פרי-גודל-איכות",
                accessor: "fruitType",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={copyLine.matketFruitID} onChange={(e) => handleMarketFruitsListSet(e.target.value, marketFruitsIsActiveList)}>
                            <option>בחר</option>
                            {marketFruitsIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.id} | {option.fruitType} | {option.fruitName} | {option.size} | {option.quality}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: 'סוג אריזה',
                accessor: "marketPackingMatType",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={copyLine.marketPackingMatTypeID} onChange={(e) => handleMarketPackingMatListSet(e.target.value, marketPackingMatIsActiveList)}>
                            <option>בחר</option>
                            {marketPackingMatIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.marketPackingType} </option>
                            ))}
                        </select>
                    )
                }

            },
            {
                Header: "כמות באריזה",
                accessor: "packMatQty",
                width: "10%",
                Cell: EditableCell
            },
            {
                Header: "משקל נטו",
                accessor: "weightNeto",
                width: "10%",
                Cell: EditableCell
            }
        ]


    let message = (
        <div>
            <ul>
                <li>חובה להכניס מספר שורה, סוג פרי וסוג אריזה</li>
                <li>לא ניתן להוסיף שורה למשטח שיש לו תעודת משלוח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)



    /******************************************************************************/

    const tableName = 'הוספת שורה במשטח'
    /******************************************************************************/

    // if the pallet already part of a deliveryNote, we cant add the 'הוסף' button to the addPage
    let showButton = true
    if (deliveryNoteNum4Pallet !== '-') {
        showButton = false
    }


    /******************************************************************************/


    return (
        <div>

            <GenericAddPage
                addObjDB={addLine}
                toFilter={selectedPalletID}
                updateMyData={updateMyData}
                columns={columns}
                data={copyLine}
                setData={setCopyLine}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}
                showAddSign={showButton}
            />

        </div>
    )
}




export default AddCreatePalletLine;