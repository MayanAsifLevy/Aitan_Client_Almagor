import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updatePackingMaterialDB } from '../../../redux/rec_fruit_actions/packingMaterial/packingMaterial_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditPackingMaterial = (props) => {

    let updatedPackingMaterial = useSelector(state => state.packingMaterials.packingMaterial_2_update)

    // in case we cant update and we want to return the edit table to contain teh otiginal data
    const origPackMaterialToUpdate = updatedPackingMaterial

    let [editPackingMaterial, setEditPackingMaterial] = useState(updatedPackingMaterial)


    useEffect(() => {
        setEditPackingMaterial(updatedPackingMaterial)
    }, [updatedPackingMaterial])

    // contain the data we changed and update the setEditPackingMaterial   
    const updateMyData = (columnId, value) => {
        setEditPackingMaterial((old) => {
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
                Header: "סוג אריזה",
                accessor: "packingType",
                Cell: EditableCell
            },
            {
                Header: "משקל אריזה",
                accessor: "weight",
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
                <li>רשומה בעלת סוג אריזה לא יכולה להיות זהה לרשומה אחרת </li>
                <li> משקל יכול להיות מספר עד 2 ספרות אחרי הנקודה </li>
                <li> חובה להכניס סוג אריזה </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)



    return (

        <div>
            <GenericEditPage
                updateObjDB={updatePackingMaterialDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editPackingMaterial}
                setData={setEditPackingMaterial}
                originalData={origPackMaterialToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}

export default EditPackingMaterial;