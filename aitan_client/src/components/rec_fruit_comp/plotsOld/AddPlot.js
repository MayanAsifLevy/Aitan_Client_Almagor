import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addPlot } from '../../../redux/rec_fruit_actions/plotsOld/plots_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddPlot = (props) => {


    const blankRecord = { plotName: '', isActive: 1 }

    let plot2Copy = useSelector(state => state.plots.plot_2_Copy)

    let [copyPlot, setCopyPlot] = useState(blankRecord)

    useEffect(() => {
        plot2Copy === '' ? setCopyPlot(blankRecord) : setCopyPlot(plot2Copy)
    }, [plot2Copy]) //2.8.22 add [plot2Copy]


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyPlot   
    const updateMyData = (columnId, value) => {
        setCopyPlot((old) => {
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
                Header: "חלקה",
                accessor: "plotName",
                // width: 430,
                Cell: EditableCell

            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                // width: 250,
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
                <li>לא ניתן להוסיף שם חלקה הזהה לשם חלקה אחרת</li>
                <li> חובה למלא שם חלקה</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    return (

        <div>
            <GenericAddPage
                addObjDB={addPlot}
                updateMyData={updateMyData}
                columns={columns}
                data={copyPlot}
                setData={setCopyPlot}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}


export default AddPlot;