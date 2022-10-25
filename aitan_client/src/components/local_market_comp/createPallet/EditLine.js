import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateLineDB } from '../../../redux/local_market_actions/createPallet/createPallet_actions';
import { loadMarketFruits } from '../../../redux/local_market_actions/marketFruits/marketFruits_actions';
import { loadMarketPackings } from '../../../redux/local_market_actions/marketPackingMat/marketPackingMat_actions';
import GenericListCreator from "../../general_comp/GenericListCreator";
import EditableCell from '../../general_comp/EditableCell';
import GenericEditPage from "../../general_comp/GenericEditPage";


const EditCreatePalletLine = (props) => {

    let updatedLine = useSelector(state => state.createPallet.createPalletLine_2_update)

    let selectedPalletID = updatedLine.fruitPalletCreation_headerID


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
            setEditLine({ ...editLine, matketFruitID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType, size: filteredRecord[0].size, quality: filteredRecord[0].quality })
        }
        else {
            setEditLine({ ...editLine, matketFruitID: 'בחר', fruitName: 'בחר', fruitType: 'בחר', size: 'בחר', quality: 'בחר' })
        }
    }



    let marketPackingMatIsActiveList = GenericListCreator(marketPackingMatList)

    const handleMarketPackingMatListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setEditLine({ ...editLine, marketPackingMatTypeID: filteredRecord[0].id, marketPackingType: filteredRecord[0].marketPackingType })
        }
        else {
            setEditLine({ ...editLine, marketPackingMatTypeID: 'בחר', marketPackingType: 'בחר' })
        }
    }


    //****************************************************************************** */
    const columns =
        [
            {
                Header: "id-זן-פרי-גודל-איכות",
                accessor: "fruitType",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={editLine.matketFruitID} onChange={(e) => handleMarketFruitsListSet(e.target.value, marketFruitsIsActiveList)}>
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

                        <select value={editLine.marketPackingMatTypeID} onChange={(e) => handleMarketPackingMatListSet(e.target.value, marketPackingMatIsActiveList)}>
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
                <li>חובה להכניס מספר משטח וסוג משטח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    const tableName = 'עריכת שורה במשטח'


    
    return (

        <div>
            <GenericEditPage
                ade
                updateObjDB={updateLineDB}
                toFilter={selectedPalletID}
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

export default EditCreatePalletLine;