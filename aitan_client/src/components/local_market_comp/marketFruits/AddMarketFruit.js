import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addMarketFruit, add2QualityList } from '../../../redux/local_market_actions/marketFruits/marketFruits_actions'
import { loadFruitSize } from '../../../redux/local_market_actions/fruitSize/fruitSize_actions'
import { loadFruits } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import GenericListCreator from "../../general_comp/GenericListCreator";



const AddMarketFruit = (props) => {

    const dispatch = useDispatch()

    const blankRecord = {
        fruitsID: 0, fruitName: '', fruitType: '',
        fruitSizeID: 0, size: '', quality: '', isActive: 1
    }

    let marketFruit2Copy = useSelector(state => state.marketFruits.marketFruits_2_Copy)

    let [copyMarketFruit, setCopyMarketFruit] = useState(blankRecord)


    let _token = useSelector(state => state.login.Token.token)

    let fruitsList = useSelector(state => state.fruits.fruits)

    useEffect(() => {
        dispatch(loadFruitSize(_token))
        if (fruitsList.length === 0) { dispatch(loadFruits(_token)) }

    }, [])

    useEffect(() => {
        marketFruit2Copy === '' ? setCopyMarketFruit(blankRecord) : setCopyMarketFruit(marketFruit2Copy)
    }, [marketFruit2Copy])


    /**************************************************** */
    let fruitList = useSelector(state => state.fruits.fruits)

    let fruitTypeIsActiveList = GenericListCreator(fruitList)

    const handleFruitsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        if (filteredRecord.length !== 0) {
            setCopyMarketFruit({ ...copyMarketFruit, fruitsID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType })
        }
        else {
            setCopyMarketFruit({ ...copyMarketFruit, fruitsID: 'בחר', fruitName: 'בחר', fruitType: 'בחר' })
        }
    }


    /**************************************************** */
    let fruitSizeList = useSelector(state => state.fruitSize.fruitSize)
    let fruitSizeIsActiveList = GenericListCreator(fruitSizeList)

    const handleFruitSizeListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))


        if (filteredRecord.length !== 0) {
            setCopyMarketFruit({ ...copyMarketFruit, fruitSizeID: filteredRecord[0].id, size: filteredRecord[0].size })
        }
        else {
            setCopyMarketFruit({ ...copyMarketFruit, fruitSizeID: 'בחר', size: 'בחר' })
        }
    }


    /**************************************************** */
    const cancelBack = () => {
        props.back()
    }

    /**************************************************** */


    // contain the data we changed and update the setCopyMarketFruit   
    const updateMyData = (columnId, value) => {
        setCopyMarketFruit((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    const qualityUniqueList = useSelector(state => state.marketFruits.qualityList)
    
    /**************************************************** */

    const columns =
        [
            {
                Header: "זן-פרי",
                accessor: "fruitType",
                // width: 100,
                Cell: () => {

                    return (

                        <select value={copyMarketFruit.fruitsID} onChange={(e) => handleFruitsListSet(e.target.value, fruitTypeIsActiveList)}>
                            <option>בחר</option>
                            {fruitTypeIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.fruitType} | {option.fruitName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "גודל",
                accessor: "size",
                // width: 100,
                Cell: () => {

                    return (

                        <select value={copyMarketFruit.fruitSizeID} onChange={(e) => handleFruitSizeListSet(e.target.value, fruitSizeIsActiveList)}>
                            <option>בחר</option>
                            {fruitSizeIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.size}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "איכות",
                accessor: "quality",
                // width:300,
                canAdd2List: "1",
                Cell: () => {
                    return (<select value={copyMarketFruit.quality} onChange={(e) => setCopyMarketFruit({ ...copyMarketFruit, quality: e.target.value })}>
                        {qualityUniqueList.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>)
                }
            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                Cell: row => {

                    return (
                        <div >
                            <input type="checkbox"
                                className="checkbox_is_Active"
                                defaultChecked={row.value}
                                onBlur={(event) => updateMyData(row.column.id, event.target.checked)} />
                        </div>)
                }
            }
        ]

    /**************************************************** */
    const titleName_AddNew = 'איכות'
    /**************************************************** */
    let message = (
        <div>
            <ul>
                <li>רשומה בעלת פרי + זן+ גודל+איכות לא יכולה להיות זהה לרשומה אחרת</li>
                <li> חובה לבחור מידע בכל השדות</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    /**************************************************** */
    return (
        <div>
            <GenericAddPage
                addObjDB={addMarketFruit}
                updateMyData={updateMyData}
                columns={columns}
                data={copyMarketFruit}
                setData={setCopyMarketFruit}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
                canAdd2List={qualityUniqueList}
                addMore2UniqueList={add2QualityList}
                title={titleName_AddNew}
            />
        </div>
    )
}

export default AddMarketFruit;