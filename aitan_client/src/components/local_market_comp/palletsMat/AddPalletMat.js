import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addPalletMat } from '../../../redux/local_market_actions/palletsMat/palletsMat_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddPalletMat = (props) => {


    const blankRecord = { palletType: '', palletWeight:'',   isActive: 1 }

    let palletMat2Copy = useSelector(state => state.palletsMat.palletMat_2_Copy)

    let [copyPalletMat, setCopyPalletMat] = useState(blankRecord)

    useEffect(() => {
        palletMat2Copy === '' ? setCopyPalletMat(blankRecord) : setCopyPalletMat(palletMat2Copy)
    }, [palletMat2Copy]) 


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyPalletMat   
    const updateMyData = (columnId, value) => {
        setCopyPalletMat((old) => {
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
                Header:"סוג משטח",
                accessor: "palletType",
                width: "25%",
                Cell: EditableCell
            },
            {
                Header:"משקל",
                accessor: "palletWeight",
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
            <GenericAddPage
                addObjDB={addPalletMat}
                updateMyData={updateMyData}
                columns={columns}
                data={copyPalletMat}
                setData={setCopyPalletMat}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddPalletMat;