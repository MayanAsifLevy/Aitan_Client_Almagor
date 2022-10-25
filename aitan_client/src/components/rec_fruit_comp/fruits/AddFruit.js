import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addFruit, add2FruitList } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'


const AddFruit = (props) => {

    const blankRecord = { fruitName: '', fruitType: '', isActive: 1 }

    let fruit2Copy = useSelector(state => state.fruits.fruit_2_Copy)

    let [copyFruit, setCopyFruit] = useState(blankRecord)


    useEffect(() => {
        fruit2Copy === '' ? setCopyFruit(blankRecord) : setCopyFruit(fruit2Copy)
    }, [fruit2Copy]) //2.8.22 added [fruit2Copy]


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyFruit   
    const updateMyData = (columnId, value) => {
        setCopyFruit((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    const fruitsUniqueList = useSelector(state => state.fruits.fruitList)


    const columns =
        [
            {
                Header: "פרי",
                accessor: "fruitName",
                // width:300,
                canAdd2List: "1",
                Cell: () => {
                    return (<select value={copyFruit.fruitName} onChange={(e) => setCopyFruit({ ...copyFruit, fruitName: e.target.value })}>
                        {fruitsUniqueList.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>)
                }
            },
            {
                Header: "זן",
                // width:300,
                accessor: "fruitType",
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

    const titleName_AddNew = 'פרי'


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
            <GenericAddPage
                addObjDB={addFruit}
                updateMyData={updateMyData}
                columns={columns}
                data={copyFruit}
                setData={setCopyFruit}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
                canAdd2List={fruitsUniqueList}
                addMore2UniqueList={add2FruitList}
                title={titleName_AddNew}
            />
        </div>
    )

}


export default AddFruit;