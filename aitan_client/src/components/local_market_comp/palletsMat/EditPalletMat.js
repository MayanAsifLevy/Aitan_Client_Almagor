import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updatePalletMatDB } from '../../../redux/local_market_actions/palletsMat/palletsMat_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditPalletMat = (props) => {

    let updatedPalletMat = useSelector(state => state.palletsMat.palletMat_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origPalletMatToUpdate = updatedPalletMat

    let [editPalletMat, setEditPalletMat] = useState(updatedPalletMat)


    useEffect(() => {
        setEditPalletMat(updatedPalletMat)
    }, [updatedPalletMat])

    // contain the data we changed and update the setEditPalletMat   
    const updateMyData = (columnId, value) => {
        setEditPalletMat((old) => {
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
                width: "10%"
            },
            {
                Header: "סוג משטח",
                accessor: "palletType",
                width: "35%",
                Cell: EditableCell
            },
            {
                Header: "משקל",
                accessor: "palletWeight",
                width: "20%",
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
                <li>לא ניתן להוסיף סוג משטח הזהה לסוג משטח אחר</li>
                <li>חובה להכניס סוג משטח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)



    return (

        <div>
            <GenericEditPage
                updateObjDB={updatePalletMatDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editPalletMat}
                setData={setEditPalletMat}
                originalData={origPalletMatToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditPalletMat;