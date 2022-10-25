import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateMarketPackingMatDB } from '../../../redux/local_market_actions/marketPackingMat/marketPackingMat_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditMarketPackingMatPage = (props) => {

    let updatedMarketPackingMat = useSelector(state => state.marketPacking.marketPacking_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origMarketPackingMatToUpdate = updatedMarketPackingMat

    let [editMarketPackingMat, setEditMarketPackingMat] = useState(updatedMarketPackingMat)


    useEffect(() => {
        setEditMarketPackingMat(updatedMarketPackingMat)
    }, [updatedMarketPackingMat])

    // contain the data we changed and update the setEditMarketPackingMat   
    const updateMyData = (columnId, value) => {
        setEditMarketPackingMat((old) => {
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
                Header: "סוג אריזה",
                accessor: "marketPackingType",
                width: "50%",
                Cell: EditableCell
            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                width: "20%",
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
                <li>לא ניתן להוסיף סוג אריזה הזהה לסוג אריזה אחר</li>
                <li>חובה להכניס סוג אריזה</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (

        <div>
            <GenericEditPage
                updateObjDB={updateMarketPackingMatDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editMarketPackingMat}
                setData={setEditMarketPackingMat}
                originalData={origMarketPackingMatToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditMarketPackingMatPage;