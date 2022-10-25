import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addGrower } from '../../../redux/rec_fruit_actions/growers/growers_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddGrower = (props) => {


    const blankRecord = { growerName: '', isActive: 1 }

    let grower2Copy = useSelector(state => state.growers.grower_2_Copy)

    let [copyGrower, setCopyGrower] = useState(blankRecord)

    useEffect(() => {
        grower2Copy === '' ? setCopyGrower(blankRecord) : setCopyGrower(grower2Copy)
    }, [grower2Copy]) //2.8.22 added [grower2Copy]


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyGrower   
    const updateMyData = (columnId, value) => {
        setCopyGrower((old) => {
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
                Header: "מגדל",
                accessor: "growerName",
                // width:430,
                Cell: EditableCell

            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                // width:250,
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
            <GenericAddPage
                addObjDB={addGrower}
                updateMyData={updateMyData}
                columns={columns}
                data={copyGrower}
                setData={setCopyGrower}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}

export default AddGrower;