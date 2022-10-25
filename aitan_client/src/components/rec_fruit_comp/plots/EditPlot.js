import React, {useEffect,  useState } from "react";
import { useSelector } from 'react-redux';
import { updatePlotDB } from '../../../redux/rec_fruit_actions/plots/plots_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditPlot = (props) => {

    let updatePlot = useSelector(state => state.plots.plot_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    let origPlotToUpdate = updatePlot

    let [editPlot, setEditPlot] = useState(updatePlot)

    useEffect(() => {
        setEditPlot(updatePlot)
    }, [updatePlot])

    // contain the data we changed and update the setEditPlot   
    const updateMyData = (columnId, value) => {
        setEditPlot((old) => {
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
                Header: "חלקה",
                accessor: "plotName",
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
                <li>לא ניתן להוסיף שם חלקה הזהה לשם חלקה אחרת</li>
                <li> חובה למלא שם חלקה</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    return (

        <div>
            <GenericEditPage
                updateObjDB={updatePlotDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editPlot}
                setData={setEditPlot}
                originalData={origPlotToUpdate}
                back={cancelBack}
                popUpMessage={message} />
        </div>
    )
}

export default EditPlot;