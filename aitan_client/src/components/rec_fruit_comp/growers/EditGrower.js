import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateGrowerDB } from '../../../redux/rec_fruit_actions/growers/growers_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditGrower = (props) => {

    let updatedGrower = useSelector(state => state.growers.grower_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    let origGrowerToUpdate = updatedGrower

    let [editGrower, setEditGrower] = useState(updatedGrower)

    useEffect(() => {
        setEditGrower(updatedGrower)
    }, [updatedGrower])


    // contain the data we changed and update the setEditGrower   
    const updateMyData = (columnId, value) => {
        setEditGrower((old) => {
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
                Header: "מגדל",
                accessor: "growerName",
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
                <li>לא ניתן להוסיף שם מגדל הזהה לשם מגדל אחר</li>
                <li> חובה למלא שם מגדל</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (
        <div>
            <GenericEditPage
                updateObjDB={updateGrowerDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editGrower}
                setData={setEditGrower}
                originalData={origGrowerToUpdate}
                back={cancelBack}
                popUpMessage={message} />
        </div>
    )

}

export default EditGrower;