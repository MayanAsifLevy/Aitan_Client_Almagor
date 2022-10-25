import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addPackingMaterial } from '../../../redux/rec_fruit_actions/packingMaterial/packingMaterial_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddPackingMaterial = (props) => {


    const blankRecord = { packingType: '', weight: '', isActive: 1 }

    let packingMaterial2Copy = useSelector(state => state.packingMaterials.packingMaterial_2_Copy)

    let [copyPackingMaterial, setCopyPackingMaterial] = useState(blankRecord)

    useEffect(() => {
        packingMaterial2Copy === '' ? setCopyPackingMaterial(blankRecord) : setCopyPackingMaterial(packingMaterial2Copy)
    }, [packingMaterial2Copy]) // 2.8.22 added [packingMaterial2Copy]


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyPackingMaterial   
    const updateMyData = (columnId, value) => {
        setCopyPackingMaterial((old) => {
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
                Header: "סוג אריזה",
                accessor: "packingType",
                // width:300,
                Cell: EditableCell
            },
            {
                Header: "משקל אריזה",
                accessor: "weight",
                // width:220,
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
                <li>רשומה בעלת סוג אריזה לא יכולה להיות זהה לרשומה אחרת </li>
                <li> משקל יכול להיות מספר עד 2 ספרות אחרי הנקודה </li>
                <li> חובה להכניס סוג אריזה </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (

        <div>
            <GenericAddPage
                addObjDB={addPackingMaterial}
                updateMyData={updateMyData}
                columns={columns}
                data={copyPackingMaterial}
                setData={setCopyPackingMaterial}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}

export default AddPackingMaterial;