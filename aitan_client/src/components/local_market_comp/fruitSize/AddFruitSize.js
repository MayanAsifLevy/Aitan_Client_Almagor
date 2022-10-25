import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addFruitSize } from '../../../redux/local_market_actions/fruitSize/fruitSize_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddFruitSize = (props) => {


    const blankRecord = { size: '', isActive: 1 }

    let fruitSize2Copy = useSelector(state => state.fruitSize.fruitSize_2_Copy)

    let [copyFruitSize, setCopyFruitSize] = useState(blankRecord)

    useEffect(() => {
        fruitSize2Copy === '' ? setCopyFruitSize(blankRecord) : setCopyFruitSize(fruitSize2Copy)
    }, [fruitSize2Copy]) 


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyFruitSize   
    const updateMyData = (columnId, value) => {
        setCopyFruitSize((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };



    const columns =
        [
            {
                Header: "גודל",
                accessor: "size",
                Cell: EditableCell
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


    let message = (
        <div>
            <ul>
                <li>לא ניתן להוסיף גודל הזהה לגודל אחר</li>
                <li>חובה להכניס גודל</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (

        <div>
            <GenericAddPage
                addObjDB={addFruitSize}
                updateMyData={updateMyData}
                columns={columns}
                data={copyFruitSize}
                setData={setCopyFruitSize}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddFruitSize;