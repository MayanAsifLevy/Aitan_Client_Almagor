import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addDealName } from '../../../redux/rec_fruit_actions/dealNames/dealNames_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddDealName = (props) => {


    const blankRecord = { dealName: '', isActive: 1 }

    let dealName2Copy = useSelector(state => state.dealNames.dealName_2_Copy)

    let [copyDealName, setCopyDealName] = useState(blankRecord)

    useEffect(() => {
        dealName2Copy === '' ? setCopyDealName(blankRecord) : setCopyDealName(dealName2Copy)
    }, [dealName2Copy])


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyDealName
    const updateMyData = (columnId, value) => {
        setCopyDealName((old) => {
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
                Header: "עסקה",
                accessor: "dealName",
                //  width: "50%",
                Cell: EditableCell

            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                // width: "40%",
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
            <GenericAddPage
                addObjDB={addDealName}
                updateMyData={updateMyData}
                columns={columns}
                data={copyDealName}
                setData={setCopyDealName}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}

export default AddDealName;