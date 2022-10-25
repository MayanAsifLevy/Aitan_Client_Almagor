import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addMarketPackingMat } from '../../../redux/local_market_actions/marketPackingMat/marketPackingMat_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddMarketPackingMat = (props) => {

    const blankRecord = { marketPackingType: '', isActive: 1 }

    let marketPackingMat2Copy = useSelector(state => state.marketPacking.marketPacking_2_Copy)

    let [copyMarketPackingMat, setCopyMarketPackingMat] = useState(blankRecord)

    useEffect(() => {
        marketPackingMat2Copy === '' ? setCopyMarketPackingMat(blankRecord) : setCopyMarketPackingMat(marketPackingMat2Copy)
    }, [marketPackingMat2Copy])


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyMarketPackingMat   
    const updateMyData = (columnId, value) => {
        setCopyMarketPackingMat((old) => {
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
                accessor: "marketPackingType",
                Cell: EditableCell
            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                width: "10%",
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
            <GenericAddPage
                addObjDB={addMarketPackingMat}
                updateMyData={updateMyData}
                columns={columns}
                data={copyMarketPackingMat}
                setData={setCopyMarketPackingMat}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}

export default AddMarketPackingMat;