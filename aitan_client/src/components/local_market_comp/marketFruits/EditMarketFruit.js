import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateMarketFruitDB } from '../../../redux/local_market_actions/marketFruits/marketFruits_actions'
import GenericEditPage from "../../general_comp/GenericEditPage";
import GenericListCreator from "../../general_comp/GenericListCreator";
import { loadFruitSize } from '../../../redux/local_market_actions/fruitSize/fruitSize_actions'
import { loadFruits } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'

const EditMarketFruit = (props) => {

    const dispatch = useDispatch()

    let updatedMarketFruit = useSelector(state => state.marketFruits.marketFruits_2_update)


    // in case we cant update and we want to return the edit table to contain the original data
    let origMarketFruitrToUpdate = updatedMarketFruit

    let [editMarketFruit, setEditMarketFruit] = useState(updatedMarketFruit)

    let fruitsList = useSelector(state => state.fruits.fruits)

    let _token = useSelector(state => state.login.Token.token)

    useEffect(() => {
        dispatch(loadFruitSize(_token))
        if (fruitsList.length === 0) { dispatch(loadFruits(_token)) }

    }, [])

    useEffect(() => {
        setEditMarketFruit(updatedMarketFruit)
    }, [updatedMarketFruit])

    // contain the data we changed and update the setEditMarketFruit   
    const updateMyData = (columnId, value) => {
        setEditMarketFruit((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    /**************************************************** */
    let fruitList = useSelector(state => state.fruits.fruits)
    let fruitTypeIsActiveList = GenericListCreator(fruitList)

    const handleFruitsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        if (filteredRecord.length !== 0) {
            setEditMarketFruit({ ...editMarketFruit, fruitsID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType })
        }
        else {
            setEditMarketFruit({ ...editMarketFruit, fruitsID: '??????', fruitName: '??????', fruitType: '??????' })
        }
    }


    /**************************************************** */
    let fruitSizeList = useSelector(state => state.fruitSize.fruitSize)
    let fruitSizeIsActiveList = GenericListCreator(fruitSizeList)

    const handleFruitSizeListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))


        if (filteredRecord.length !== 0) {
            setEditMarketFruit({ ...editMarketFruit, fruitSizeID: filteredRecord[0].id, size: filteredRecord[0].size })
        }
        else {
            setEditMarketFruit({ ...editMarketFruit, fruitSizeID: '??????', size: '??????' })
        }
    }


    /**************************************************** */

    const cancelBack = () => {
        props.back()
    }


    const qualityUniqueList = useSelector(state => state.marketFruits.qualityList)


    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "????-??????",
                accessor: "fruitType",
                // width: 100,
                Cell: () => {

                    return (

                        <select value={editMarketFruit.fruitsID} onChange={(e) => handleFruitsListSet(e.target.value, fruitTypeIsActiveList)}>
                            <option>??????</option>
                            {fruitTypeIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.fruitType} | {option.fruitName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "????????",
                accessor: "size",
                // width: 100,
                Cell: () => {

                    return (

                        <select value={editMarketFruit.fruitSizeID} onChange={(e) => handleFruitSizeListSet(e.target.value, fruitSizeIsActiveList)}>
                            <option>??????</option>
                            {fruitSizeIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.size}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "??????????",
                accessor: "fruitName",
                // width:300,
                // canAdd2List: "1",
                Cell: () => {
                    return (<select value={editMarketFruit.quality} onChange={(e) => setEditMarketFruit({ ...editMarketFruit, quality: e.target.value })}>
                        {qualityUniqueList.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>)
                }
            },
            {
                Header: "?????????",
                accessor: "isActive",
                // width:160,
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
    let message = (
        <div>
            <ul>
                <li>?????????? ???????? ?????? + ????+ ????????+?????????? ???? ?????????? ?????????? ?????? ???????????? ????????</li>
                <li> ???????? ?????????? ???????? ?????? ??????????</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>?????? ?????? ??????</div>
        </div>)
    /**************************************************** */

    return (

        <div>
            <GenericEditPage
                updateObjDB={updateMarketFruitDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editMarketFruit}
                setData={setEditMarketFruit}
                originalData={origMarketFruitrToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditMarketFruit;