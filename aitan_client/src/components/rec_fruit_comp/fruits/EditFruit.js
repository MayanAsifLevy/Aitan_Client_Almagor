import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateFruitDB } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditFruit = (props) => {

    let updatedFruit = useSelector(state => state.fruits.fruit_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    let origFruitrToUpdate = updatedFruit

    let [editFruit, setEditFruit] = useState(updatedFruit)

    useEffect(() => {
        setEditFruit(updatedFruit)
    }, [updatedFruit])

    // contain the data we changed and update the setEditFruit   
    const updateMyData = (columnId, value) => {
        setEditFruit((old) => {
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


    const fruitsUniqueList = useSelector(state => state.fruits.fruitList)


    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "פרי",
                accessor: "fruitName",
                Cell: row => {
                    return (<select value={editFruit.fruitName} onChange={(e) => setEditFruit({ ...editFruit, fruitName: e.target.value })}>
                        {fruitsUniqueList.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>)
                }

            },
            {
                Header: "זן",
                accessor: "fruitType",
                Cell: EditableCell

            },
            {
                Header: "פעיל?",
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

    let message = (

        <div>
            <ul>
                <li>רשומה בעלת פרי + זן לא יכולה להיות זהה לרשומה אחרת</li>
                <li> חובה לבחור פרי</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>


        </div>)

    return (

        <div>
            <GenericEditPage
                updateObjDB={updateFruitDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editFruit}
                setData={setEditFruit}
                originalData={origFruitrToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}

export default EditFruit;