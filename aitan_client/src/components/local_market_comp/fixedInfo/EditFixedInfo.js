import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateFixedInfoDB } from '../../../redux/local_market_actions/fixedInfo/fixedInfo_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";


const EditFixedInfo = (props) => {

    let updatedInfo = useSelector(state => state.fixedInfo.fixedInfo_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origInfoToUpdate = updatedInfo

    let [editInfo, setEditInfo] = useState(updatedInfo)


    useEffect(() => {
        setEditInfo(updatedInfo)
    }, [updatedInfo])

    //**************************************************************************************/
    // contain the data we changed and update the setEditInfo   
    const updateMyData = (columnId, value) => {
        setEditInfo((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    //**************************************************************************************/
    const cancelBack = () => {
        props.back()
    }

    //**************************************************************************************/

    const columns =
        [
            {
                Header: "שם ערך עברית",
                accessor: "name_hebrew",

            },
            {
                Header: "ערך",
                accessor: "value",
                Cell: EditableCell,
            }
        ]


    //**************************************************************************************/
   
    return (

        <div>
            <GenericEditPage
                updateObjDB={updateFixedInfoDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editInfo}
                setData={setEditInfo}
                originalData={origInfoToUpdate}
                back={cancelBack}
            />
        </div>
    )

}

export default EditFixedInfo;