import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateFruitSizeDB } from '../../../redux/local_market_actions/fruitSize/fruitSize_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditFruitSize = (props) => {

    let updatedFruitSize = useSelector(state => state.fruitSize.fruitSize_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origFruitSizeToUpdate = updatedFruitSize

    let [editFruitSize, setEditFruitSize] = useState(updatedFruitSize)

    
    useEffect(() => {
        setEditFruitSize(updatedFruitSize)
    }, [updatedFruitSize])

    // contain the data we changed and update the setEditFruitSize   
    const updateMyData = (columnId, value) => {
        setEditFruitSize((old) => {
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


    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
            },
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
                <li> חובה להכניס גודל </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    

    return (

        <div>
            <GenericEditPage
                updateObjDB={updateFruitSizeDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editFruitSize}
                setData={setEditFruitSize}
                originalData={origFruitSizeToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}

export default EditFruitSize;