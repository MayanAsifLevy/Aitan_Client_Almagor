import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateDealNameDB } from '../../../redux/rec_fruit_actions/dealNames/dealNames_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditDealName = (props) => {

    let updatedDealName = useSelector(state => state.dealNames.dealName_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    let origDealNameToUpdate = updatedDealName

    let [editDealName, setEditDealName] = useState(updatedDealName)


    useEffect(() => {
        setEditDealName(updatedDealName)
    }, [updatedDealName])


    // contain the data we changed and update the setEditDealName   
    const updateMyData = (columnId, value) => {
        setEditDealName((old) => {
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
                Header: "עסקה",
                accessor: "dealName",
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
                <li>לא ניתן להוסיף שם עסקה הזהה לשם עסקה אחר</li>
                <li> חובה למלא שם עסקה</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    return (
        <div>
            <GenericEditPage
                updateObjDB={updateDealNameDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editDealName}
                setData={setEditDealName}
                originalData={origDealNameToUpdate}
                back={cancelBack}
                popUpMessage={message} />
        </div>
    )
}

export default EditDealName;