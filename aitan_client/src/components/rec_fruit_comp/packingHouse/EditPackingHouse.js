import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updatePackingHouseDB } from '../../../redux/rec_fruit_actions/packingHouse/packingHouse_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditPackingHouse = (props) => {

    let updatedPackingHouse = useSelector(state => state.packingHouse.packingHouse_2_update)

    // in case we cant update and we want to return the edit table to contain teh otiginal data
    const origPackHouseToUpdate = updatedPackingHouse

    let [editPackingHouse, setEditPackingHouse] = useState(updatedPackingHouse)

    useEffect(() => {
        setEditPackingHouse(updatedPackingHouse)
    }, [updatedPackingHouse])

    // contain the data we changed and update the setEditPackingHouse   
    const updateMyData = (columnId, value) => {
        setEditPackingHouse((old) => {
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
                Header: "בית אריזה",
                accessor: "packingHouseName",
                Cell: EditableCell

            },
            {
                Header: "ישוב",
                accessor: "location",
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
                <li>רשומה בעלת בית אריזה + ישוב לא יכולה להיות זהה לרשומה אחרת </li>
                <li>חובה להכניס שם בית אריזה </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    return (

        <div>
            <GenericEditPage
                updateObjDB={updatePackingHouseDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editPackingHouse}
                setData={setEditPackingHouse}
                originalData={origPackHouseToUpdate}
                back={cancelBack}
                popUpMessage={message} />
        </div>
    )
}


export default EditPackingHouse;