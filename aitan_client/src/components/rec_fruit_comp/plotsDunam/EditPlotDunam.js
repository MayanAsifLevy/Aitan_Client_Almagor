import React, {useEffect,  useState } from "react";
import { useSelector , useDispatch} from 'react-redux';
import { updatePlotDB } from '../../../redux/rec_fruit_actions/plotDunam/plotsDunam_actions'
import { loadFruits } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";
import GenericListCreator from "../../general_comp/GenericListCreator";


const EditPlot = (props) => {

    const dispatch = useDispatch()

    
    let _token = useSelector(state => state.login.Token.token)

    let selected_season = useSelector(state => state.general.season)

    let updatePlot = useSelector(state => state.plotsDunam.plot_2_update)

    // if (updatePlot['assamblyYear']==null)
    // {
    //     updatePlot['assamblyYear']=''
    // }

    let fruitTypesList = useSelector(state => state.fruits.fruits)

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        if (fruitTypesList.length === 0) { dispatch(loadFruits(_token)) }
    }, [])
    
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


    
    /**************************************************** */
    let fruitTypeList = useSelector(state => state.fruits.fruits)
    let fruitTypeLIsActiveList = GenericListCreator(fruitTypeList)

    const handleFruitsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        setEditPlot({ ...editPlot, fruitTypeID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType })
    }

    /************ set plot owner drop down list **************************************** */
    let plotOwnerList = ['אחר','טיולי כורזים','רוני לוי']
 
    /*********** set year drop down list - decending***************************************** */

    const year = (new Date()).getFullYear();
    const minYear = 2000;
    const diff=year+2-minYear;
    let years = [null];

    for(let x = 0; x <diff; x++) {
        years.push((year+2 - x))
    }



    /**************************************************** */


    const cancelBack = () => {
        props.back()
    }
    /**************************************************** */

    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "עונה",
                accessor: "season",
            },
            {
                Header: "שם חלקה",
                accessor: "plotName",
                Cell: EditableCell
            },
            {
                Header: "זן",
                accessor: "fruitType",
                Cell: () => {
                    return (

                        <select value={editPlot.fruitTypeID} onChange={(e) => handleFruitsListSet(e.target.value, fruitTypeLIsActiveList)}>
                            {fruitTypeLIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}> {option.fruitType} | {option.fruitName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "מספר דונמים",
                accessor: "dunam",
                Cell: EditableCell
            },
            {
                Header: "שנת שתילה",
                accessor: "plantYear",
                Cell: () => {
                    return (
                        
                        <select  value={editPlot.plantYear} onChange={(e) => setEditPlot({ ...editPlot, plantYear: e.target.value })}>
                           {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                    </select> )
                }
            },
            {
                Header: "שנת הרכבה",
                accessor: "assamblyYear",
                Cell: () => {
                    return (
                        
                        <select  value={editPlot.assamblyYear} onChange={(e) => setEditPlot({ ...editPlot, assamblyYear: e.target.value })}>
                           {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                    </select> )
                }
            },
            {
                Header: "בעל החלקה",
                accessor: "plotOwner",
                // width:300,
                // canAdd2List: "1",
                Cell: () => {
                    return (<select value={editPlot.plotOwner} onChange={(e) => setEditPlot({ ...editPlot, plotOwner: e.target.value })}>
                        {plotOwnerList.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>)
                }
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
                <li>לא ניתן להוסיף עונה+שם חלקה+ זן+ שנות שתילה/הרכבה הזהה לאחרת</li>
                <li> חובה למלא עונה, שם חלקה, זן, שנת שתילה </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    return (

        <div>
            <GenericEditPage
                updateObjDB={updatePlotDB}
                updateMyData={updateMyData}
                toFilter={selected_season}
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