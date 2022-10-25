import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addPackingHouse } from '../../../redux/rec_fruit_actions/packingHouse/packingHouse_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddPackingHouse = (props) => {


    const blankRecord = { packingHouseName: '', location: '', isActive: 1 }

    let packingHouse2Copy = useSelector(state => state.packingHouse.packingHouse_2_Copy)

    let [copyPackingHouse, setCopyPackingHouse] = useState(blankRecord)

    useEffect(() => {
        packingHouse2Copy === '' ? setCopyPackingHouse(blankRecord) : setCopyPackingHouse(packingHouse2Copy)
    }, [packingHouse2Copy]) //2.8.22 added [packingHouse2Copy]


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyPackingHouse   
    const updateMyData = (columnId, value) => {
        setCopyPackingHouse((old) => {
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
                Header: "בית אריזה",
                accessor: "packingHouseName",
                // width: 300,
                Cell: EditableCell

            },
            {
                Header: "ישוב",
                accessor: "location",
                // width: 220,
                Cell: EditableCell

            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                // width: 160,
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
                <li>רשומה בעלת בית אריזה + ישוב לא יכולה להיות זהה לרשומה אחרת </li>
                <li>חובה להכניס שם בית אריזה </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (

        <div>
            <GenericAddPage
                addObjDB={addPackingHouse}
                updateMyData={updateMyData}
                columns={columns}
                data={copyPackingHouse}
                setData={setCopyPackingHouse}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddPackingHouse;